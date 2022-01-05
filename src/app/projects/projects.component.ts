import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { Project } from '../model/project';
import { ProjectServiceService } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];

  dataSource: Project[] = [];
  constructor(private projectService: ProjectServiceService) { }

  ngOnInit() {
      this.projectService.findAll().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
}
