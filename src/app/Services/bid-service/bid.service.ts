import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bid } from 'src/app/model/bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private saveBidUrl = environment.baseURL + 'saveBid';

  handleError: any;

  constructor(private http: HttpClient) {

  }

  public saveBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(this.saveBidUrl, bid).pipe(
      catchError(this.handleError('saveBid', bid))
    );
  }
}
