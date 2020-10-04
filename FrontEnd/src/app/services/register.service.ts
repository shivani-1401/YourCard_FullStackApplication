import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: any) {
    return this.httpClient.post(
      "http://localhost:8765/authenticationservice/auth/register",
      user
    );
  }

  getUserBaseCurrency(userId) {
    return this.httpClient.get(
      "http://localhost:8765/authenticationservice/getBaseCurrency/" + userId
    );
  }

  getUserBalance(userId) {
    return this.httpClient.get(
      "http://localhost:8765/authenticationservice/getUserBalance/" + userId
    );
  }

  updateUser(updatedUser) {
    return this.httpClient.put(
      "http://localhost:8765/authenticationservice/updateBalance",
      updatedUser
    );
  }

  getUser(userId) {
    return this.httpClient.get(
      "http://localhost:8765/authenticationservice/getUser/" + userId
    );
  }

  getCustomerId(userId) {
    return this.httpClient.get(`http://localhost:8765/authenticationservice/getCustomerId/${userId}`);
  }

  getCardNo(userId) {
    return this.httpClient.get(`http://localhost:8765/authenticationservice/getCardNo/${userId}`);
  }
}
