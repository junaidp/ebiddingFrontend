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
  currentBiddingTimer: number = 0;
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
  today: number = 0;
  bidDateMili: number = 0;
  //minute: number = 1;
  bidStartingDate: string = "";
  biddingClosed: boolean = false;

  config: Object = { leftTime: 300, format: 'm:s' };
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
    this.handleBiddingTimer();

    let biddingObject = localStorage.getItem("biddingObject");
    if (!biddingObject)
      return;
    let obj = JSON.parse(biddingObject);
    if (obj.bidId == this.biddingModule.bidId) {
      this.lastBid = obj.lastBid;
      this.currentBiddingTimer = +obj.currentBiddingTimer;
      this.config = {
        leftTime: (10 - this.currentBiddingTimer) * 30, format: 'm:s'
      }
    }
  }


  handleBiddingTimer() {
    if (this.today < this.bidDateMili)
          return;
   //this.minute = this.intervalPeriod * 30 * 1000;
    this.subscription = timer(3000, 30000)
      .pipe()
      .subscribe(res => {
        this.today = this.common.getCurrentDateMilis();
        if (this.today < this.bidDateMili)
          return;

        if (res > 0 && res < this.currentBiddingTimer)
          this.currentBiddingTimer++
        else
          if (res > 0)
            this.currentBiddingTimer++


        this.config = {
          leftTime: (10 - this.currentBiddingTimer) * 30, format: 'm:s'
        }
        var obj = {
          lastBid: this.lastBid,
          bidId: this.bidModule.bidId,
          currentBiddingTimer: this.currentBiddingTimer
        }
        localStorage.setItem("biddingObject", JSON.stringify(obj));


        this.getBiddings();

        if (this.currentBiddingTimer > 10) {
          this.biddingClosed = true;
          return;
        }

        if (this.currentBiddingTimer == 10) {
          this.biddingClosed = true;
          return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, "Bidding is Closed", "Ok");
        }
      })
  }


  getBidDetails() {
    if (!this.biddingModule.bidId)
      return;
    this.common.showSpinner();
    this.bidService.getBid(this.biddingModule.bidId).subscribe((res: any) => {
      if (res) {
        this.common.hideSpinner();
        this.today = this.common.getCurrentDateMilis();
        this.bidDateMili = parseInt(res['date']);
        this.bidModule = res;
        if (this.today < this.bidDateMili) {
          this.bidStartingDate = this.common.milisToCurrentDateAndTime(this.bidDateMili);
          let popupMessage = `Bidding not started yet , will start at ${this.bidStartingDate}`;
          return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, popupMessage, "OK");
        }


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
    if (this.lastBid != "")
      if (form.value.amount >= parseInt(this.lastBid))
        return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, "Your bid can not exceed the previous bid amount", "OK");
    if (this.today < this.bidDateMili) {
      let popupMessage = `Bidding not started yet , will start at ${this.bidStartingDate}`;
      return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, popupMessage, "OK");
    }

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
        var obj = {
          lastBid: this.lastBid,
          bidId: this.bidModule.bidId,
          currentBiddingTimer: this.currentBiddingTimer
        }
        localStorage.setItem("biddingObject", JSON.stringify(obj));
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


  convertHMS(sec: number) {
    //const sec = parseInt(value, 10); // convert value to number if it's string
    //let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor(sec / 60); // get minutes
    let seconds = sec; //  get seconds
    let stringHorse = "";
    let stringMin = "";
    let stringSec = "";
    // add 0 if value < 10; Example: 2 => 02
    //if (hours < 10) { stringHorse = "0" + hours; }
    if (minutes < 10) { stringMin = "0" + minutes; }
    if (seconds > 0) { stringSec = "" + seconds; }
    return stringMin + ':' + stringSec; // Return is HH : MM : SS
  }

  handleEvent(event: any) {
    debugger
  }

}
