import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContractor } from 'src/app/interface/IContractor';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { BidService } from 'src/app/Services/bid-service/bid.service';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date'];
  dataSource: IContractor[] = [];
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  constructor(
    private bidService: BidService,
    private common: CommonService,
    private router: Router
  ) {
    this.adminUser = this.common.getUserObject();
  }


  ngOnInit(): void {
    this.getAllBid();
  }


  getAllBid() {
    this.common.showSpinner();
    this.bidService.findAll(this.adminUser.companyId).subscribe((data: any) => {
      if (data) {
        this.dataSource = data;
      }
      this.common.hideSpinner();
    });
  }

  gotoAddBid() {
    this.router.navigate(["/e-bid/create"]);
  }


  convertMiliIntoString(mili: string) {
    return this.common.milisToCurrentDateAndTime(parseInt(mili));
  }

}
