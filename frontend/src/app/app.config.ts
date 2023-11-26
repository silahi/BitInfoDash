import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(),
  importProvidersFrom(HttpClientModule),
  provideHttpClient(withFetch()),
  provideRouter(appRoutes)],
};
