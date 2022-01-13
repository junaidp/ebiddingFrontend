import { Injectable } from '@angular/core';
//import {NgxSpinnerService} from "ngx-spinner";
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private spinner: NgxSpinnerService,
    private location: Location,
    private router: Router
    // private observableService: ObservableService
  ) {

  }


  checkIfAlreadyLogin() {
    const userObj = this.getUserObject();
    if (userObj)
      this.router.navigate(['/e-project']);
  }

  showSpinner(): void {
    console.log("show")
    this.spinner.show();
  }
  hideSpinner(): void {
    console.log("hide")
    this.spinner.hide();
  }

  //Sweet alert
  showSuccessErrorSwalDialog(code: number, message: string, closeBtnText: string) {
    console.info('Dialog Open');
    Swal.fire({
      title: code === 0 ? 'Error' : code === 1 ? 'Success' : 'Alert',
      text: message,
      icon: code === 0 ? 'error' : code === 1 ? 'success' : 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: closeBtnText,
      confirmButtonColor: 'Primary'
    });
  }


  async showSuccessErrorSwalDialogResponse(code: number, message: string, closeBtnText: string) {
    console.info('Dialog Open');
    const { value: response } = await Swal.fire({
      title: code === 0 ? 'Error' : code === 1 ? 'Success' : 'Alert',
      text: message,
      icon: code === 0 ? 'error' : code === 1 ? 'success' : 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: closeBtnText,
      confirmButtonColor: 'Primary'
    });
    return response;
  }

  async showConfirmationDialogBox(message: string) {
    const { value: response } = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    })

    console.info('Swal response in helper: ', response);

    return response;
  }

  async showFeedBackDialogResponse(title: string, message: string) {
    const { value: response } = await Swal.fire({
      title: title,
      text: message,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    })

    console.info('Swal response in helper: ', response);

    return response;
  }

  getUserObject() {
    let adminUSer = localStorage.getItem("user");
    if (adminUSer)
      return JSON.parse(adminUSer);
  }

  milisToCurrentDateAndTime(milis: number) {
    return moment(milis).format("DD MMM YYYY hh:mm a")
  }

  milisToCurrentDateOnly(milis: number) {
    return moment(milis).format("DD MMM YYYY");
  }

  getCurrentDateMilis() {
    return moment().valueOf();
  }

  // milisToLocalTime(milis: number){

  // }

  // milisToUTCTime(milis: number){

  // }

  // convertDateToMilis(event: any){
  //   return moment(event.value).valueOf();
  // }


  redirectToLogin(){
    this.router.navigate(['/login']);
  }


}
