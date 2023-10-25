import { Injectable } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { Work } from './work.model';
import { Subject } from 'rxjs';
import { Company } from '../company/company.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  worksChanged = new Subject<Work[]>();
  addMode = true;
  constructor(private companySrvc: CompanyService) {}

  private works: Work[] = [
    // new Work(0, 'Binging', 'This company just bings', 10, 0),
    // new Work(1, 'Megmondás', 'This company just megmondja', 10, 1),
    // new Work(2, 'Megmondás 2', 'This company just megmondja kétszer', 10, 1),
  ];

  getWorksByCompanyId(id: number) {
    return this.works.filter((work) => work.companyId === id);
  }

  deleteWork(toBeDeletedWork: Work) {
    const foundWork = this.works.find((work) => {
      return (
        work.name === toBeDeletedWork.name &&
        work.description === toBeDeletedWork.description &&
        work.duration === toBeDeletedWork.duration &&
        work.companyId === toBeDeletedWork.companyId
      );
    });
    if (foundWork) {
      const index = this.works.indexOf(foundWork);
      this.works.splice(index, 1);
    }
  }

  updateWork(updatedWork: Work, idOfOldWork:number){
    console.log(idOfOldWork);
    this.works[idOfOldWork] = updatedWork;
    this.worksChanged.next(this.works);
  }

  addWork(newWork: Work) {
    newWork.id = this.works.length;
    this.works.push(newWork);
    this.worksChanged.next(this.works);
  }

  updateIdsForWorksAfterWorkDeletion(workToDelete: Work){
    for (const work of this.works){
      if(work.id > workToDelete.id){
        work.id--;
      }
    }
    this.worksChanged.next(this.works);
  }

  updateCompIdForWorksAfterCompDeletion(companyToDelete: Company) {
    for (const work of this.works){
      if(work.companyId > companyToDelete.id){
        work.companyId--;
      }
    }
    this.worksChanged.next(this.works);
  }

  getWorkById(id: number) {}
}
