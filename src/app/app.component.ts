import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/shifts" routerLinkActive="active">Shift Management</a>
      <a routerLink="/drivers" routerLinkActive="active">Drivers</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UMTS Dispatcher Interface';
}
