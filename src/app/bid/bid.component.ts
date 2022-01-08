import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BidService } from '../Services/bid-service/bid.service';
import { IProject } from '../interface/IProject';
import { IBid } from '../interface/Ibid';
import { ProjectService } from '../Services/project-service/project.service';
import { IContractor } from '../interface/IContractor';
import { ContractorService } from '../Services/contractor-service/contractor-service.service';

import * as moment from 'moment';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  projectsList: IProject[] = [];
  contractorsList: IContractor[] = [];
  selectedProject: IProject = {
    name: "",
    description: "",
    companyId: ""
  };
  selectedContractor: IContractor = {
    name: "",
    description: "",
    email: "",
    companyId: ""
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
    private contractorService: ContractorService
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

  saveBidding() {
    alert(this.selectedDate)

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
    this.selectedDate = moment(ev.value).valueOf();
    // console.log('Startdate', this.startDate)
  }
}
