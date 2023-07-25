import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { CountUpModule } from 'ngx-countup';
import { PreloaderComponent } from './preloader/preloader.component';
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserCardComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    // RouterModule,
    FormsModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    CountUpModule
  ],
  exports: [
    UserCardComponent,
    PreloaderComponent,
  ]
})
export class WidgetModule { }
