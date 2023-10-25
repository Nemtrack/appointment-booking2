import { Injectable, OnInit } from '@angular/core';

import { Company } from './company.model';
import { Subject } from 'rxjs';
import { WorkService } from '../work/work.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService{

  companiesChanged = new Subject<Company[]>();
  retrievableCompanyId: number = 0;

  private companies: Company[] = [
    // new Company(
    //   0,
    //   'Bing Corp',
    //   'Budapest, Pázmány Péter u. 12.',
    //   'MONDAY:0900-1700,TUESDAY:0900-1700,WEDNESDAY:0900-1700',
    //   []
    // ),
    // new Company(
    //   1,
    //   'T. Danny Corp.',
    //   'Budapest, Megmondtam u. 1.',
    //   'MONDAY:0900-1700,TUESDAY:0900-1700,WEDNESDAY:0900-1700',
    //   []
    // ),
  ];

  getCompanies() {
    return this.companies.slice();
  }

  getCompany(index: number) {
    return this.companies[index];
  }

  deleteCompanyByID(id: number) {
    const index = this.companies.findIndex((company) => company.id === id);
    if (index !== -1) {
      this.companies.splice(index, 1);
      this.companies.forEach((company, index) => {
        company.id = index;
      });
      this.companiesChanged.next(this.companies);
    }
  }

  addCompany(company: Company) {
    company.id = this.companies.length;
    this.companies.push(company);
    this.companiesChanged.next(this.companies);
  }

  updateCompany(updatedCompany: Company, idOfOldCompany: number) {
    this.companies[idOfOldCompany] = updatedCompany;
    this.companiesChanged.next(this.companies);
  }

  setRetrievableCompanyId(id: number) {
    this.retrievableCompanyId = id;
  }

  getRetrievableCompanyId() {
    return this.retrievableCompanyId;
  }

  setCompanies(companies: Company[]){
    this.companies = companies;
    this.companiesChanged.next(this.companies);
  }
}
