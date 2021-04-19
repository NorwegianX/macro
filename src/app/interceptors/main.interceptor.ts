/* External imports */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';

/* Project imports */
import { AuthService } from '@/services';
import { AuthState } from '@/interfaces';
import { environment } from '@/environment';

/* Interceptor to add authentication token to Authorization header for all request. */
@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    var extracted = this.extractHostname(req.url);
    const Host = extracted || environment.MACRO_API;
    const url = !extracted ? Host + req.url : req.url;

    const { user } = await this.authService.refreshAuthState();
    return next
      .handle(
        req.clone({
          url,
          headers: req.headers.set(
            'Authorization',
            `Bearer ${user.signInUserSession.accessToken.jwtToken}`
          ),
        })
      )
      .toPromise();
  }

  extractHostname(url) {
    var hostname, protocol;
    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
      protocol = url.split('/')[0];
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split('?')[0];
    if (protocol === undefined) return;
    return protocol + '//' + hostname;
  }
}
