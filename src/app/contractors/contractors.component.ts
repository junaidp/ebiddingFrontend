import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';
import { IContractor } from '../interface/IContractor';
import { CommonService } from '../Services/common/common.service';
import { ContractorService } from '../Services/contractor-service/contractor-service.service';
import { CreateContractorComponent } from './create-contractor/create-contractor.component';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class contractorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  companyId: string = "";
  dataSource: IContractor[] = [];
  constructor(
    private contractorService: ContractorService,
    private _dialog: MatDialog,
    private common: CommonService
  ) {
    let companyId = localStorage.getItem("companyId");
    if (companyId)
      this.companyId = JSON.parse(companyId);
  }

  ngOnInit() {
    this.getAllContractor();
  }

  getAllContractor() {
    this.contractorService.findAll(this.companyId).subscribe((data: any) => {
      this.dataSource = data;
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


    createContractorComponent.afterClosed().subscribe(result => {
      if (result) {
        let dialog = result == "contractor saved" ? GlobalConstants.success : GlobalConstants.error;
        this.common.showSuccessErrorSwalDialog(dialog, result.toString().toUpperCase(), 'Ok');
        this.refresh();
      }
    });
  }

  refresh() {
    this.getAllContractor();
  }


}
