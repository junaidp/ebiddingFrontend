import { Injector, NgModule } from '@angular/core';
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { LoginComponent } from './components/account-module/login/login.component';
import { ProjectsComponent } from './components/main-module/projects/projects.component';
import { ContractorsComponent } from './components/main-module/contractors/contractors.component';
import { RegisterCompanyUserComponent } from './components/account-module/register-company-user/register-company-user.component';
import { CreateProjectComponent } from './components/main-module/projects/create-project/create-project.component';
import { CreateContractorComponent } from './components/main-module/contractors/create-contractor/create-contractor.component';
import { BidListComponent } from './components/main-module/bids/bid-list/bid-list.component';
import { CreateBidComponent } from './components/main-module/bids/create-bid/bid.component';
import { UsersComponent } from './components/main-module/users/users.component';
import { BiddingComponent } from './components/account-module/biddings/bidding/bidding.component';
import { CreateUserComponent } from './components/main-module/users/create-user/create-user.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { AccountComponent } from './components/account-module/account.component';
import { MainComponent } from './components/main-module/main.component';
import { CountdownModule } from 'ngx-countdown';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { Router } from '@angular/router';
import okta from './oktaAuth/okta';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaConfig = Object.assign({
  onAuthRequired: (injecttor: Injector) => {
    const router = injecttor.get(Router);
    router.navigate(['account/login']);
  }
});


const oktaAuth = new OktaAuth({ ...okta.oidc});

//const oktaAuth = new OktaAuth(okta.oidc);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    PostCreateComponent,
    LoginComponent,
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
    AccountComponent,
    MainComponent
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
    NgxMatNativeDateModule,
    CountdownModule,
    MatPaginatorModule,
    OktaAuthModule

  ],
  providers: [MatDatepickerModule,
    {
      provide: OKTA_CONFIG,
      useFactory: () => {
        const oktaAuth = new OktaAuth(okta.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = () => {
              // Redirect the user to your custom login page
              const router = injector.get(Router);
              router.navigate(['account/login']);
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              // App initialization stage
              triggerLogin();
            } else {
              // Ask the user to trigger the login process during token autoRenew process
              console.log("Do you want to re-authenticate?");
              // const modalService = injector.get(SuiModalService);
              // modalService
              //   .open(new ConfirmModal("Do you want to re-authenticate?", "Auth required", "Yes", "No"))
              //   .onApprove(triggerLogin)
              //   .onDeny(() => {});
            }
          }  
        }
      }
      //useValue: { oktaAuth }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
