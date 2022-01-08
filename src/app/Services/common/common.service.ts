import { Injectable } from '@angular/core';
//import {NgxSpinnerService} from "ngx-spinner";
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private spinner: NgxSpinnerService,
    private location: Location
    // private observableService: ObservableService
  ) {

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

  async showConfirmationDialogBox(message:string) {
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
  async showConfirmationDialogBoxForGeofence(message:string) {
    const { value: response } = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      allowOutsideClick: false,

    })

    console.info('Swal response in helper: ', response);

    return response;
  }
  showSuccessErrorSwalDialogForGeofence(code: number, message: string, closeBtnText: string) {
    console.info('Dialog Open');
    Swal.fire({
      title: code === 0 ? 'Error' : code === 1 ? 'Success' : 'Alert',
      text: message,
      icon: code === 0 ? 'error' : code === 1 ? 'success' : 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: closeBtnText,
      confirmButtonColor: 'Primary',
      allowOutsideClick: false,

    });
  }


  // async showConfirmationDialogBoxWithRemarks(title,confirmButtonText) {
  //   const { value: response } = await Swal.fire({
  //     title: title,
  //     showCancelButton: true,
  //     confirmButtonColor: '#673ab7',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: confirmButtonText,
  //     input : 'text'
  //   })

  //   console.info('Swal response in helper: ', response);

  //   return response;
  // }

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

  locationBack() {
    this.location.back();
  }

}
