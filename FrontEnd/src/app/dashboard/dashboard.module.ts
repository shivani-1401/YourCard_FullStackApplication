import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  DashboardComponent,
  DialogOverview,
} from "./dashboard/dashboard.component";
import { MatCardModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [DashboardComponent, DialogOverview],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [DashboardComponent],
  entryComponents: [DialogOverview],
})
export class DashboardModule { }
