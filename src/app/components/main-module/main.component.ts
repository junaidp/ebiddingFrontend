import { Component, OnInit } from '@angular/core';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };
  constructor(private common: CommonService) {
    // debugger
    // this.adminUser = this.common.getUserObject();
    // if (!this.adminUser)
    //   this.common.redirectToLogin();
   }

  ngOnInit(): void {
  }

}
