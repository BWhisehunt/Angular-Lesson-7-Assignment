import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
      },
      error => {
        console.error('Product not found', error);
      }
    );
  }

  editProduct(): void {
    this.router.navigate(['/edit', this.product?.id]);
  }

  deleteProduct(): void {
    if (this.product) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}