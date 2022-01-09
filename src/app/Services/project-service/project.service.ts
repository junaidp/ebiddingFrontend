import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProject } from 'src/app/interface/IProject';
import { ISaveProject } from 'src/app/interface/ISaveProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private getProjectsUrl = environment.baseUrl + 'getProjects'
  private saveProjectUrl = environment.baseUrl + 'saveProject'

  constructor(private http: HttpClient) {

  }

  findAll(companyId: string) {
    return this.http.get<IProject[]>(`${this.getProjectsUrl}/${companyId}`);
  }

  saveProject(data: ISaveProject) {
    return this.http.post(this.saveProjectUrl, data, { responseType: 'text' });
  }


}
