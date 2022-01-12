import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingComponent } from './components/biddings/bidding/bidding.component';
import { BidListComponent } from './components/bids/bid-list/bid-list.component';
import { CreateBidComponent } from './components/bids/create-bid/bid.component';
import { ContractorsComponent } from './components/contractors/contractors.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterCompanyUserComponent } from './components/register-company-user/register-company-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterCompanyUserComponent, pathMatch: 'full' },
  { path: 'e-main', component: MainComponent, pathMatch: 'full' },
  { path: 'e-project', component: ProjectsComponent, pathMatch: 'full' },
  { path: 'e-contractor', component: ContractorsComponent, pathMatch: 'full' },
  { path: 'e-bid', component: BidListComponent, pathMatch: 'full' },
  { path: 'e-bid/create', component: CreateBidComponent, pathMatch: 'full' },
  { path: 'e-user', component: UsersComponent, pathMatch: 'full' },
  { path: 'bidding', component: BiddingComponent, pathMatch: 'full' },
  { path: 'bidding/:contractor/:bid', component: BiddingComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
