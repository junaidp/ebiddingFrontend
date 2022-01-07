import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProject } from 'src/app/interface/IProject';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = environment.baseURL + 'getProjects/61cce8acbf285834f036cf9b'

  constructor(private http: HttpClient) {

  }

  findAll() {
    return this.http.get<IProject[]>(this.projectsUrl);
  }


}
