import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GlobalConstants } from '../common/global-constants';
import { Project } from '../model/project';
import {MatCalendar, MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import { MatSelectionList } from '@angular/material/list';
import { Bid } from '../model/bid';
import { BidService } from '../Services/bid-service/bid.service';
import { ProjectServiceService } from '../Services/project-service/project.service';


@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  projectsList : Project[] = [];
  projectNames : Array<String> = [] ;
  companyNames : Array<String> = [];
  selectedProject: any;
  selectedCompany: any;
  selectedDate!: Date ;
  bidName! :string;
  bidList! : Bid[];
  bid!: Bid;

 constructor(private _formBuilder: FormBuilder, private bidService: BidService, private projectService: ProjectServiceService) {

  // setTimeout(() => {
  //   alert(GlobalConstants.contractors)
  //   this.updateList();
  // }, 2000);
 }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.updateList();
  }

  updateList(){
    this.projectService.findAll().subscribe((data: any) => {
      for (var project of data) {
        this.projectNames.push(project.name);
        }
    });


      for (var company of GlobalConstants.contractors) {
        this.companyNames.push(company.name);
      }
  }

  saveBidding(){
    alert(this.selectedProject)
    alert(this.selectedCompany)
    alert(this.selectedDate)

    this.bid.name = this.bidName;
    this.bid.companyId = GlobalConstants.companyId;
    this.bid.date = this.selectedDate;
    this.bidService.saveBid(this.bid).subscribe(bid => this.bidList.push(bid));

  }

  onProjectSelection($event: any){
    this.selectedProject=$event;
  }

  onCompanySelection($event: any){
    this.selectedCompany=$event;
  }
}