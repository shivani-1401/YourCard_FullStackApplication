import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/services/router.service";
import { FormControl } from '@angular/forms';
import { ContactusService } from 'src/app/services/contactus.service';

@Component({
  selector: "app-contactus",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.css"],
})
export class ContactusComponent implements OnInit {

  public query;
  public queryMessage;
  name = new FormControl();
  email = new FormControl();
  country = new FormControl();
  subject = new FormControl();
  constructor(private routerService: RouterService, private contactusService: ContactusService) { }

  ngOnInit() {

  }

  submitContactUsForm() {
    this.query = {
      name: this.name.value,
      email: this.email.value,
      country: this.country.value,
      subject: this.subject.value
    };
    this.contactusService.postQuery(this.query).subscribe(
      data => {
        this.queryMessage = data;
        this.routerService.routeToSubmitted();
      }
    );
  }
}


