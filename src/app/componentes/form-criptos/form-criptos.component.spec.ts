import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCriptosComponent } from './form-criptos.component';

describe('FormCriptosComponent', () => {
  let component: FormCriptosComponent;
  let fixture: ComponentFixture<FormCriptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCriptosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
