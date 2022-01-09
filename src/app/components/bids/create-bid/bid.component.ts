import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import * as moment from 'moment';
import { MatInput } from '@angular/material/input';
import { IProject } from 'src/app/interface/IProject';
import { IContractor } from 'src/app/interface/IContractor';
import { BidService } from 'src/app/Services/bid-service/bid.service';
import { ProjectService } from 'src/app/Services/project-service/project.service';
import { ContractorService } from 'src/app/Services/contractor-service/contractor-service.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { ISaveBid } from 'src/app/interface/ISaveBid';
import { GlobalConstants } from 'src/app/common/global-constants';


@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBidComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup = new FormGroup({});
  isEditable = false;
  projectsList: IProject[] = [];
  contractorsList: IContractor[] = [];
  selectedProject: IProject = {
    name: "",
    description: "",
    companyId: "",
    projectId: ""
  };
  selectedContractor: IContractor = {
    name: "",
    description: "",
    email: "",
    companyId: "",
    contractorId: ""
  };
  name: string = "";
  companyId: string = "";
  selectedDate: number = 0;
  @ViewChild('date', {
    read: MatInput
  }) date1: MatInput | undefined;

  constructor(private _formBuilder: FormBuilder,
    private bidService: BidService,
    private projectService: ProjectService,
    private contractorService: ContractorService,
    private common: CommonService
  ) {

    let companyId = localStorage.getItem("companyId");
    if (companyId)
      this.companyId = JSON.parse(companyId);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      datePicker: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.getAllProject();
    this.getAllContractor();
  }

  getAllContractor() {
    this.contractorService.findAll(this.companyId).subscribe((data: any) => {
      this.contractorsList = data;
    });
  }
  getAllProject() {
    this.projectService.findAll(this.companyId).subscribe((data: any) => {
      this.projectsList = data;
    });
  }

  submitForm(form: any) {
    if (!form.valid)
      return;
    debugger
    var req: ISaveBid = {
      name: form.value.name,
      date: this.selectedDate,
      companyId: this.companyId,
      contractorId: this.selectedContractor.contractorId,
      projectId: this.selectedProject.projectId

    }

    this.bidService.saveBid(req).subscribe((res: any) => {
      if (res) {
        const success: boolean = res['success'];
        const message: string = res['message'];
        if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        this.common.showSuccessErrorSwalDialog(GlobalConstants.success, message, "Ok");
       // this.reset();
      }
    })

    //this.bid.name = this.bidName;
    //this.bid.companyId = GlobalConstants.companyId;
    //this.bid.date = this.selectedDate;
    //this.bidService.saveBid(this.bid).subscribe(bid => this.bidList.push(bid));

  }

  onProjectSelection(event: any) {
    debugger
    this.selectedProject = event[0];
  }

  onContractorSelection(event: any) {
    this.selectedContractor = event[0];
  }

  getDate(ev: any) {
    debugger
    this.selectedDate = moment(ev.value).valueOf();
    // console.log('Startdate', this.startDate)
  }


  reset(stepper: any) {
    stepper.reset();
    this.selectedProject = {
      name: "",
      description: "",
      companyId: "",
      projectId: ""
    };
    this.selectedContractor = {
      name: "",
      description: "",
      email: "",
      companyId: "",
      contractorId: ""
    };
  }
}
