import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  searchPaymentsByOutlet(userId, outlet) {
    return this.httpClient.get(`http://localhost:8765/paymentservice/allPaymentsByOutlet/${userId}/${outlet}`);
  }

  searchPaymentsByCategory(userId, category) {
    return this.httpClient.get(`http://localhost:8765/paymentservice/allPaymentsByCategory/${userId}/${category}`);
  }

  searchPaymentsByCity(userId, city) {
    return this.httpClient.get(`http://localhost:8765/paymentservice/allPaymentsByCity/${userId}/${city}`);

  }

  searchPaymentsByCountry(userId, country) {
    return this.httpClient.get(`http://localhost:8765/paymentservice/allPaymentsByCountry/${userId}/${country}`);
  }

  searchPaymentsByYear(userId, year) {
    return this.httpClient.get(`http://localhost:8765/paymentservice/allPaymentsByYear/${userId}/${year}`);
  }

  searchPaymentsByMonth(userId, month) {
    return this.httpClient.get(`http://localhost:8765/paymentservice/allPaymentsByMonth/${userId}/${month}`);
  }
}