import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';

  public constructor() {

  }

  showSideNav() {
    let show: boolean = false;
    const url: string = window.location.href.toString();
    if (url.includes('e-')) show = true;
    return show;
  }
}
