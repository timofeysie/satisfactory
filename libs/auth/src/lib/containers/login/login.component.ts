import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  login(authenticate: any) {
    console.log(authenticate);
  }
}
