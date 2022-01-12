import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { ISaveUser } from 'src/app/interface/ISaveProject copy';
import { CommonService } from 'src/app/Services/common/common.service';
import { UserService } from 'src/app/Services/user-service/user-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  submitting: boolean = false;
  userModel: ISaveUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    role: "",
    userId: ""
  }
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  constructor(
    private userService: UserService,
    private common: CommonService,
    private _dialogRef: MatDialogRef<CreateUserComponent>
  ) { 
    this.adminUser = this.common.getUserObject();
  }

  ngOnInit(): void {
  }


  submitForm(form: NgForm) {
    if (!form.valid)
    return;
    debugger
    this.common.showSpinner();
    this.submitting = true;
    let req = {
      name: form.value.name,
      companyId: this.adminUser.companyId,
      password: "123qwe",
      email: form.value.email,
      role: form.value.role,
      userId: this.adminUser.userId
    }

    this.userService.saveUser(req).subscribe(res => {
      if (res) {
        this.common.hideSpinner();
        this.submitting = false;
        this.close(res);
      }
    })

  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
