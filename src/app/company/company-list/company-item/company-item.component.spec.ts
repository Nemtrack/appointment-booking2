import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyItemComponent } from './company-item.component';

describe('CompanyItemComponent', () => {
  let component: CompanyItemComponent;
  let fixture: ComponentFixture<CompanyItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyItemComponent]
    });
    fixture = TestBed.createComponent(CompanyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
