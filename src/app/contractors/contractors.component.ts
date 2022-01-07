import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { CompanyService } from '../Services/contractor-service/contractor-service.service';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class contractorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];

  dataSource = GlobalConstants.contractors;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
      this.companyService.findAll().subscribe((data: any) => {
      GlobalConstants.contractors = data;
      this.dataSource = GlobalConstants.contractors;
    });
  }
}
