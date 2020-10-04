import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import { MatCardModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
    MatCardModule,
    NgbModule,
    MatCarouselModule 
  ]
})
export class HomeModule { }