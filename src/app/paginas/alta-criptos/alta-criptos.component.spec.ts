import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCriptosComponent } from './alta-criptos.component';

describe('AltaCriptosComponent', () => {
  let component: AltaCriptosComponent;
  let fixture: ComponentFixture<AltaCriptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaCriptosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
