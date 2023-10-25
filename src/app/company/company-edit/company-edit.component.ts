import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkService } from 'src/app/work/work.service';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {
  isEditMode = false;
  idOfEditedCompany = 0;
  companyName = '';
  companyAddress = '';
  companyHours = '';

  constructor(
    private companySrvc: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private workSrvc: WorkService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      params['id'] ? (this.isEditMode = true) : (this.isEditMode = false);
      if (this.isEditMode === true) {
        this.changeCompanyToEditable(params);
      }
      this.idOfEditedCompany = +params['id'];
    });
  }

  onAddCompany(form: NgForm) {
    const value = form.value;
    if (!this.isEditMode) {
      const newCompany = new Company(
        0,
        value.companyName,
        value.companyAddress,
        value.companyHours,
        []
      );
      this.companySrvc.addCompany(newCompany);
      this.dataStorage.createCompany(newCompany);
    } else {
      const updatedCompany: Company = new Company(
        this.idOfEditedCompany,
        value.companyName,
        value.companyAddress,
        value.companyHours,
        this.workSrvc.getWorksByCompanyId(this.idOfEditedCompany)
      );
      if (
        !this.companySrvc
          .getCompanies()
          .some(
            (company) =>
              company.name === updatedCompany.name &&
              company.address === updatedCompany.address &&
              company.businessHours === updatedCompany.businessHours
          )
      ) {
        this.companySrvc.updateCompany(updatedCompany, this.idOfEditedCompany);
        this.dataStorage.updateCompany(updatedCompany, this.idOfEditedCompany)
      }
    }
    this.router.navigate(['/companies']);
    this.isEditMode = false;
  }

  changeCompanyToEditable(params: Params) {
    const companyByParams = this.companySrvc.getCompany(params['id']);
    this.companyName = companyByParams.name;
    this.companyAddress = companyByParams.address;
    this.companyHours = companyByParams.businessHours;
  }
}
