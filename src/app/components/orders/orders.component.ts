import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import Order from '../../types/order';
import { OrderService } from '../../services/order.service';
import Product from '../../types/product';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  dataSource!: MatTableDataSource<Order>;
  orderService = inject(OrderService);
  productService = inject(ProductService);
  products: Product[] = [];
  orders: Order[] = [];
  toaster=inject(ToastrService);
  displayedColumns = [
    'orderNo',
    'productId',
    'quantity',
    'salePrice',
    'discount',
    'totalAmount',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((result) => (this.products = result));
    this.orderService.getOrders().subscribe((result) => {
      this.orders = result;
      this.initTable();
    });
  }
  initTable() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.paginator.firstPage();
  }
  getProductName(id: string) {
    return this.products.find((x) => x.id == id)?.name;
  }
  cancelOrder(order: Order) {
    this.orderService.deleteOrders(order.id!).subscribe(() => {
      this.toaster.success('Order cancelled');
      this.productService.getProduct(order.productId).subscribe((product) => {
        product.availableQuantity =
          +product.availableQuantity + +order.quantity!;
        this.productService.updateProduct(product!.id!, product!).subscribe();
      });
      this.orders = this.orders.filter((x) => x.id != order.id);
      this.dataSource.data = this.orders;
    });
  }
}