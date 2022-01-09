import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProject } from 'src/app/interface/IProject';
import { ISaveProject } from 'src/app/interface/ISaveProject';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProjectService } from 'src/app/Services/project-service/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  projectModel: ISaveProject = {
    name: "",
    description: "",
    companyId: ""
  }
  submitting = false;
  constructor(
    private _service: ProjectService,
    private _dialogRef: MatDialogRef<CreateProjectComponent>,
    private common: CommonService
  ) {
    let companyId = localStorage.getItem("companyId");
    if (companyId)
      this.projectModel.companyId = JSON.parse(companyId);
  }

  ngOnInit(): void {
  }

  submitForm(event: any) {
    this.common.showSpinner();
    var req: ISaveProject = {
      name: event.form.value.name,
      description: event.form.value.description,
      companyId: this.projectModel.companyId
    }
    this._service.saveProject(req).subscribe((res: any) => {
      if (res) {
        this.common.hideSpinner();
        this.close(res);
      }
    })

  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
