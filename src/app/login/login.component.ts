import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor() { }
  submitting = false;
  loginModel = {
    email: '',
    password: '',
  };
  ngOnInit(): void {
   // $('body').addClass('login-page');
  }

  toggleUi() {

  }


  submitForm(event: Object) {

  }


}