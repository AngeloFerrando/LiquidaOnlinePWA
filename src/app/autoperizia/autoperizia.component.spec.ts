import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoperiziaComponent } from './autoperizia.component';

describe('AutoperiziaComponent', () => {
  let component: AutoperiziaComponent;
  let fixture: ComponentFixture<AutoperiziaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoperiziaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoperiziaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
