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
import { BidConstant, GlobalConstants } from 'src/app/common/global-constants';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBidComponent implements OnInit {

  submitting: boolean = false;
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

  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  step: number = 0;
  name: string = "";
  selectedDate: number = 0;
  @ViewChild('date', {
    read: MatInput
  }) date1: MatInput | undefined;

  readonly constants = BidConstant;

  constructor(private _formBuilder: FormBuilder,
    private bidService: BidService,
    private projectService: ProjectService,
    private contractorService: ContractorService,
    private common: CommonService,
    private router: Router
  ) {
    this.adminUser = this.common.getUserObject();
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
    this.refresh(this.step);
  }

  refresh(event: number) {
    debugger
    if (event == this.constants.projectStepper)
      this.getAllProject();
    if (event == this.constants.contractorStepper)
      this.getAllContractor();
  }

  getAllContractor() {
    this.common.showSpinner();
    this.contractorService.findAll(this.adminUser.companyId).subscribe((data: any) => {
      this.contractorsList = data;
      this.common.hideSpinner();
    });
  }
  getAllProject() {
    this.common.showSpinner();
    this.projectService.findAll(this.adminUser.companyId).subscribe((data: any) => {
      this.projectsList = data;
      this.common.hideSpinner();
    });
  }

  submitForm(form: any) {
    if (!form.valid)
      return;
    this.common.showSpinner();
    this.submitting = true;
    var req: ISaveBid = {
      name: form.value.name,
      date: this.selectedDate,
      companyId: this.adminUser.companyId,
      contractorId: this.selectedContractor.contractorId,
      projectId: this.selectedProject.projectId

    }

    this.bidService.saveBid(req).subscribe((res: any) => {
      if (res) {
        this.submitting = false;
        const success: boolean = res['success'];
        const message: string = res['message'];
        if (!success) return this.common.showSuccessErrorSwalDialog(GlobalConstants.error, message, "Ok");
        this.common.showSuccessErrorSwalDialog(GlobalConstants.success, message, "Ok");
        this.router.navigate(['/e-bid'])
        // this.reset();
      }
    })

    //this.bid.name = this.bidName;
    //this.bid.companyId = GlobalConstants.companyId;
    //this.bid.date = this.selectedDate;
    //this.bidService.saveBid(this.bid).subscribe(bid => this.bidList.push(bid));

  }

  onProjectSelection(event: any) {
    this.selectedProject = event[0];
  }

  onContractorSelection(event: any) {
    this.selectedContractor = event[0];
  }

  getDate(ev: any) {
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

  nextStep(stepper: MatStepper, step: number) {
    stepper.selectedIndex = step;
    this.refresh(step);
  }
}
