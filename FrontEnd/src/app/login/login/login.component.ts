import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from './user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z]+(?: +[A-Za-z]+)*$')]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
  user: User;
  loginMessage: string;

  constructor(private authService: AuthenticationService, private routerService: RouterService) { }

  ngOnInit() {
  }

  loginSubmit() {
    let token;
    this.user = {
      id: this.id.value,
      password: this.password.value
    };
    this.authService.authenticateUser(this.user).subscribe(
      data => {
        token = data['token'];
        if (token != undefined && token != null) {
          this.loginMessage = "Login successful"
          this.authService.setBearerToken(data['token']);
          this.authService.setUserId(data['user']);
          this.routerService.routeToDashboard();
        }
      },
      err => {
        this.loginMessage = "Not Authenticated";
      }
    );
  }
  getuserIdErrorMessage() {
    if (this.id.touched && this.id.hasError('required')) {
      return 'Username is required';
    } else if (this.id.touched && this.id.hasError('pattern')) {
      return 'Username can only contain alphabetic characters';
    }
  }
  getPasswordErrorMessage() {
    if (this.password.touched && this.password.hasError('required')) {
      return 'Password is required';
    } else if (this.password.touched && this.password.hasError('minlength')) {
      return 'Minimum length of password should be 5';
    }
  }
}


