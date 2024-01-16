import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalksPage } from './walks.page';

describe('WalksPage', () => {
  let component: WalksPage;
  let fixture: ComponentFixture<WalksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
