import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ISaveContractor } from 'src/app/interface/ISaveContractor';
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
  submitting = false;
  constructor(private _service: ContractorService, private _dialogRef: MatDialogRef<CreateContractorComponent>) { }

  ngOnInit(): void {
    let companyId = localStorage.getItem("companyId");
    if (companyId)
      this.contractorModel.companyId = JSON.parse(companyId);
  }

  submitForm(event: any) {
    var req: ISaveContractor = {
      name: event.form.value.name,
      description: event.form.value.description,
      email: event.form.value.email,
      companyId: this.contractorModel.companyId,
    }
    this._service.saveContractor(req).subscribe((res: any) => {
      if (res) {
        this.close(res);
      }
    })

  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
