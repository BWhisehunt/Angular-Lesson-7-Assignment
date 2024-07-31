import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{

  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
  }

  saveProduct() {
    this.productService.createProduct(this.product).subscribe((createdProduct) => {
      this.router.navigate(['/products']);
    });
  }
}