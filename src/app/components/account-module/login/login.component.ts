import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ILoginModule } from 'src/app/interface/ILoginModule';
import { CommonService } from 'src/app/Services/common/common.service';
import { AccountService } from 'src/app/Services/company-service/company.service';
import * as OktaSignIn from '@okta/okta-signin-widget';
import config from 'src/app/oktaAuth/okta';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
//const oktaAuth = new OktaAuth(config.oidc);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit,OnDestroy {

  oktaSign: any;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private common: CommonService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth
  ) {
    this.oktaSign = new OktaSignIn({
      logo: 'assets/image/env.jpg',
      feature: {
        registration: true
      },
      baseUrl: config.oidc.issuer.split('/oauth2')[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      authParam: {
        pkce: true,
        issuer: config.oidc.issuer,
        scopes: config.oidc.scope
      }
    })
  }
  submitting = false;
  loginModel: ILoginModule = {
    emailOrUser: '',
    password: '',
  };

  ngOnInit(): void {
    // $('body').addClass('login-page');
    //this.common.checkIfAlreadyLogin();
    this.oktaSign.renderEl({
      el: '#okta-sign-in-widget'
    }, (response: any) => {
      debugger
      if (response.status === 'SUCCESS') {
        this.oktaAuth.signInWithRedirect();
      }
    }, (error: any) => {
      throw error;
    })
  }

  ngOnDestroy(): void {
      this.oktaSign.removeItem();
  }

  toggleUi() {

  }
  submitForm(event: NgForm) {
    this.common.showSpinner();
    let req = {
      emailOrUser: event.value.emailOrUser,
      password: event.value.password
    }

    this.accountService.login(req).subscribe((res: any) => {
      if (res) {
        if (!res.userId || !res.companyId) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, "Incorrect credentials", "Ok");
        // this.common.showSuccessErrorSwalDialog(GlobalConstants.success, "Incorrect credentials", "Ok");
        localStorage.setItem("user", JSON.stringify(res));
        this.router.navigate(["/e-project"]);
        this.common.hideSpinner();
        return;
      }
      this.common.hideSpinner();
      return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, "Incorrect credentials", "Ok");
    })
  }
}
