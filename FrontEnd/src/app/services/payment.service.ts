import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(private httpClient: HttpClient) { }

  addUserPaymentData(payment: any) {
    return this.httpClient.post(
      "http://localhost:8765/paymentservice/addPayment",
      payment
    );
  }

  getAllPayments(userId) {
    return this.httpClient.get(
      "http://localhost:8765/paymentservice/allPayments/" + userId
    );
  }
}
