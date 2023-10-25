import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Work } from 'src/app/work/work.model';
import { WorkService } from 'src/app/work/work.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

interface Setting {
  name: string;
  code: string;
}

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
  company: Company = new Company(0, '', '', '', []);
  id: number = 0;

  constructor(
    private companySrvc: CompanyService,
    private route: ActivatedRoute,
    private workSrvc: WorkService,
    private router: Router,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    this.settings = [
      { name: 'Edit Company', code: 'EC' },
      { name: 'Delete Company', code: 'DC' },
      { name: 'Add Works', code: 'AW' },
    ];

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.company = this.companySrvc.getCompany(this.id);
      this.company.works = this.workSrvc.getWorksByCompanyId(this.company.id);
    });
  }

  settings?: Setting[];
  selectedSetting?: Setting;

  onDropdownClicked() {
    if (this.selectedSetting !== undefined) {
      switch (this.selectedSetting.name) {
        case 'Edit Company': {
          this.router.navigate(['edit'], { relativeTo: this.route });
          break;
        }
        case 'Delete Company': {
          if (this.company.works.length < 1) {
            this.companySrvc.deleteCompanyByID(this.id);
            this.dataStorage.deleteCompany(this.id);
            this.workSrvc.updateCompIdForWorksAfterCompDeletion(this.company);
            this.router.navigate(['companies']);
          }
          break;
        }
        case 'Add Works': {
          this.router.navigate(['work', this.id]);
          break;
        }
      }
    }
    this.selectedSetting = undefined;
  }

  onAddClicked() {
    this.router.navigate(['work', this.id]);
  }
}
