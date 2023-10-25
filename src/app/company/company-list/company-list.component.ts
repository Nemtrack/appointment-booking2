import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  subscriptionToDataChange: Subscription = new Subscription();

  constructor(private companySrvc: CompanyService, private dataStorage: DataStorageService) {}

  ngOnInit(): void {
    this.subscriptionToDataChange = this.companySrvc.companiesChanged.subscribe(
      (companies: Company[]) => {
        this.companies = companies;
      }
    );
    this.dataStorage.getCompanies();
  }

  companies: Company[] = [];

  ngOnDestroy(): void {
    this.subscriptionToDataChange.unsubscribe();
  }
}
