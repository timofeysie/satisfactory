import { Injectable } from '@angular/core';
import { Authenticate, User } from '@demo-app/data-models';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthState } from './../../+state/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from './../../+state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<User>(null);
  user$ = this.userSubject$.asObservable();
  constructor(private httpClient: HttpClient, private store: Store<AuthState>) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }
  login(action: any): Observable<User> {
    return this.httpClient
      .post<User>('http://localhost:3000/login', action.payload)
      .pipe(
        tap((user: User) => {
          this.userSubject$.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.store.dispatch(authActions.loginSuccess({ payload: user }));
        })
      );
  }
}
