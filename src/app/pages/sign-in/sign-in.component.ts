import { Component, OnInit } from '@angular/core';
import { HeaderService, AuthService } from '@/services';
import { SvgIconRegistry } from '@ngneat/svg-icon';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.headerService.title = 'Sign in';
  }
}
