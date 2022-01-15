import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ICompanyRegister } from 'src/app/interface/ICompanyRegister';
import { IResponse } from 'src/app/interface/IResponse';
import { CommonService } from 'src/app/Services/common/common.service';
import { AccountService } from 'src/app/Services/company-service/company.service';
@Component({
  selector: 'app-register-company-user',
  templateUrl: './register-company-user.component.html',
  styleUrls: ['./register-company-user.component.css']
})
export class RegisterCompanyUserComponent implements OnInit {
  submitting = false;
  registerModule: ICompanyRegister = {
    firstName: '',
    lastName: '',
    phone: 0,
    email: '',
    password: '',
    company: "",
    address: ""
  };

  selectedCountryCode = 'us';
  phoneCode = '1';
  countryCodes = ['us', 'ca', 'de', 'mx', 'br', 'pt', 'cn', 'be', 'jp', 'ph', 'lu', 'bs'];
  constructor(
    private service: AccountService,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.common.checkIfAlreadyLogin();
  }

  submitForm(event: NgForm) {
    this.common.showSpinner();
    let req = {
      company: {
        name: event.value.companyName,
        address: event.value.address
      },
      admin: {
        name: `${event.value.firstName} ${event.value.lastName}`,
        companyId: "",
        password: event.value.password,
        email: event.value.email
      }
    }
    this.service.saveCompany(req).subscribe((res: any) => {
      if (res) {
        const message = res['message'];
        const success = res['success'];
        if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        this.common.showSuccessErrorSwalDialogResponse(GlobalConstants.success, message, "Ok").then(res => {
          if (res) {
            this.common.hideSpinner();
            this.router.navigate(["/login"]);
            
          }
        });
      }
    })
  }

  changeSelectedCountryCode(value: any): void {
    this.selectedCountryCode = value;
    //this.phoneCode = this.geoService.findCountryCodeByTwoLetterAbbreviation(this.selectedCountryCode);
  }


}
