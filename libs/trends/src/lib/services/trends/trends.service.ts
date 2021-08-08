import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trend } from '@demo-app/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendsService {
  constructor(private httpClient: HttpClient) {}

  getTrends(category = null): Observable<Trend[]> {
    return this.httpClient.get<Trend[]>('http://localhost:3333/api/trends');
  }
}
