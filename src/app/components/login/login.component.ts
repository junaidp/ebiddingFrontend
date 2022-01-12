import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ILoginModule } from 'src/app/interface/ILoginModule';
import { CommonService } from 'src/app/Services/common/common.service';
import { AccountService } from 'src/app/Services/company-service/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private common: CommonService
  ) { }
  submitting = false;
  loginModel: ILoginModule = {
    emailOrUser: '',
    password: '',
  };

  ngOnInit(): void {
    // $('body').addClass('login-page');
    this.common.checkIfAlreadyLogin('login');
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
        debugger
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
