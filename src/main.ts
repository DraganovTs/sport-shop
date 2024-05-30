import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
