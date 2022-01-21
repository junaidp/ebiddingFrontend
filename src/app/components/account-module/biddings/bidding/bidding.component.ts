import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ISaveBidding } from 'src/app/interface/ISaveBidding';
import { BiddingService } from 'src/app/Services/biddingService/biddingService.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { Observable, of, Subscription, timer } from "rxjs";
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
  //currentBiddingTimer: number = 0;
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
  biddingEndTime: number = 0;
  bidDateMili: number = 0;
  //minute: number = 1;
  bidStartingDate: string = "";
  bidEndingDate: string = "";
  biddingClosed: boolean = false;
  biddingStarted: boolean = true;
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
    this.handleBiddingTimer();

    let biddingObject = localStorage.getItem("biddingObject");
    if (!biddingObject)
      return;
    let obj = JSON.parse(biddingObject);
    if (obj.bidId == this.biddingModule.bidId) {
      this.lastBid = obj.lastBid;
    }
  }


  handleBiddingTimer() {
    //this.minute = this.intervalPeriod * 30 * 1000;
    this.subscription = timer(3000, 30000)
      .pipe()
      .subscribe(resTimer => {
        if (!this.biddingModule.bidId)
          return;
        this.common.showSpinner();
        this.bidService.getBid(this.biddingModule.bidId).subscribe((res: any) => {
          if (res) {
            this.common.hideSpinner();
            this.today = this.common.getCurrentDateMilis();
            this.bidDateMili = parseInt(res['date']);
            this.bidModule = res;
            this.biddingEndTime = 300000 + this.bidDateMili;
            if (this.today < this.bidDateMili) {
              if (!this.biddingStarted)
                return;
              this.bidStartingDate = this.common.milisToCurrentDateAndTime(this.bidDateMili);
              let popupMessage = `Bidding not started yet , will start at ${this.bidStartingDate}`;
              this.common.showSuccessErrorSwalDialog(GlobalConstants.info, popupMessage, "OK");
              this.biddingStarted = false;
              return;
            }
            if (this.biddingEndTime <= this.today) {
              if (this.biddingClosed)
                return;
              this.bidEndingDate = this.common.milisToCurrentDateAndTime(this.biddingEndTime);
              let popupMessage = `Bidding Closed on ${this.bidEndingDate}`;
              this.common.showSuccessErrorSwalDialog(GlobalConstants.info, popupMessage, "OK");
              this.biddingClosed = true;
              return;
            }
            if (resTimer >= 0) {
              if (this.biddingClosed)
                return;
              if (this.today < this.bidDateMili)
                return;
              var timeleft = this.biddingEndTime - this.today;
              debugger
              this.config = {
                leftTime: (timeleft / 1000), format: 'm:s'
              }

              this.getBiddings();
            }
            return;
            // const message: string = res['message'];
            // const success: boolean = res['success'];
            // this.common.hideSpinner();
            // if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "OK");
          }
          else {
            this.common.hideSpinner();
            console.log("Something went wrong while retrieving Bid Details");
            this.common.showSuccessErrorSwalDialog(GlobalConstants.error, "Something went wrong", "OK");
            return;
          }
        });
      })
  }

  submit(form: NgForm) {
    if (!form.valid)
      return;
    if (this.lastBid != "")
      if (form.value.amount >= parseInt(this.lastBid))
        return this.common.showSuccessErrorSwalDialog(GlobalConstants.warning, "Your bid can not exceed the previous bid amount", "OK");
    if (this.today < this.bidDateMili) {
      let popupMessage = `Bidding not started yet , will start at ${this.bidStartingDate}`;
      return this.common.showSuccessErrorSwalDialog(GlobalConstants.info, popupMessage, "OK");
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

  }

}
