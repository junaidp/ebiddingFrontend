import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginModule } from '../interface/ILoginModule';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  submitting = false;
  loginModel: ILoginModule = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    // $('body').addClass('login-page');
  }

  toggleUi() {

  }
  submitForm(event: Object) {
    debugger
    localStorage.setItem("companyId", JSON.stringify("61cce8acbf285834f036cf9b"));
    this.router.navigate(["/e-project"]);
  }

}
