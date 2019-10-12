import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApplicationManagerModule } from './application-manager/application-manager.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, ApplicationManagerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
