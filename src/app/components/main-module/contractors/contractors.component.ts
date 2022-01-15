import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-constants';
import { IContractor } from 'src/app/interface/IContractor';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { CommonService } from 'src/app/Services/common/common.service';
import { ContractorService } from 'src/app/Services/contractor-service/contractor-service.service';
import { CreateContractorComponent } from './create-contractor/create-contractor.component';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'email'];
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
    private contractorService: ContractorService,
    private _dialog: MatDialog,
    private common: CommonService
  ) {
    this.adminUser = this.common.getUserObject();
    if (!this.adminUser)
      this.common.redirectToLogin();
  }


  ngOnInit() {
    this.getAllContractor();
  }

  getAllContractor() {
    if (this.adminUser && !this.adminUser.companyId)
    return;
    this.common.showSpinner();
    this.contractorService.findAll(this.adminUser.companyId).subscribe((data: any) => {
      this.dataSource = data;
      this.common.hideSpinner();
    });
  }

  openDialog(id: any) {
    let createContractorComponent;
    if (id === undefined || id <= 0) {
      createContractorComponent = this._dialog.open(CreateContractorComponent);
    } else {
      createContractorComponent = this._dialog.open(CreateContractorComponent, {
        data: id
      });
    }


    createContractorComponent.afterClosed().subscribe(res => {
      if (res) {
        // const success: boolean = res['success'];
        // const message: string = res['message'];
        // if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        // this.common.showSuccessErrorSwalDialog(GlobalConstants.success, message, "Ok");
        if (res !== "contractor saved")
          return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, res, "Ok");
        this.common.showSuccessErrorSwalDialog(GlobalConstants.success, res, "Ok");
        this.refresh()
      }
    });
  }

  refresh() {
    this.getAllContractor();
  }


}
