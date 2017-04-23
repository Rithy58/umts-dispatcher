import { Component } from '@angular/core';

@Component({
  selector: 'sidenav',
  template: `
  <md-toolbar color='primary'>
    <span>UMTS Dispatcher Interface</span>
  </md-toolbar>
  <md-sidenav-container>
    <md-sidenav #sidenav class="sidenav" mode="side" opened="true">
      <md-nav-list>
        <a md-list-item routerLink="/shifts" routerLinkActive="active">
          <md-icon md-list-icon color='primary'>schedule</md-icon>
          <span md-line>Shift Management</span>
        </a>
        <a md-list-item routerLink="/drivers" routerLinkActive="active">
          <md-icon md-list-icon color='primary'>account_box</md-icon>
          <span md-line>Drivers</span>
        </a>
        <a md-list-item routerLink="/buses" routerLinkActive="active">
          <md-icon md-list-icon color='primary'>directions_bus</md-icon>
          <span md-line>Bus Management</span>
        </a>
        <a md-list-item routerLink="/routes" routerLinkActive="active">
          <md-icon md-list-icon color='primary'>directions</md-icon>
          <span md-line>Route Management</span>
        </a>
      </md-nav-list>
    </md-sidenav>

    <div class="my-content">
      <router-outlet></router-outlet>
    </div>
  </md-sidenav-container>
  `,
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent { }
