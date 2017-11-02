import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Component */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* Feature Modules */
import { SF1Module } from './sf1/sf1.module'

/* Service */
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SF1Module
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
