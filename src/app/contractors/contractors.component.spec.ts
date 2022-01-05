import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contractorsComponent } from './contractors.component';

describe('contractorsComponent', () => {
  let component: contractorsComponent;
  let fixture: ComponentFixture<contractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ contractorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(contractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
