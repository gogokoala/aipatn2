import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
//import { LegalInstrumentsComponent } from './legal-instruments/legal-instruments.component';
//import { PatentComponent } from './patent/patent.component';
import { SimpleComponent } from './simple/simple.component';
import { ComplexComponent } from './complex/complex.component';
import { PatentResultComponent } from './patent-result/patent-result.component';
import { OAuth2CallbackComponent } from './oauth2-callback/oauth2-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
  //  LegalInstrumentsComponent,
  //  PatentComponent,
    SimpleComponent,
    ComplexComponent,
    PatentResultComponent,
    OAuth2CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
