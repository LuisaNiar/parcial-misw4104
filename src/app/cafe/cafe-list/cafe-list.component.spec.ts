import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let element: HTMLElement;

  const cafes: Cafe[] = [
    new Cafe(1, 'Café Especial para tí', 'Blend', 'Angelópolis, Antioquia', 'Panela, Durazno, Caramelo', 1920, 'imagen1.png'),
    new Cafe(2, 'Café Especial Navegante', 'Café de Origen', 'Guatapé, Antioquia', 'Cítrico, Naranja, Cacao', 1800, 'imagen2.png'),
    new Cafe(3, 'Café Especial El Prístino', 'Blend', 'Chinchiná, Caldas', 'Chocolate negro, Caramelo', 1700, 'imagen3.png'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const service = TestBed.inject(CafeService);
    spyOn(service, 'getCafes').and.returnValue(of(cafes));

    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a table with 3 rows plus the header', () => {
    expect(element.querySelectorAll('table tr').length).toBe(4);
    expect(element.querySelectorAll('thead tr').length).toBe(1);
    expect(element.querySelectorAll('tbody tr').length).toBe(3);
  });

  it('should show the name, type and region of each coffee', () => {
    const firstRow = element.querySelectorAll('tbody tr')[0];
    expect(firstRow.textContent).toContain('Café Especial para tí');
    expect(firstRow.textContent).toContain('Blend');
    expect(firstRow.textContent).toContain('Angelópolis, Antioquia');
  });

  it('should count the coffees by type', () => {
    expect(component.totalOrigen).toBe(1);
    expect(component.totalBlend).toBe(2);
  });

  it('should show the totals by type', () => {
    const totals = element.querySelectorAll('p.total');
    expect(totals[0].textContent).toContain('Total café de origen: 1');
    expect(totals[1].textContent).toContain('Total café blend: 2');
  });
});