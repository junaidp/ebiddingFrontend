import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { IContractor } from '../interface/IContractor';
import { ContractorService } from '../Services/contractor-service/contractor-service.service';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class contractorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];

  dataSource: IContractor[] = [];
  constructor(private contractorService: ContractorService) { }

  ngOnInit() {
    this.contractorService.findAll().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
}
