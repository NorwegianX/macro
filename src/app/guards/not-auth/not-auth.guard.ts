import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@/services';
import { AuthState } from '@/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService
        .refreshAuthState()
        .then((state: AuthState) => {
          this.router.navigate(['/']);
          reject('User is logged in');
        })
        .catch((e: string) => resolve(true));
    });
  }
}
