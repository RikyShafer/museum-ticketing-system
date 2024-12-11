import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ייבוא של BrowserAnimationsModule
import { provideHttpClient } from '@angular/common/http'; // ייבוא של HttpClientModule
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    BrowserAnimationsModule,  // אנימציות
   provideHttpClient()
    // הוספת HttpClientModule כאן
  ],
}