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
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
//const oktaAuth = new OktaAuth(config.oidc);
const DEFAULT_ORIGINAL_URI = window.location.origin;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  signIn: any;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private common: CommonService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth
  ) {
    this.signIn = new OktaSignIn({
      logo: 'assets/image/env.jpg',
      feature: {
        registration: true
      },
      baseUrl: config.oidc.issuer.split('/oauth2')[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      // authParam: {
      //   pkce: true,
      //   issuer: config.oidc.issuer,
      //   scopes: config.oidc.scope
      // }
    })
  }
  submitting = false;
  loginModel: ILoginModule = {
    emailOrUser: '',
    password: '',
  };
  ngOnInit() {
    debugger
    // When navigating to a protected route, the route path will be saved as the `originalUri`
    // If no `originalUri` has been saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: config.oidc.scope
    }).then((tokens: Tokens) => {
      // Remove the widget
      debugger
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
      // this.oktaAuth.signInWithRedirect();
    }).catch((err: any) => {
      debugger
      // Typically due to misconfiguration
      throw err;
    });
  }

  ngOnDestroy(): void {
    //this.signIn.removeItem();
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


  signINSubmit(event: NgForm) {
    this.common.showSpinner();
    this.oktaAuth.signIn({
      username: event.value.emailOrUser,
      password: event.value.password
    })
      .then(res => {
        this.common.hideSpinner();
        localStorage.setItem("user", JSON.stringify(res));
        return this.oktaAuth.token.getWithRedirect({
          sessionToken: res.sessionToken
        });
      })
      .catch(err => {
        this.common.hideSpinner();
        console.log('Found an error', err)
      }
      );
  }

}
