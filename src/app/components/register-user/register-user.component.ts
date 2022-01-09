import { Component, OnInit } from '@angular/core';
import { IRegister } from 'src/app/interface/IRegister';
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

  selectedCountryCode = 'us';
  phoneCode = '1';
  countryCodes = ['us', 'ca', 'de', 'mx', 'br', 'pt', 'cn', 'be', 'jp', 'ph', 'lu', 'bs'];
  constructor() { }

  ngOnInit(): void {
  }

  submitForm(event: Object) {
    debugger
    //this.router.navigate(["/e-project"]);
  }

  changeSelectedCountryCode(value: any): void {
    this.selectedCountryCode = value;
    //this.phoneCode = this.geoService.findCountryCodeByTwoLetterAbbreviation(this.selectedCountryCode);
  }


}
