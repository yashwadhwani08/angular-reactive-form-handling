import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Note: FormsModule is required when working with template driven form handling, not for Reactive-form handling, for reactive-form-handling (while connecting our TS code with our HTML template), we require ReactiveFormsModule from @angular/forms
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
