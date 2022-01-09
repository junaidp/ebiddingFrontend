import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-constants';
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
  companyId: string = "";
  dataSource: IProject[] = [];
  constructor(
    private projectService: ProjectService,
    private _dialog: MatDialog,
    private common: CommonService
  ) {
    let companyId = localStorage.getItem("companyId");
    if (companyId)
      this.companyId = JSON.parse(companyId);
  }

  ngOnInit() {
    this.getAllProjects();
  }


  getAllProjects() {
    this.projectService.findAll(this.companyId).subscribe((data: any) => {
      this.dataSource = data;
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


    createProjectComponent.afterClosed().subscribe(result => {
      if (result) {
        let dialog = result == "project saved" ? GlobalConstants.success : GlobalConstants.error;
        this.common.showSuccessErrorSwalDialog(dialog, result.toString().toUpperCase(), 'Ok');
        this.refresh();
      }
    });
  }

  refresh() {
    this.getAllProjects();
  }
}
