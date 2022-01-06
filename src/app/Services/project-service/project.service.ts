import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private projectsUrl = environment.baseURL + 'getProjects/61cce8acbf285834f036cf9b'

  constructor(private http: HttpClient) {

  }

  findAll() {
    return this.http.get<Project[]>(this.projectsUrl);
  }


}
