import { Component, ViewChild } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-app-trendy-layout',
  templateUrl: './trendy-layout.component.html',
  styleUrls: ['./trendy-layout.component.scss'],
})
export class TrendyLayoutComponent {
  @ViewChild('drawer') drawer: any;
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));
  constructor(private breakpointObserver: BreakpointObserver) {}

  closeSideNav() {
    if (this.drawer._mode == 'over') {
      this.drawer.close();
    }
  }
}
