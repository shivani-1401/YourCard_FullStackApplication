import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  routeToHome() {
    this.router.navigate(['/home']);
  }

  routeToSubmitted() {
    this.router.navigate(['/submitted']);
  }

  routeToSearch() {
    this.router.navigate(['/search']);
  }

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  routeToContactUs() {
    this.router.navigate(['/contactus']);
  }

  routeToPayment() {
    this.router.navigate(['/payment']);
  }

  routeToRegister() {
    this.router.navigate(['/register']);
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }

}
