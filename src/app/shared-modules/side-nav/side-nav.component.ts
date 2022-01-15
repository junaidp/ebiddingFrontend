import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common/common.service';
import { ILogedInUser } from 'src/app/interface/ILogedInUser';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})

//const userPills: [{name: "Dashboard"},{name: "checkExams"}]
export class SideNavComponent implements OnInit {
  // sideBarPills = [{name : 'Dashboard' , icon : 'admin-icon.png'}, {name : 'Check Exam' , icon : 'admin-icon.png'}, {name : 'Log out' , icon : 'admin-icon.png'}];
  sideBarPills = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  adminUser: ILogedInUser = {
    name: "",
    companyId: "",
    password: "",
    email: "",
    userId: "",
    id: {}
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private common: CommonService
  ) {
    this.adminUser = this.common.getUserObject();
  }


  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['account/login']);
  }





  redirect(path: string) {
    //this.common.showSpinner()
    try {
      console.info('Path is ::', path);
      // this.router.navigate([path]);
      // this.common.hideSpinner()
    } catch (error) {
      // this.common.hideSpinner()
      console.warn('Error caught while rerouting::', error);
    }
  }

}
