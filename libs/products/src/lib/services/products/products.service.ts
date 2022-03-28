import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '@demo-app/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  generateProductList() {
    const url = `http://localhost:3333/api/products/generate`;
    return this.httpClient.get<any>(url);
  }

  getProducts(category = null): Observable<Product[]> {
    const url =
      category !== null
        ? `http://localhost:3333/api/products/${category}`
        : `http://localhost:3333/api/products`;
    console.log('getProducts calling ', url);
    return this.httpClient.get<Product[]>(url);
  }

  loadArticles(): Observable<any> {
    console.log('loady');
    const url = `http://localhost:3333/api/products/load`;
    return this.httpClient.get<any>(url);
  }

  updateProducts(category, body): Observable<Product[]> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const url = `http://localhost:3333/api/products/${category}`;
    return this.httpClient.post<any>(url, body, { headers: headers });
  }
}
