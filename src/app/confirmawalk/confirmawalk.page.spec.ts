import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmawalkPage } from './confirmawalk.page';

describe('ConfirmawalkPage', () => {
  let component: ConfirmawalkPage;
  let fixture: ComponentFixture<ConfirmawalkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmawalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
