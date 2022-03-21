import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() articles: any[];
  @Input() displayList: boolean;

  /**
   * Credit: Dharman & Dinesh Sah from StackOverflow
   * @param dString example: "2021-04-1 12:00:00";
   * @returns string x time ago
   */
  calcDateAgo(dString = null) {
    const d1 = new Date(dString);
    const d2 = new Date();
    const t2 = d2.getTime();
    const t1 = d1.getTime();
    const d1Y = d1.getFullYear();
    const d2Y = d2.getFullYear();
    const d1M = d1.getMonth();
    const d2M = d2.getMonth();

    const time_obj: any = {};
    time_obj.year = d2.getFullYear() - d1.getFullYear();
    time_obj.month = d2M + 12 * d2Y - (d1M + 12 * d1Y);
    time_obj.week = Math.round((t2 - t1) / (24 * 3600 * 1000 * 7));
    time_obj.day = Math.round((t2 - t1) / (24 * 3600 * 1000));
    time_obj.hour = Math.round((t2 - t1) / (3600 * 1000));
    time_obj.minute = (t2 - t1) / (60 * 1000);
    time_obj.second = (t2 - t1) / 1000;
    for (const obj_key in time_obj) {
      if (time_obj[obj_key] == 0) {
        delete time_obj[obj_key];
      }
    }
    let ago_text = 'just now';
    if (typeof Object.keys(time_obj)[0] != 'undefined') {
      let time_key = Object.keys(time_obj)[0];
      const time_val = time_obj[Object.keys(time_obj)[0]];
      time_key += time_val > 1 ? 's' : '';
      ago_text = time_val + ' ' + time_key + ' ago';
    }
    return ago_text;
  }
}
