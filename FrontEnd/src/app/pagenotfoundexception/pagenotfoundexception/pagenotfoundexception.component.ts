import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/services/router.service";

@Component({
  selector: "app-pagenotfoundexception",
  templateUrl: "./pagenotfoundexception.component.html",
  styleUrls: ["./pagenotfoundexception.component.css"],
})
export class PagenotfoundexceptionComponent implements OnInit {
  constructor(private routerService: RouterService) { }

  ngOnInit() { }

  takeMeHome() {
    this.routerService.routeToHome();
  }

  takeMeToContactPage() {
    this.routerService.routeToContactUs();
  }
}
