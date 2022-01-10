import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IContractor } from 'src/app/interface/IContractor';
import { ISaveContractor } from 'src/app/interface/ISaveContractor';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  private getContractorsUrl = environment.baseUrl + 'getContractors';
  private saveContractorsUrl = environment.baseUrl + 'saveContractor';

  constructor(private http: HttpClient) {
    
  }

  public findAll(companyId: string) {
    var result = this.http.get<IContractor[]>(`${this.getContractorsUrl}/${companyId}`);
    return result;
  }

  saveContractor(data: ISaveContractor) {
    return this.http.post(this.saveContractorsUrl, data, { responseType: 'text' });
  }

}
