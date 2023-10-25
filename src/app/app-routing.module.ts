import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CompanyStartComponent } from './company/company-start/company-start.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { WorkComponent } from './work/work.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { WorkEditComponent } from './work/work-edit/work-edit.component';
import { ReservationScreenComponent } from './reservation/reservation-screen/reservation-screen.component';
import { canActivate } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  {
    path: 'companies', canActivate: [canActivate],
    component: CompanyComponent,
    children: [
      { path: '', component: CompanyStartComponent },
      { path: 'new', component: CompanyEditComponent },
      { path: ':id', component: CompanyDetailComponent },
      { path: ':id/edit', component: CompanyEditComponent },
    ],
  },
  {
    path: 'work/:id',
    component: WorkComponent,
    children: [{ path: 'add', component: WorkEditComponent }],
  },
  {
    path: 'reservation/:compId',
    component: ReservationScreenComponent,
  },
  {
    path: 'reservation/:compId/:workId',
    component: ReservationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
