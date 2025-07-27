import { InjectionToken, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { ContatosModule } from './features/contatos/contatos-module';
import { ContatoPersistence } from './shared/interface/contato-persistence';
export const CONTATO_PERSISTENCE_IMPLEMENTATION = new InjectionToken<ContatoPersistence>('contato_persistence_token');

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContatosModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
