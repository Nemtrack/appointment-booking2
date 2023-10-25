import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../company/company.model';
import { CompanyService } from '../company/company.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private companySrvc: CompanyService) {}

  getCompanies() {
    this.http
      .get<Company[]>('http://localhost:8080/company/all')
      .subscribe((companyData) => {
        this.companySrvc.setCompanies(companyData);
        console.log(companyData);
      });
  }

  createCompany(newCompany: Company) {
    this.http
      .post('http://localhost:8080/company/create', {
        name: newCompany.name,
        address: newCompany.address,
        businessHours: newCompany.businessHours,
      })
      .subscribe(() => {
        console.log('Succesfully added Company!');
      });
  }

  deleteCompany(deletableCompanyId: number) {
    this.http
      .delete('http://localhost:8080/company/' + deletableCompanyId)
      .subscribe({
        next: (data) => {
          console.log('Succesfully deleted Company!');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  updateCompany(updatedCompany: Company, idOfEditedCompany: number) {
    this.http
      .post('http://localhost:8080/company/update', {
        id: idOfEditedCompany,
        name: updatedCompany.name,
        address: updatedCompany.address,
        businessHours: updatedCompany.businessHours,
        works: updatedCompany.works,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
