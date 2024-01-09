import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { createCustomElement } from '@angular/elements';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, FileUploaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElementByAngular = createCustomElement(FileUploaderComponent, {
      injector: this.injector,
    });
    customElements.define('transcription-file', customElementByAngular);
  }

  ngDoBootstrap(): void {}
}
