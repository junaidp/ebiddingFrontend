import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBid } from 'src/app/interface/Ibid';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private saveBidUrl = environment.baseURL + 'saveBid';

  handleError: any;

  constructor(private http: HttpClient) {

  }

  public saveBid(bid: IBid) {
    return this.http.post(this.saveBidUrl, bid, { responseType: 'text' });
  }
}
