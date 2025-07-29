import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing-module';
import { ContatoComponent } from './contato-component/contato-component';
import { CONTATO_PERSISTENCE_IMPLEMENTATION } from '../../app-module';
import { LocalStorageContatoPersistenceService } from '../../core/services/local-storage-contato-persistence-service';
import { ContatoService } from '../../core/services/contato-service';
import { EdicaoContatoModal } from './contato-modal/edicao-contato-modal';

import { FormsModule } from '@angular/forms';
import { ContatoModalExclusaoComponent } from './contato-modal-exclusao/contato-modal-exclusao.component';
import { PaginaContatoComponent } from './pagina-contato-component';
import { ContatoCardComponent } from './contato-card-component/contato-card-component';


@NgModule({
  declarations: [
    ContatoComponent,
    ContatoCardComponent,
    EdicaoContatoModal,
    ContatoModalExclusaoComponent,
    PaginaContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule, 
    FormsModule
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
