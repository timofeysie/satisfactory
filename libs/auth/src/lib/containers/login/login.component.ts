import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '@demo-app/data-models';
import { AuthState } from './../../+state/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from './../../+state/auth.actions';
import { getAuthError } from './../../+state/auth.selectors';
@Component({
  selector: 'demo-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  //authError$ = this.store.select(getAuthError.toString);
  constructor(private store: Store<AuthState>) {}
  login(authenticate: Authenticate) {
    this.store.dispatch(authActions.login({ payload: authenticate }));
  }
}
