import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '@demo-app/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(category = null): Observable<Product[]> {
    const url =
      category !== null
        ? `http://localhost:3333/api/products/${category}`
        : `http://localhost:3333/api/products`;
    return this.httpClient.get<Product[]>(url);
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
