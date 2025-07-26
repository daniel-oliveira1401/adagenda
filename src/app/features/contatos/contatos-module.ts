import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing-module';
import { ContatoComponent } from './contato-component/contato-component';
import { CONTATO_PERSISTENCE_IMPLEMENTATION } from '../../app-module';
import { LocalStorageContatoPersistenceService } from '../../core/services/local-storage-contato-persistence-service';
import { ContatoService } from '../../core/services/contato-service';
import { ContatoModal } from './contato-modal/contato-modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContatoComponent,
    ContatoModal
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule, FormsModule
  ],
  exports: [
    ContatoComponent],
  providers: [
    {
      provide: CONTATO_PERSISTENCE_IMPLEMENTATION,
      //para usar outro tipo de persistência (ex: api, json-server)
      //basta implementar esse tipo de persistência em um service que implementa a
      //interface ContatoPersistence e substituir a classe abaixo por sua nova implementação
      useClass: LocalStorageContatoPersistenceService
    },
    ContatoService
  ]
})
export class ContatosModule { }
