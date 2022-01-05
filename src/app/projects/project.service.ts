import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project';
import { GlobalConstants } from '../common/global-constants';


@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private projectsUrl: string;

  constructor(private http: HttpClient) {
    this.projectsUrl = GlobalConstants.baseUrl+'getProjects/61cce8acbf285834f036cf9b';
   }

   public findAll() {
    var result =  this.http.get<Project[]>(this.projectsUrl);
    return result;
  }


}
