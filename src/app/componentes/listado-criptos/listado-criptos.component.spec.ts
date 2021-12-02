import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCriptosComponent } from './listado-criptos.component';

describe('ListadoCriptosComponent', () => {
  let component: ListadoCriptosComponent;
  let fixture: ComponentFixture<ListadoCriptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCriptosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
