import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsPage } from './dogs.page';

describe('DogsPage', () => {
  let component: DogsPage;
  let fixture: ComponentFixture<DogsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
