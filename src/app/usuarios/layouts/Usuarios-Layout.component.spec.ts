import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosLayoutComponent } from './Usuarios-Layout.component';

describe('UsuariosLayoutComponent', () => {
  let component: UsuariosLayoutComponent;
  let fixture: ComponentFixture<UsuariosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
