import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLateralComponent } from './nav-lateral.component';

describe('NavLateralComponent', () => {
  let component: NavLateralComponent;
  let fixture: ComponentFixture<NavLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLateralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
