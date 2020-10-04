import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CurrencyConversionService {
  constructor(private httpClient: HttpClient) { }

  getCurrencyConversionFromApi() {
    return this.httpClient.get(
      "http://api.currencylayer.com/live?access_key=c4c99dc9e972c4b89996a9c9eb6f0505&currencies=INR,USD"
    );
  }

  convertUSDtoINR(usdAmt, constant) {
    return usdAmt * constant;
  }

  convertINRtoUSD(inrAmt, constant) {
    return inrAmt / constant;
  }
}
