import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthService } from './app/auth/auth.service';
import { AuthGuard } from './app/auth/auth.guard';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init({
    config: {
      url: 'http://localhost:9003/',
      realm: 'oauth2-demo-realm',
      clientId: 'angular-ecommerce'
    },
     initOptions: {
       
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri:  window.location.origin + '/assets/silent-verify-sso.html'
     },
     loadUserProfileAtStartUp: false

  })
  
}



bootstrapApplication(AppComponent,  {
  providers: [
     importProvidersFrom(PaginationModule.forRoot(),KeycloakAngularModule),
     KeycloakService,  AuthGuard,
     {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, AuthService]
     },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],

  
})
  .catch((err) => console.error(err));
 

