import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CafeModule } from './cafe/cafe.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CafeModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}