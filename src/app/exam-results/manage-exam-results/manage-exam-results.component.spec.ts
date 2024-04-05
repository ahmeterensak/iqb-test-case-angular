import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamResultsComponent } from './manage-exam-results.component';

describe('ManageExamResultsComponent', () => {
  let component: ManageExamResultsComponent;
  let fixture: ComponentFixture<ManageExamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExamResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageExamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
