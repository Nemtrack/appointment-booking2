import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FadingDirective } from './shared/fading.directive';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CompanyComponent } from './company/company.component';
import { ReservationComponent } from './reservation/reservation.component';
import { WorkComponent } from './work/work.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyStartComponent } from './company/company-start/company-start.component';
import { CompanyItemComponent } from './company/company-list/company-item/company-item.component';

import { AppRoutingModule } from './app-routing.module';
import { WorkEditComponent } from './work/work-edit/work-edit.component';
import { ReservationScreenComponent } from './reservation/reservation-screen/reservation-screen.component';
import { AuthService } from './auth.service';
import { canActivate } from './auth-guard.service';
import { PopupComponent } from './popup/popup.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyComponent,
    ReservationComponent,
    WorkComponent,
    CompanyDetailComponent,
    CompanyEditComponent,
    CompanyListComponent,
    CompanyStartComponent,
    CompanyItemComponent,
    FadingDirective,
    WorkEditComponent,
    ReservationScreenComponent,
    PopupComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    AppRoutingModule,
    InputTextModule,
    InputMaskModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
