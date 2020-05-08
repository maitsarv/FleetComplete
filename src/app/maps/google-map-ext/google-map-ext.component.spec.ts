import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapExtComponent } from './google-map-ext.component';

describe('GoogleMapExtComponent', () => {
  let component: GoogleMapExtComponent;
  let fixture: ComponentFixture<GoogleMapExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
