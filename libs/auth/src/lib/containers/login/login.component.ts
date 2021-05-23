import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Authenticate } from '@demo-app/data-models';

@Component({
  selector: 'demo-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log('remove');
  }

  login(authenticate: Authenticate): void {
    this.authService.login(authenticate).subscribe();
  }
}
