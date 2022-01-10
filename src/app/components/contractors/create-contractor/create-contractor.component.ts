import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { ISaveContractor } from 'src/app/interface/ISaveContractor';
import { CommonService } from 'src/app/Services/common/common.service';
import { ContractorService } from 'src/app/Services/contractor-service/contractor-service.service';

@Component({
  selector: 'app-create-contractor',
  templateUrl: './create-contractor.component.html',
  styleUrls: ['./create-contractor.component.css']
})
export class CreateContractorComponent implements OnInit {

  contractorModel: ISaveContractor = {
    name: "",
    description: "",
    email: "",
    companyId: ""
  }
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  submitting = false;
  constructor(private _service: ContractorService,
    private _dialogRef: MatDialogRef<CreateContractorComponent>,
    private common: CommonService
  ) {
    this.adminUser = this.common.getUserObject();
  }

  ngOnInit(): void {
  }

  submitForm(event: NgForm) {
    if (!event.valid)
      return;

    this.common.showSpinner();
    this.submitting = true;
    var req: ISaveContractor = {
      name: event.form.value.name,
      description: event.form.value.description,
      email: event.form.value.email,
      companyId: this.adminUser.companyId,
    }
    this._service.saveContractor(req).subscribe((res: any) => {
      if (res) {
        this.common.hideSpinner();
        this.submitting = false;
        this.close(res);
      }
      this.common.hideSpinner();
    })

  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
