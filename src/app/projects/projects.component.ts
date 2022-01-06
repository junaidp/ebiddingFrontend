import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectServiceService } from '../Services/project-service/project.service';

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
    this.getAllProjects();
  }


  getAllProjects() {
    this.projectService.findAll().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
}
