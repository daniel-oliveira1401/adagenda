import { Component } from '@angular/core';

@Component({
  selector: 'app-contato-component',
  standalone: false,
  templateUrl: './contato-component.html',
  styleUrl: './contato-component.scss'
})
export class ContatoComponent {
  exibirModal = false;
  exibirModalExclusao = false;

  user = {
    nome: 'Moita',
    tel: '(31)99999-9999',
    email: 'moita@email.com'
  };

  editarContato() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }

  salvarUsuario(userAtualizado: any) {
    this.user = userAtualizado;
    this.fecharModal();
  }

  excluirContato() {
    this.exibirModalExclusao = true;
  }

  fecharModalExclusao() {
    this.exibirModalExclusao = false;
  }

  deletarContato(userAExcluir: any) {
    console.log("Contato excluido: ", userAExcluir)
    this.fecharModalExclusao();
  }
}
