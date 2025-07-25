import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing-module';
import { CONTATO_PERSISTENCE_IMPLEMENTATION } from '../../app-module';
import { LocalStorageContatoPersistenceService } from '../../core/services/local-storage-contato-persistence-service';
import { ContatoService } from '../../core/services/contato-service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContatosRoutingModule
  ],
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
