import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContatoModel } from '../../../shared/models/contato-model';

@Component({
  selector: 'app-contato-card-component',
  standalone: false,
  templateUrl: './contato-card-component.html',
  styleUrl: './contato-card-component.scss'
})
export class ContatoCardComponent {

  @Input({required: true}) contato! : ContatoModel;

  @Output() readonly excluirContato = new EventEmitter<ContatoModel>();
  @Output() readonly atualizarContato = new EventEmitter<ContatoModel>();

  outputExcluirContato(){
    this.excluirContato.emit(this.contato);
  }

  outputAtualizarContato(){
    this.atualizarContato.emit(this.contato);
  }

  contatoTemEmail(){
    return this.contato?.email != undefined && this.contato.email.length > 0
  }

}
