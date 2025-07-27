import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContatoModel } from '../../../shared/models/contato-model';

@Component({
  selector: 'app-user-card-component',
  standalone: false,
  templateUrl: './user-card-component.html',
  styleUrl: './user-card-component.scss'
})
export class UserCardComponent {

  @Input({required: true}) user! : ContatoModel;

  @Output() readonly excluirContato = new EventEmitter<ContatoModel>();
  @Output() readonly atualizarContato = new EventEmitter<ContatoModel>();

  outputExcluirContato(){
    this.excluirContato.emit(this.user);
  }

  outputAtualizarContato(){
    this.atualizarContato.emit(this.user);
  }

  contatoTemEmail(){
    return this.user?.email != undefined && this.user.email.length > 0
  }

}
