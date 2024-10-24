import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trend } from '@demo-app/data-models';
import { Observable, throwError } from 'rxjs';
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
    console.log('posted ~~~~~');
    return this.httpClient.post<any>('http://localhost:3333/api/trends/', body);
  }

  getCommonsImages(trend: any): any {
    console.log('loading', trend);
    return this.httpClient.get<any>(
      'http://localhost:3333/api/images/' + trend
    );
  }

  kickoffArticleSummary(linkForSummary: string) {
    console.log('kickoffArticleSummary for', linkForSummary);
    return this.httpClient
      .post<any>('http://localhost:3333/api/bart', {
        link: encodeURI(linkForSummary),
      })
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            console.log(
              `kickoffArticleSummary 1 - Error: ${error.error.message}`
            );
            errorMsg = error.error.message;
          } else {
            console.log('kickoffArticleSummary 2 - Error: ', error);
            errorMsg = error;
          }
          return throwError(errorMsg);
        })
      );
  }

  downloadImages(linksForArticle: any) {
    console.log('downloadImages', linksForArticle);
    return this.httpClient
      .post<any>('http://localhost:3333/api/gan', {
        links: linksForArticle,
      })
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            console.log(`downloadImages 1 - Error: ${error.error.message}`);
            errorMsg = error.error.message;
          } else {
            console.log('downloadImages 2 - Error: ', error);
            errorMsg = error;
          }
          return throwError(errorMsg);
        })
      );
  }

  uploadSelectedImage(selectedImage: string) {
    const path = 'http://localhost:3333/api/gan/' + selectedImage;
    console.log('uploadSelectedImage: path', path);
    return this.httpClient.get<any>(path);
  }

  retrieveArticleSummary() {
    console.log('retrieveArticleSummary');
    return this.httpClient.get('http://localhost:3333/api/bart', {
      responseType: 'text',
    });
  }

  retrieveArticleSummaryById(id?: string) {
    console.log('retrieveArticleSummaryById: id', id);
    const encodedId = encodeURIComponent(id);
    return this.httpClient.get('http://localhost:3333/api/bart/' + encodedId, {
      responseType: 'text',
    });
  }

  generateText(seed: string) {
    console.log('generateText with seed:', seed);
    const encodedSeed = encodeURIComponent(seed);
    const url = 'http://localhost:3333/api/generate/' + encodedSeed;
    console.log('calling', url);
    return this.httpClient.get(url, {
      responseType: 'text',
    });
  }

  cleanupFiles() {
    return this.httpClient.get('http://localhost:3333/api/gan', {
      responseType: 'text',
    });
  }

  kickoffGenerateImages(): any {
    console.log('kickoffGenerateImages');
    return this.httpClient.patch('http://localhost:3333/api/gan/something', {});
  }

  /**
   * 
   * @param fileName Load the meta data for a file in the test_img directory.
   * @returns 
   */
  getImageMetadata(fileName: string) {
    console.log('5 getImageMetadata: fileName', fileName);
    return this.httpClient.get('http://localhost:3333/api/image/' + fileName, {
      responseType: 'text',
    });
  }

  /**
   * Prepare cropped poster aspect images from the original.
   * @param body 
   * @returns 
   */
  postImageMetadata(body: any) {
    console.log('postImageMetadata: body', body);
    return this.httpClient.post('http://localhost:3333/api/image/', body, {
      responseType: 'text',
    });
  }
}
