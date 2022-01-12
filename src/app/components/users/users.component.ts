import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-constants';
import { IContractor } from 'src/app/interface/IContractor';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { CommonService } from 'src/app/Services/common/common.service';
import { UserService } from 'src/app/Services/user-service/user-service.service';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  dataSource: IContractor[] = [];
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  constructor(
    private common: CommonService,
    private userService: UserService,
    private _dialog: MatDialog
  ) {
    this.adminUser = this.common.getUserObject('');
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.common.showSpinner();
    this.userService.findAll(this.adminUser.companyId).subscribe((data: any) => {
      this.dataSource = data;
      this.common.hideSpinner();
    });
  }

  openDialog(id: any) {
    let createUserComponent;
    if (id === undefined || id <= 0) {
      createUserComponent = this._dialog.open(CreateUserComponent);
    } else {
      createUserComponent = this._dialog.open(CreateUserComponent, {
        data: id
      });
    }


    createUserComponent.afterClosed().subscribe(res => {
      if (res) {
        debugger
        // const success: boolean = res['success'];
        // const message: string = res['message'];
        // if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        // this.common.showSuccessErrorSwalDialog(GlobalConstants.success, message, "Ok");
        if (res !== "contractor saved")
          return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, res, "Ok");
        this.common.showSuccessErrorSwalDialog(GlobalConstants.success, res, "Ok");
      }
    });
  }

  refresh() {
    this.getAllUsers();
  }

}
