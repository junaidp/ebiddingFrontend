import { Component } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import okta from './oktaAuth/okta';
const oktaAuth = new OktaAuth(okta.oidc);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mean-course';
  public constructor() {

  }
  
}
