import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalkersPage } from './walkers.page';

describe('WalkersPage', () => {
  let component: WalkersPage;
  let fixture: ComponentFixture<WalkersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalkersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
