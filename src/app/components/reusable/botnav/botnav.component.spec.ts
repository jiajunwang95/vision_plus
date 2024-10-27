import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotnavComponent } from './botnav.component';

describe('BotnavComponent', () => {
  let component: BotnavComponent;
  let fixture: ComponentFixture<BotnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotnavComponent]
    });
    fixture = TestBed.createComponent(BotnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
