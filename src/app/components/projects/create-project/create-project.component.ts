import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
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
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };

  submitting = false;
  constructor(
    private _service: ProjectService,
    private _dialogRef: MatDialogRef<CreateProjectComponent>,
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
    var req: ISaveProject = {
      name: event.form.value.name,
      description: event.form.value.description,
      companyId: this.adminUser.companyId
    }
    this._service.saveProject(req).subscribe((res: any) => {
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
