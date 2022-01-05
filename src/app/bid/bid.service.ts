import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Bid } from '../model/bid';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private saveBidUrl: string;

  handleError: any;

  constructor(private http: HttpClient) {
    this.saveBidUrl = GlobalConstants.baseUrl+'saveBid';
   }

   public saveBid(bid: Bid):Observable<Bid> {
    return  this.http.post<Bid>(this.saveBidUrl, bid).pipe(
      catchError(this.handleError('saveBid', bid))
    );
  }
}
