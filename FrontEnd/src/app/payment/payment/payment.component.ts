import { Component, OnInit } from "@angular/core";
import { Payment } from "../payment";
import { FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { PaymentService } from "src/app/services/payment.service";
import { RouterService } from "src/app/services/router.service";
import { RegisterService } from "src/app/services/register.service";
import { CurrencyConversionService } from "src/app/services/currency-conversion.service";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  public payment: Payment;
  paymentMessage: string;

  city = new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.pattern("^[A-Za-z]+(?: +[A-Za-z]+)*$"),
    ])
  );
  country = new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.pattern("^[A-Za-z]+(?: +[A-Za-z]+)*$"),
    ])
  );
  category = new FormControl("", Validators.compose([Validators.required]));
  outlet = new FormControl("", Validators.compose([Validators.required]));
  amount = new FormControl(
    "",
    Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])
  );

  baseCurrency: string;
  balance: string;
  user: any;

  date: Date;

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private paymentService: PaymentService,
    private routerService: RouterService,
    private registerService: RegisterService,
    private currencyService: CurrencyConversionService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit() {
    this.registerService
      .getUserBalance(this.authenticationService.getUserId())
      .subscribe(
        (data) => {
          this.balance = data["balance"];
          console.log("Available Balance: ", this.balance);
        },
        (error) => {
          console.log(error);
        }
      );

    this.registerService
      .getUser(this.authenticationService.getUserId())
      .subscribe(
        (data) => {
          this.user = data;
          console.log("User:", this.user);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addPayment() {
    this.date = new Date();
    this.payment = {
      id: 1,
      customer: this.authenticationService.getUserId(),
      date: this.date.getDate(),
      month: this.monthNames[this.date.getMonth()],
      year: this.date.getFullYear(),
      city: this.city.value,
      country: this.country.value,
      category: this.category.value,
      outlet: this.outlet.value,
      amount: this.amount.value,
    };

    if (this.payment["country"] === "India") {
      this.payment["transactionCurrency"] = "INR";
    } else if (this.payment["country"] === "US") {
      this.payment["transactionCurrency"] = "USD";
    }

    if (this.user["isActive"] === "false") {
      this.snackBarService.showSnackBar(
        "This card is blocked!",
        "Contact the bank"
      );
      return;
    }

    this.registerService
      .getUserBaseCurrency(this.authenticationService.getUserId())
      .subscribe(
        (data) => {
          this.baseCurrency = data["baseCurrency"];

          console.log("Base Currency", this.baseCurrency);
          console.log(
            "Transaction Currency",
            this.payment["transactionCurrency"]
          );

          this.currencyService.getCurrencyConversionFromApi().subscribe(
            (data) => {
              let USD_TO_INR = data["quotes"]["USDINR"];
              console.log("USD to INR", USD_TO_INR);

              if (
                this.baseCurrency === "INR" &&
                this.payment["transactionCurrency"] === "USD"
              ) {
                this.payment["amount"] = this.currencyService.convertUSDtoINR(
                  this.payment["amount"],
                  USD_TO_INR
                );

                console.log("Amount after conversion", this.payment);
              } else if (
                this.baseCurrency === "USD" &&
                this.payment["transactionCurrency"] === "INR"
              ) {
                this.payment["amount"] = this.currencyService.convertINRtoUSD(
                  this.payment["amount"],
                  USD_TO_INR
                );
              }

              if (
                parseFloat(this.payment["amount"]) > parseFloat(this.balance)
              ) {
                this.snackBarService.showSnackBar("Insufficient Balance", "");
                return;
              } else {
                var newBal = parseFloat(this.balance) - this.payment["amount"];

                console.log("new balance", newBal);

                this.user["amount"] = newBal;

                this.registerService.updateUser(this.user).subscribe(
                  (data) => {
                    console.log("Updated Balance data", data);
                  },
                  (error) => {
                    console.log("Balance update error", error);
                  }
                );
              }

              this.paymentService.addUserPaymentData(this.payment).subscribe(
                (data) => {
                  console.log("Payment saved in DB", data);
                  this.routerService.routeToDashboard();
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCityErrorMessage() {
    if (this.city.touched && this.city.hasError("required")) {
      return "City is required";
    } else if (this.city.touched && this.city.hasError("pattern")) {
      return "City can only contain alphabetic characters";
    }
  }
  getCountryErrorMessage() {
    if (this.country.touched && this.country.hasError("required")) {
      return "Country is required";
    } else if (this.country.touched && this.country.hasError("pattern")) {
      return "Country can only contain alphabetic characters";
    }
  }

  getCategoryErrorMessage() {
    if (this.category.touched && this.category.hasError("required")) {
      return "Category is required";
    }
  }

  getOutletErrorMessage() {
    if (this.outlet.touched && this.outlet.hasError("required")) {
      return "Outlet is required";
    }
  }

  getAmountErrorMessage() {
    if (this.amount.touched && this.amount.hasError("required")) {
      return "Amount is required";
    } else if (this.amount.touched && this.amount.hasError("pattern")) {
      return "Amount can only contain numeric characters";
    }
  }
}
