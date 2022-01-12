import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { SideNavComponent } from './shared-modules/side-nav/side-nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContractorsComponent } from './components/contractors/contractors.component';
import { CreateContractorComponent } from './components/contractors/create-contractor/create-contractor.component';
import { CreateProjectComponent } from './components/projects/create-project/create-project.component';
import { BidListComponent } from './components/bids/bid-list/bid-list.component';
import { CreateBidComponent } from './components/bids/create-bid/bid.component';
import { RegisterCompanyUserComponent } from './components/register-company-user/register-company-user.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { BiddingComponent } from './components/biddings/bidding/bidding.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    PostCreateComponent,
    MainComponent,
    ProjectsComponent,
    ContractorsComponent,
    SideNavComponent,
    RegisterCompanyUserComponent,
    CreateProjectComponent,
    CreateContractorComponent,
    BidListComponent,
    CreateBidComponent,
    UsersComponent,
    CreateUserComponent,
    BiddingComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    NgxFlagPickerModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
