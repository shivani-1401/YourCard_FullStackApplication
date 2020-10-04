import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactusComponent } from "./contactus/contactus.component";

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ContactusComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ContactusModule { }
