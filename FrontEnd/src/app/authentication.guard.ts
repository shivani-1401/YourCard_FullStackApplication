import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./services/authentication.service";
import { RouterService } from "./services/router.service";
import { SnackbarService } from "./services/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private routerService: RouterService,
    private snackBarService: SnackbarService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const status = this.authService.isUserAuthenticated();

    console.log("Is Authenticated", status);

    if (status) {
      return true;
    } else {
      this.snackBarService.showSnackBar(
        "User not logged in",
        "Please login first!"
      );
      this.routerService.routeToLogin();
      return false;
    }
  }
}
