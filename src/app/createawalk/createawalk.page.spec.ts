import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateawalkPage } from './createawalk.page';

describe('CreateawalkPage', () => {
  let component: CreateawalkPage;
  let fixture: ComponentFixture<CreateawalkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateawalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
