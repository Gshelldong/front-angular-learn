import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app';
import {HeaderComponent} from './header/header.component';
import {UserInputComponent} from './user-input/user-input.component';
import {InvesmentResultsComponent} from './invesment-results/invesment-results.component';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    InvesmentResultsComponent
  ],
  imports: [BrowserModule,UserInputComponent],
  bootstrap: [App],
})

export class AppModule {}
