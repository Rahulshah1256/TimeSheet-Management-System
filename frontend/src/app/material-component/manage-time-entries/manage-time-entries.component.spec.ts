import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimeEntriesComponent } from './manage-time-entries.component';

describe('ManageTimeEntriesComponent', () => {
  let component: ManageTimeEntriesComponent;
  let fixture: ComponentFixture<ManageTimeEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTimeEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
