import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginModule } from 'src/app/interface/ILoginModule';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loginUrl = environment.baseUrl + 'login'
  private saveCompanyUrl = environment.baseUrl + 'saveCompany'

  constructor(private http: HttpClient) {

  }

  login(data: ILoginModule) {
    return this.http.get(`${this.loginUrl}/${data.emailOrUser}/${data.password}`);
  }

  saveCompany(data: Object) {
    return this.http.post(this.saveCompanyUrl, data, { responseType: 'json' });
  }


}
