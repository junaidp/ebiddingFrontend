import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContractor } from 'src/app/interface/IContractor';
import { BidService } from 'src/app/Services/bid-service/bid.service';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  companyId: string = "";
  dataSource: IContractor[] = [];
  constructor(
    private bidService: BidService,
    private common: CommonService,
    private router: Router
  ) {
    let companyId = localStorage.getItem("companyId");
    if (companyId)
      this.companyId = JSON.parse(companyId);
   }

  ngOnInit(): void {
    this.getAllBid();
  }


  getAllBid() {
    this.bidService.findAll(this.companyId).subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  gotoAddBid(){
    this.router.navigate(["/e-bid/create"]);
  }

}
