import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import {HomeComponent} from './components/home/home.component'
import {ReportComponent} from './components/report/report.component'
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' ,canActivate: [AuthGuard]},
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
 { path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin,Role.Manager] }}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
