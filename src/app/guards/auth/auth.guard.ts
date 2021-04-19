import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@/services';
import { AuthState } from '@/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService
        .refreshAuthState()
        .then((state: AuthState) => resolve(true))
        .catch((e: string) => {
          this.router.navigate(['sign-in']);
          reject(e);
        });
    });
  }
}
