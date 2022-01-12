import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ISaveBidding } from 'src/app/interface/ISaveBidding';
import { BiddingService } from 'src/app/Services/biddingService/biddingService.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { of, Subscription, timer } from "rxjs";
import { BidService } from 'src/app/Services/bid-service/bid.service';
import { IBid } from 'src/app/interface/Ibid';
import * as moment from 'moment';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  @Input() intervalPeriod: number = 1;
  message: string = "";
  lastBid: string = "";
  biddingModule: ISaveBidding = {
    amount: 0,
    contractorId: "",
    bidId: ""
  }
  bidModule: IBid = {
    name: "",
    date: "",
    companyId: "",
    project: "",
    contractor: "",
    bidId: ""
  }
  minute: number = 1;
  subscription: Subscription | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private common: CommonService,
    private biddingService: BiddingService,
    private bidService: BidService
  ) {

    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        let obj: any = { ...params.keys, ...params };
        this.biddingModule.bidId = obj[0].split(":")[1];
        this.biddingModule.contractorId = obj[1].split(":")[1];
      });
    if (!this.biddingModule.contractorId || !this.biddingModule.contractorId)
      this.common.showSuccessErrorSwalDialog(GlobalConstants.error, "Something went wrong refresh your page or contact to support", "Ok");
  }
  amount: number = 0;
  ngOnInit(): void {
    this.getBidDetails();

    this.minute = this.intervalPeriod * 30 * 1000;
    this.subscription = timer(3000, 30000)
      .pipe()
      .subscribe(res => {
        this.getBiddings();
      })
    debugger
    let lastBid = localStorage.getItem("lastBid");
    if (lastBid)
      this.lastBid = lastBid


  }


  getBidDetails() {
    debugger
    this.common.showSpinner();
    this.bidService.getBid(this.biddingModule.bidId).subscribe((res: any) => {
      if (res) {
        this.common.hideSpinner();
        let today = this.common.getCurrentDateMilis();
        let bidDateMili = parseInt(res['date']);
        if (today < bidDateMili) {
          let bidDate = this.common.milisToCurrentDateOnly(bidDateMili);
          let popupMessage = `Bidding not started yet , will start at ${bidDate}`;
          return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, popupMessage, "OK");
        }
        this.bidModule = res;
        
        // const message: string = res['message'];
        // const success: boolean = res['success'];
        // this.common.hideSpinner();
        // if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "OK");
      }
    })
  }


  submit(form: NgForm) {
    if (!form.valid)
      return;
    if (form.value.amount >= this.lastBid)
      return this.common.showSuccessErrorSwalDialog(GlobalConstants.error,"Your bid can not exceed the previous bid amount", "OK");
    this.common.showSpinner();
    var req: ISaveBidding = {
      amount: form.value.amount,
      contractorId: this.biddingModule.contractorId,
      bidId: this.biddingModule.bidId
    }
    this.biddingService.saveBidding(req).subscribe((res: any) => {
      if (res) {
        const message: string = res['message'];
        const success: boolean = res['success'];
        this.common.hideSpinner();
        if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "OK");
        this.common.showSuccessErrorSwalDialog(GlobalConstants.success, message, "OK");
        this.lastBid = form.value.amount;
        this.amount = 0;
        localStorage.setItem("lastBid", this.lastBid.toString());
      }
    })
  }
  getBiddings() {
    if (!this.biddingModule.bidId || !this.biddingModule.contractorId)
      return;
    this.common.showSpinner();
    this.biddingService.getBiddings(this.biddingModule.bidId, this.biddingModule.contractorId).subscribe((res: any) => {
      if (res) {
        this.common.hideSpinner();
        const message = res['message'];
        const success = res['success'];
        if (!success) this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        this.message = message;
      }
    })
  }

}
