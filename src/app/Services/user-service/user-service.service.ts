import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IContractor } from 'src/app/interface/IContractor';
import { ISaveContractor } from 'src/app/interface/ISaveContractor';
import { ISaveUser } from 'src/app/interface/ISaveProject copy';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUsersUrl = environment.baseUrl + 'getContractors';
  private saveUserUrl = environment.baseUrl + 'saveUser';

  constructor(private http: HttpClient) {
    
  }

  public findAll(companyId: string) {
    var result = this.http.get<IContractor[]>(`${this.getUsersUrl}/${companyId}`);
    return result;
  }

  saveUser(data: ISaveUser) {
    return this.http.post(this.saveUserUrl, data, { responseType: 'text' });
  }

}
