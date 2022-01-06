import { Injectable } from '@angular/core';
//import {NgxSpinnerService} from "ngx-spinner";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    //private spinner: NgxSpinnerService,
    private location: Location
    // private observableService: ObservableService
  ) {
    
  }

  // showSpinner(): void {
  //   console.log("show")
  //   this.spinner.show();
  // }
  // hideSpinner(): void {
  //   console.log("hide")

  //   this.spinner.hide();
  // }

  // milisToCurrentDateAndTime(milis: number){
  //   return moment(milis).format("DD MMM YYYY hh:mm a")
  // }

  // milisToLocalTime(milis: number){

  // }

  // milisToUTCTime(milis: number){

  // }

  // convertDateToMilis(event: any){
  //   return moment(event.value).valueOf();
  // }

  // milisToCurrentDateOnly(milis: number){
  //   return moment(milis).format("DD MMM YYYY");
  // }

  locationBack(){
    this.location.back();
  }

}
