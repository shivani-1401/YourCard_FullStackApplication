import { Component, OnInit } from '@angular/core';
import { RouterService } from "src/app/services/router.service";

@Component({
  selector: 'app-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.css']
})
export class SubmittedComponent implements OnInit {

  constructor(private routerService: RouterService) { }

  ngOnInit() {
  }

  takeMeHome() {
    this.routerService.routeToHome();
  }

}
