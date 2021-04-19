import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title: string;
  navOpen: boolean;

  constructor() {
    this.title = '';
    this.navOpen = false;
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
