import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trend } from '@demo-app/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendsService {
  constructor(private httpClient: HttpClient) {}

  getTrends(event: any): Observable<Trend[]> {
    return this.httpClient.get<Trend[]>(
      'http://localhost:3333/api/trends/' + event.payload
    );
  }

  postTrendTopic(body: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3333/api/trends/', body);
  }

  getCommonsImages(trend: any): any {
    console.log('loading', trend);
    return this.httpClient.get<any>(
      'http://localhost:3333/api/images/' + trend
    );
  }
}
