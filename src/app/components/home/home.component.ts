import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrandService } from '../../services/brand.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  totalOrders!: number;
  totalProducts!: number;
  totalBrands!: number;

  brandService = inject(BrandService);

  orderService = inject(OrderService);

  productService = inject(ProductService);

  ngOnInit() {
    this.brandService
      .getBrands()
      .subscribe((result) => (this.totalBrands = result.length));

    this.orderService
      .getOrders()
      .subscribe((result) => (this.totalOrders = result.length));

    this.productService
      .getProducts()
      .subscribe((result) => (this.totalProducts = result.length));
  }
}
