import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contato-modal',
  standalone: false,
  templateUrl: './contato-modal.html',
  styleUrl: './contato-modal.scss'
})
export class ContatoModal {

  @Input() user = { nome: '', tel: '', email: '' };
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();

  onSalvar() {
    this.salvar.emit(this.user);
  }

  onFechar() {
    this.fechar.emit();
  }
}