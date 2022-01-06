import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidComponent } from './bid/bid.component';
import { contractorsComponent } from './contractors/contractors.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'e-main', component: MainComponent},
  {path: 'e-project', component: ProjectsComponent},
  {path: 'e-contractor', component: contractorsComponent},
  {path: 'e-bid', component: BidComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
