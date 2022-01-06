import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICompany } from 'src/app/model/ICompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  private contractorsUrl = environment.baseURL + 'getContractors/61cce8acbf285834f036cf9b';

  constructor(private http: HttpClient) {

  }

  public findAll() {
    var result = this.http.get<ICompany[]>(this.contractorsUrl);
    return result;
  }

}
