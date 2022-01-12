import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBid } from 'src/app/interface/Ibid';
import { ISaveBid } from 'src/app/interface/ISaveBid';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private saveBidUrl = environment.baseUrl + 'saveBid';
  private getBidUrl = environment.baseUrl + 'getBids';
  private getBidDetails = environment.baseUrl + 'getBid';

  handleError: any;

  constructor(private http: HttpClient) {

  }

  getBid(bidId: string) {
    return this.http.get<IBid>(`${this.getBidDetails}/${bidId}`);
  }


  findAll(companyId: string) {
    return this.http.get<IBid[]>(`${this.getBidUrl}/${companyId}`);
  }

  public saveBid(bid: ISaveBid) {
    return this.http.post(this.saveBidUrl, bid, { responseType: 'json' });
  }
}
