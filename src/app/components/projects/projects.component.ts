import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { IProject } from 'src/app/interface/IProject';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProjectService } from 'src/app/Services/project-service/project.service';
import { CreateProjectComponent } from './create-project/create-project.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  ///encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  dataSource: IProject[] = [];
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  companyId: string = "";
  constructor(
    private projectService: ProjectService,
    private _dialog: MatDialog,
    private common: CommonService
  ) {
    this.adminUser = this.common.getUserObject();
  }



  ngOnInit() {
    this.getAllProjects();
  }


  getAllProjects() {
    this.common.showSpinner();
    this.projectService.findAll(this.adminUser.companyId).subscribe((data: any) => {
      this.dataSource = data;
      this.common.hideSpinner();
    });
  }


  openDialog(id: any) {
    let createProjectComponent;
    if (id === undefined || id <= 0) {
      createProjectComponent = this._dialog.open(CreateProjectComponent);
    } else {
      createProjectComponent = this._dialog.open(CreateProjectComponent, {
        data: id
      });
    }


    createProjectComponent.afterClosed().subscribe(res => {
      if (res) {
        const success: boolean = res['success'];
        const message: string = res['message'];
        if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        this.common.showSuccessErrorSwalDialog(GlobalConstants.success, message, "Ok");
        this.refresh();
      }
    });
  }

  refresh() {
    this.getAllProjects();
  }
}
