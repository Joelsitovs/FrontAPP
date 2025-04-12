import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeLayoutsComponent } from './Home-Layouts.component';

describe('HomeLayoutsComponent', () => {
  let component: HomeLayoutsComponent;
  let fixture: ComponentFixture<HomeLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLayoutsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
