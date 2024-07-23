import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSchemaComponent } from './review-schema.component';

describe('ReviewSchemaComponent', () => {
  let component: ReviewSchemaComponent;
  let fixture: ComponentFixture<ReviewSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSchemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
