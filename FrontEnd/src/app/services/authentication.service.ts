import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  authenticateUser(user) {
    return this.httpClient.post(
      "http://localhost:8765/authenticationservice/auth/login",
      user
    );
  }

  setBearerToken(token: string) {
    localStorage.setItem("bearer token", token);
  }

  getBearerToken() {
    return localStorage.getItem("bearer token");
  }

  setUserId(userId: string) {
    localStorage.setItem("userId", userId);
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  isUserAuthenticated(): boolean {
    let token = localStorage.getItem("bearer token");
    if (token != undefined && token != null) {
      return true;
    } else {
      return false;
    }
  }

  logoutUser() {
    localStorage.clear();
  }
}
