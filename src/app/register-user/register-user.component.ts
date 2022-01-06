import { Component, OnInit } from '@angular/core';
import { ILoginModule } from '../interface/ILoginModule';
import { IRegister } from '../interface/IRegister';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  submitting = false;
  registerModule: IRegister = {
    firsName: '',
    lastName: '',
    phone: 0,
    email: '',
    password: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

  submitForm(event: Object) {
    //this.router.navigate(["/e-project"]);
  }


}
