import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../model/company';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  private contractorsUrl: string;

  constructor(private http: HttpClient) {

    // 61cce8acbf285834f036cf9b Is temporary, This value will be companyId (After the company LogsIn, we will send that companyId here)
    this.contractorsUrl = GlobalConstants.baseUrl+'getContractors/61cce8acbf285834f036cf9b';
   }

   public findAll() {
    var result =  this.http.get<Company[]>(this.contractorsUrl);
    return result;
  }

}