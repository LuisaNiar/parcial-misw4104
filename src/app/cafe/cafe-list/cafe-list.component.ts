import { Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  templateUrl: './cafe-list.component.html',
  styleUrl: './cafe-list.component.css',
})
export class CafeListComponent implements OnInit {
  cafes: Array<Cafe> = [];

  constructor(private cafeService: CafeService) {}

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
    });
  }

  get totalOrigen(): number {
    return this.cafes.filter((cafe) => cafe.tipo === 'Café de Origen').length;
  }

  get totalBlend(): number {
    return this.cafes.filter((cafe) => cafe.tipo === 'Blend').length;
  }

  ngOnInit(): void {
    this.getCafes();
  }
}