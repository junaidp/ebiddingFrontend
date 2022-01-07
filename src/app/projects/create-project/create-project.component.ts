import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/interface/IProject';
import { ProjectService } from 'src/app/Services/project-service/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  projectModel: IProject = {
    name: "",
    description: "",
    companyId: ""
  }
  submitting = false;
  constructor(private _service: ProjectService) { }

  ngOnInit(): void {
  }

  async submitForm(event: any) {
    var req: IProject = {
      name: event.form.value.name,
      description: event.form.value.description,
      companyId: "abc"
    }
    const response = await this._service.saveProject(event).toPromise();
  }

}
