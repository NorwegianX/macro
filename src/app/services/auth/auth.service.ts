import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AuthState } from '@/interfaces';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  state: AuthState;
  constructor() {
    this.state = {
      authenticating: true,
      authenticated: false,
      user: null,
    };
  }

  refreshAuthState(): Promise<AuthState> {
    return new Promise((resolve, reject) => {
      Auth.currentSession()
        .then(session => Auth.currentAuthenticatedUser())
        .then(user => (this.state.user = user))
        .catch(e => {
          console.error(e);
          reject(e);
        })
        .finally(() => {
          this.state.authenticating = false;
          resolve(this.state);
        });
    });
  }

  signIn() {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
      .then(response => {
        console.log('SIGNED IN ', response);
      })
      .catch(e => {
        console.error('error signing in', e);
      });
  }

  signOut() {
    Auth.signOut();
  }
}
