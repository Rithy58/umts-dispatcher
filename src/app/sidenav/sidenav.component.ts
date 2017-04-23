import { Component } from '@angular/core';
import {MdListModule} from '@angular/material';

@Component({
  selector: 'sidenav',
  template: `
  <md-toolbar>
    <span>Dispatcher Interface</span>
  </md-toolbar>
  <md-sidenav-container>
    <md-sidenav #sidenav class="sidenav" mode="side" opened="true">
      <md-nav-list>
        <a md-list-item routerLink="/buses" routerLinkActive="active">
          <span md-line>Bus Management</span>
        </a>
        <a md-list-item routerLink="/shifts" routerLinkActive="active">
          <span md-line>Shift Management</span>
        </a>
        <a md-list-item routerLink="/drivers" routerLinkActive="active">
          <span md-line>Drivers</span>
        </a>
        <a md-list-item routerLink="/routes" routerLinkActive="active">
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
