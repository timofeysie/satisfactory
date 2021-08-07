import { Component, OnInit } from '@angular/core';
import { AuthService } from '@demo-app/auth';
import { Observable } from 'rxjs';
import { User } from '@demo-app/data-models';


@Component({
  selector: 'demo-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout();
    this.user$ = this.authService.user$;
    // TODO:  Was part of 9 extra credit originally
    // this.store.dispatch(AuthActions.logout();
    // this.user$ = this.store.select(getUser);
    // will update this as part of 14 - selectors.
  }
}
