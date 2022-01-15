import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISaveBidding } from 'src/app/interface/ISaveBidding';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  private saveBiddingUrl = environment.baseUrl + 'saveBidding';
  private getBiddingUrl = environment.baseUrl + 'getBiddingResults';

  handleError: any;

  constructor(private http: HttpClient) {

  }


  getBiddings(bidId: string, contractorId: string) {
    return this.http.get(`${this.getBiddingUrl}/?bidId=${bidId}&contractorId=${contractorId}`);
  }

  public saveBidding(bid: ISaveBidding) {
    return this.http.post(this.saveBiddingUrl, bid, { responseType: 'json' });
  }
}
