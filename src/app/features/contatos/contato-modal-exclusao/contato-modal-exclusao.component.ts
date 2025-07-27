import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContatoModel } from '../../../shared/models/contato-model';

@Component({
  selector: 'app-contato-modal-exclusao',
  standalone: false,
  templateUrl: './contato-modal-exclusao.component.html',
  styleUrls: ['./contato-modal-exclusao.component.scss']
})
export class ContatoModalExclusaoComponent {

@Input() user : ContatoModel | undefined;
@Output() fecharModalExclusao = new EventEmitter<void>();
@Output() excluirContato = new EventEmitter<any>();

  onExcluir() {
    this.excluirContato.emit(this.user);
  }

  onFecharModalExclusao() {
    this.fecharModalExclusao.emit();
  }

}
