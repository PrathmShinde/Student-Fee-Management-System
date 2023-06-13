import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdashComponent } from './studentdash.component';

describe('StudentdashComponent', () => {
  let component: StudentdashComponent;
  let fixture: ComponentFixture<StudentdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentdashComponent]
    });
    fixture = TestBed.createComponent(StudentdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
