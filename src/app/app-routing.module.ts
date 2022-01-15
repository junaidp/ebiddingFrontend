import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account-module/account.component';
import { BiddingComponent } from './components/account-module/biddings/bidding/bidding.component';
import { LoginComponent } from './components/account-module/login/login.component';
import { RegisterCompanyUserComponent } from './components/account-module/register-company-user/register-company-user.component';
import { BidListComponent } from './components/main-module/bids/bid-list/bid-list.component';
import { CreateBidComponent } from './components/main-module/bids/create-bid/bid.component';
import { ContractorsComponent } from './components/main-module/contractors/contractors.component';
import { MainComponent } from './components/main-module/main.component';
import { ProjectsComponent } from './components/main-module/projects/projects.component';
import { UsersComponent } from './components/main-module/users/users.component';

const routes: Routes = [
  {
    path: 'account', component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterCompanyUserComponent, pathMatch: 'full' },
      { path: 'bidding', component: BiddingComponent, pathMatch: 'full' },
    ]
  },
  {
    path: '', component: MainComponent,
    children: [
      { path: 'e-project', component: ProjectsComponent, pathMatch: 'full' },
      { path: 'e-contractor', component: ContractorsComponent, pathMatch: 'full' },
      { path: 'e-bid', component: BidListComponent, pathMatch: 'full' },
      { path: 'e-bid/create', component: CreateBidComponent, pathMatch: 'full' },
      { path: 'e-user', component: UsersComponent, pathMatch: 'full' },
      { path: '**', component: ProjectsComponent  }
    ]
  }
 
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
