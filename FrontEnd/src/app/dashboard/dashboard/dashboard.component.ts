import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { PaymentService } from "src/app/services/payment.service";
import { Chart } from "node_modules/chart.js";
import { RegisterService } from "src/app/services/register.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { User } from "src/app/login/login/user";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  paymentList;
  errMessage: string;
  username: string;
  currentBalance: string;
  customerId: string;
  cardNo: string;
  symbol: string;
  cardLimit: string;
  cardType: string;

  user: User;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthenticationService,
    private registerService: RegisterService,
    private snackBarService: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.username = this.authService.getUserId();
    this.registerService.getUser(this.username).subscribe(
      (user) => {
        this.user = user;
        console.log("User data in dashboard", this.user);

        var num = parseFloat(user["amount"]);
        this.currentBalance = (Math.round(num * 100) / 100).toFixed(2);

        this.customerId = user["customerId"];

        this.cardNo = user["cardNo"];

        this.symbol = user["baseCurrency"] === "INR" ? "₹" : "$";

        this.cardLimit = user["cardLimit"];

        this.cardType = user["cardType"];
      },
      (error) => {
        console.log(error);
      }
    );

    this.paymentService.getAllPayments(this.authService.getUserId()).subscribe(
      (data) => {
        this.paymentList = data;
        this.createCharts();
      },
      (error) => {
        this.errMessage = error;
      }
    );
  }

  createCharts() {
    var myChart1 = new Chart("myChart1", {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: `Amount(${this.symbol}) spent in different months`,
            data: this.monthlyStatistic(),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 15,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    // For Graph2
    var myChart2 = new Chart("myChart2", {
      type: "horizontalBar",
      data: {
        labels: [
          "Food",
          "Entertainment",
          "Shopping",
          "Hotel Stay",
          "ATM",
          "Transport",
          "Others",
        ],
        datasets: [
          {
            label: `No of transactions done over different category`,
            data: this.categoryStatistic(),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 1)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 15,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    //For Graph3
    var myChart3 = new Chart("myChart3", {
      type: "pie",
      data: {
        labels: this.getUniqueCities(),
        datasets: [
          {
            label: "Transaction in different cities",
            data: this.cityWiseStatistic(),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "black",
            fontSize: 16,
          },
        },
      },
    });
  }

  monthlyStatistic(): number[] {
    let result: number[];

    result = this.paymentList.reduce(
      (temp, val) => {
        if (val["month"].toLowerCase() === "january") {
          temp[0] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "february") {
          temp[1] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "march") {
          temp[2] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "april") {
          temp[3] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "may") {
          temp[4] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "june") {
          temp[5] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "july") {
          temp[6] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "august") {
          temp[7] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "september") {
          temp[8] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "october") {
          temp[9] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "november") {
          temp[10] += parseInt(val["amount"]);
        } else if (val["month"].toLowerCase() === "december") {
          temp[11] += parseInt(val["amount"]);
        }
        return temp;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    console.log("Monthly User Data : ", result);

    return result;
  }

  categoryStatistic(): number[] {
    let result: number[];

    result = this.paymentList.reduce(
      (temp, payment) => {
        if (payment["category"].toLowerCase() === "food") {
          temp[0]++;
        } else if (payment["category"].toLowerCase() === "entertainment") {
          temp[1]++;
        } else if (payment["category"].toLowerCase() === "shopping") {
          temp[2]++;
        } else if (payment["category"].toLowerCase() === "hotelstay") {
          temp[3]++;
        } else if (payment["category"].toLowerCase() === "atm") {
          temp[4]++;
        } else if (payment["category"].toLowerCase() === "transport") {
          temp[5]++;
        } else if (payment["category"].toLowerCase() === "others") {
          temp[6]++;
        }

        return temp;
      },
      [0, 0, 0, 0, 0, 0, 0]
    );

    console.log("Categorically User Data : ", result);

    return result;
  }

  getUniqueCities(): string[] {
    let result: string[];

    result = this.paymentList.reduce((temp, payment) => {
      temp.push(payment["city"]);

      return temp;
    }, []);

    let unique = [...new Set(result)];

    console.log("Unique Cities", unique);

    return unique;
  }

  cityWiseStatistic(): number[] {
    let result: number[];

    let cities = this.getUniqueCities();

    result = this.paymentList.reduce((temp, payment) => {
      temp[cities.indexOf(payment["city"])]++;

      return temp;
    }, new Array(cities.length).fill(0));

    console.log("Count Cities", result);

    return result;
  }

  showDialogBox() {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: "350px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Result from Dialog box:", result);

      if (result) {
        this.user["isActive"] = "false";

        this.registerService.updateUser(this.user).subscribe(
          (data) => {
            this.snackBarService.showSnackBar("This card has been blocked", "");
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}

@Component({
  selector: "dialog-overview",
  templateUrl: "dialog-overview.html",
})
export class DialogOverview {
  constructor(public dialogRef: MatDialogRef<DialogOverview>) { }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
