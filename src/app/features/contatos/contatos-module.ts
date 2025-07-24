import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing-module';
import { ContatoComponent } from './contato-component/contato-component';


@NgModule({
  declarations: [
    ContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule
  ],
  exports: [
    ContatoComponent
  ]
})
export class ContatosModule { }
