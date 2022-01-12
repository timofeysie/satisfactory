import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trend } from '@demo-app/data-models';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  kickoffArticleSummary(linkForSummary: string) {
    console.log('kickoffArticleSummary');
    return this.httpClient
      .post<any>('http://localhost:3333/api/bart', {
        link: linkForSummary,
      })
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            console.log(`1 - Error: ${error.error.message}`);
            errorMsg = error.error.message;
          } else {
            console.log('2 - Error: ', error);
            errorMsg = error;
          }
          return throwError(errorMsg);
        })
      );
  }

  downloadImage(linkForArticle: any) {
    return this.httpClient
      .post<any>('http://localhost:3333/api/gan', {
        link: linkForArticle,
      })
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            console.log(`1 - Error: ${error.error.message}`);
            errorMsg = error.error.message;
          } else {
            console.log('2 - Error: ', error);
            errorMsg = error;
          }
          return throwError(errorMsg);
        })
      );
  }

  retrieveArticleSummary() {
    return this.httpClient.get('http://localhost:3333/api/bart', {
      responseType: 'text',
    });
  }
}
