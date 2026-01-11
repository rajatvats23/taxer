// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ]
}).catch(err => console.error(err));