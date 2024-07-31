import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataSource: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataSource);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.dataSource + "/" + id);
  }

  createProduct(product: Product): Observable<Product> {
    return this.getProducts().pipe(
      map(products => {
        const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0;
        product.id = maxId + 1;
        return product;
      }),
      switchMap(newProduct => this.http.post<Product>(this.dataSource, newProduct))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.dataSource +"/" + product.id, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.dataSource + "/" + id);
  }
}