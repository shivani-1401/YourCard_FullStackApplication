import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Payment } from "src/app/payment/payment";
import { AuthenticationService } from "src/app/services/authentication.service";
import { PaymentService } from "src/app/services/payment.service";
import { RegisterService } from "src/app/services/register.service";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  paymentList;
  errorMessage: string;
  username: string;
  searchparam = new FormControl();

  symbol: string;

  constructor(
    private searchService: SearchService,
    private authService: AuthenticationService,
    private paymentService: PaymentService,
    private registerService: RegisterService
  ) {
    this.errorMessage = "";
    this.paymentList = null;
  }

  ngOnInit() {
    this.username = this.authService.getUserId();

    this.registerService.getUserBaseCurrency(this.username).subscribe(
      (data) => {
        this.symbol = data["baseCurrency"] === "INR" ? "₹" : "$";
      },
      (error) => {
        console.log(error);
      }
    );

    this.paymentService.getAllPayments(this.authService.getUserId()).subscribe(
      (data) => {
        this.paymentList = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  getPaymentDetails(keyword) {
    let param;
    param = this.searchparam.value;
    this.errorMessage = "";
    this.paymentList = null;
    if (param == "outlet") {
      this.searchService
        .searchPaymentsByOutlet(this.authService.getUserId(), keyword)
        .subscribe(
          (data) => {
            this.paymentList = data;
          },
          (err) => {
            this.errorMessage =
              "OOPS! Payment details with the given outlet name is not found";
          }
        );
    } else if (param == "category") {
      this.searchService
        .searchPaymentsByCategory(this.authService.getUserId(), keyword)
        .subscribe(
          (data) => {
            this.paymentList = data;
          },
          (err) => {
            this.errorMessage =
              "OOPS! Payment details with the given category is not found";
          }
        );
    } else if (param == "city") {
      this.searchService
        .searchPaymentsByCity(this.authService.getUserId(), keyword)
        .subscribe(
          (data) => {
            this.paymentList = data;
          },
          (err) => {
            this.errorMessage =
              "OOPS! Payment details with the given city name is not found";
          }
        );
    } else if (param == "country") {
      this.searchService
        .searchPaymentsByCountry(this.authService.getUserId(), keyword)
        .subscribe(
          (data) => {
            this.paymentList = data;
          },
          (err) => {
            this.errorMessage =
              "OOPS! Payment details with the given country name is not found";
          }
        );
    } else if (param == "year") {
      this.searchService
        .searchPaymentsByYear(this.authService.getUserId(), keyword)
        .subscribe(
          (data) => {
            this.paymentList = data;
          },
          (err) => {
            this.errorMessage =
              "OOPS! Payment details  with the given year is not found";
          }
        );
    } else if (param == "month") {
      this.searchService
        .searchPaymentsByMonth(this.authService.getUserId(), keyword)
        .subscribe(
          (data) => {
            this.paymentList = data;
          },
          (err) => {
            this.errorMessage =
              "OOPS! Payment details with the given month is not found";
          }
        );
    }
  }

  getAmountInTwoDecimalPlaces(amt): string {
    var num = parseFloat(amt);
    amt = (Math.round(num * 100) / 100).toFixed(2);

    return amt;
  }
}
