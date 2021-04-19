import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewChild,
} from '@angular/core';
import { HeaderService, AuthService } from '@/services';
import { Router } from '@angular/router';
import { getCurrentBreakpoint } from '@/scripts/breakpoint';

interface CustomRoute {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenBreakpoint();
  }

  routes: CustomRoute[];

  constructor(
    public headerService: HeaderService,
    private router: Router,
    public authService: AuthService
  ) {
    this.headerService.navOpen = false;
    this.routes = [
      {
        name: 'Projects',
        path: '/',
        icon: 'fa-home',
      },
      {
        name: 'Sources',
        path: '/sources',
        icon: 'fa-database',
      },
      {
        name: 'Destinations',
        path: '/destinations',
        icon: 'fa-server',
      },
      {
        name: 'Actions',
        path: '/actions',
        icon: 'fa-lambda',
      },
      {
        name: 'Macros',
        path: '/macros',
        icon: 'fa-function',
      },
      {
        name: 'Playout',
        path: '/playout',
        icon: 'fa-play',
      },
    ];
  }

  ngOnInit(): void {
    this.checkScreenBreakpoint();
  }

  checkScreenBreakpoint(): void {
    this.headerService.navOpen = getCurrentBreakpoint() !== 'sm' ? true : false;
  }

  navigate(path: string): void {
    if (getCurrentBreakpoint() === 'sm') {
      this.headerService.navOpen = false;
    }

    this.router.navigate([path]);
  }
}
