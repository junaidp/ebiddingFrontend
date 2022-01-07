import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IProject } from '../interface/IProject';
import { ProjectService } from '../Services/project-service/project.service';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private projectService: ProjectService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProjects();
  }


  getAllProjects() {
    this.projectService.findAll().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  openDialog() {
    this._dialog.open(CreateProjectComponent);
  }
}
