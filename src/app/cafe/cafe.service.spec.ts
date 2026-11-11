import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CafeService } from './cafe.service';
import { Cafe } from './cafe';

describe('CafeService', () => {
  let service: CafeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CafeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the coffees with a GET request', () => {
    const cafes = [new Cafe(1, 'Café Especial para tí', 'Blend', 'Angelópolis, Antioquia', 'Panela', 1920, 'img.png')];

    service.getCafes().subscribe((result) => expect(result).toEqual(cafes));

    const req = http.expectOne((r) => r.url.includes('202212_MISW4104_Grupo3.json'));
    expect(req.request.method).toBe('GET');
    req.flush(cafes);
  });
});