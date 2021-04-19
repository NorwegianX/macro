import { Component } from '@angular/core';
import Amplify from 'aws-amplify';
import { environment } from './../environments/environment';

const AmplifyConfig = {
  Auth: {
    mandatorySignId: true,
    region: environment.cognito.REGION,
    userPoolId: environment.cognito.USER_POOL_ID,
    userPoolWebClientId: environment.cognito.APP_CLIENT_ID,
  },
  oauth: {
    domain: environment.cognito.DOMAIN,
    redirectSignIn: environment.cognito.REDIRECT_SIGN_IN,
    redirectSignOut: environment.cognito.REDIRECT_SIGN_OUT,
    responseType: 'token',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    console.log('configuring ', AmplifyConfig);
    Amplify.configure(AmplifyConfig);
  }
}
