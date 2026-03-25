import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartitems } from './cartitems';

describe('Cartitems', () => {
  let component: Cartitems;
  let fixture: ComponentFixture<Cartitems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartitems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartitems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
