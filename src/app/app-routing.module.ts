import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidListComponent } from './components/bids/bid-list/bid-list.component';
import { CreateBidComponent } from './components/bids/create-bid/bid.component';
import { ContractorsComponent } from './components/contractors/contractors.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'e-main', component: MainComponent },
  { path: 'e-project', component: ProjectsComponent },
  { path: 'e-contractor', component: ContractorsComponent },
  { path: 'e-bid', component: BidListComponent },
  { path: 'e-bid/create', component: CreateBidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
