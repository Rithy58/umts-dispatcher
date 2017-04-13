import { Component } from '@angular/core';

export class Shift {
  driver: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // variable shift1 of type Shift initialized with default properties
  shift1: Shift = {
    driver: "Matt",
    id: 12345
  };
}
