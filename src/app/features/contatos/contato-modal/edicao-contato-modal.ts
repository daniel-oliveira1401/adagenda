import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContatoModel } from '../../../shared/models/contato-model';

export type ModalType = 'adicionar' | 'atualizar';

@Component({
  selector: 'app-edicao-contato-modal',
  standalone: false,
  templateUrl: './edicao-contato-modal.html',
  styleUrl: './edicao-contato-modal.scss'
})
export class EdicaoContatoModal {

  @Input() user : ContatoModel | undefined; 
  @Input({required: true}) tipoDeModal! : ModalType;
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<ContatoModel>();

  onSalvar() {
    this.salvar.emit(this.user);
  }

  onFechar() {
    this.fechar.emit();
  }

  ehAdicionar(){
    return this.tipoDeModal == 'adicionar';
  }
  
}