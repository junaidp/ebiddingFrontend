import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProject } from 'src/app/interface/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private getProjectsUrl = environment.baseURL + 'getProjects'
  private saveProjectUrl = environment.baseURL + 'saveProject'

  constructor(private http: HttpClient) {

  }

  findAll(companyId: string) {
    return this.http.get<IProject[]>(`${this.getProjectsUrl}/${companyId}`);
  }

  saveProject(data: IProject) {
    return this.http.post(this.saveProjectUrl, data, { responseType: 'text' });
  }


}
