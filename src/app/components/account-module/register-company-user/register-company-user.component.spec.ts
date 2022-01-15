import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCompanyUserComponent } from './register-company-user.component';

describe('RegisterCompanyUserComponent', () => {
  let component: RegisterCompanyUserComponent;
  let fixture: ComponentFixture<RegisterCompanyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
