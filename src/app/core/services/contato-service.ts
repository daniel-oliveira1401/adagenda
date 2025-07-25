import { inject, Injectable, signal } from '@angular/core';
import { ContatoModel } from '../../shared/models/contato-model';
import { ContatoPersistence } from '../../shared/interface/contato-persistence';
import { CONTATO_PERSISTENCE_IMPLEMENTATION } from '../../app-module';
import { Observable, take } from 'rxjs';

/**
 * Serviço para gerênciamento de contatos.
 * 
 * @usageNotes
 * 
 * #### Listagem
 * 
 * Para utilizar a listagem basta pegar a referência da listagem utilizando o método `getContatos()`
 * 
 * ```js
 * const contatos : Signal<ContatoModel[]> = contatoService.getContatos();
 * ```
 * 
 * Depois chamar o método `listagemContatos()` que irá popular a listagem de contatos
 * 
 * ```js
 * contatoService.listagemContatos();
 * ```
 * 
 * No template do componente, basta pegar o valor da listagem utilizando a sintaxe padrão de
 * sinals:
 * 
 * ```html
 * 
 * <div *ngFor="let contato of contatos()">
 *  {{contato.nome}}
 * </div>
 * 
 * ```
 * 
 * #### Operações (Adicionar, Atualizar, Excluir)
 * 
 * Para realizar uma das operações acima, basta chamar o método correspondente. Por exemplo,
 * para adicionar um novo contato, basta chamar o método `adicionarContato(nome, telefone, email)`
 * 
 * ```
 * contatoService.adicionarContato('Daniel', '5511988776655', 'daniel.oliveira@exemplo.com');
 * ```
 * 
 * Depois de realizar a atualização o signal de listagem (obtido a partir de `getContatos()`) irá atualizar automaticamente para
 * refletir a mudança que foi feita. 
 * 
 * Então no caso, por exemplo, de adicionar um novo contato,
 * basta chamar o método `adicionarContato(nome, telefone, email)` que o contato adicionado irá
 * aparecer automaticamente na listagem de contatos, sem que seja necessário chamar o método
 * de listagem `listagemContato()` novamente. 
 * 
 * Isso vale também para as operações de excluir
 * `excluirContato(idContato)` e atualizar `atualizarContato(contatoAtualizado)`
 * 
 * @example
 * 
 * Exemplo de uso
 * 
 * #### Componente:
 * ```js
 * export class AppComponent {
 * 
 *  readonly contatoService : ContatoService = inject(ContatoService);
 *  readonly contatos : Signal<ContatoModel[]> = contatoService.getContatos();
 * 
 *  ngOnInit(){
 *    contatoService.listagemContatos();
 *  }
 * 
 *  adicionarContato(){
 *    contatoService.adicionarContato('Daniel', '5511988776655', 'daniel.oliveira@exemplo.com');
 *  }
 * 
 * }
 * 
 * ```
 * 
 * #### Template
 * ```html
 * <section>
 *  <h1>Contatos</h1>
 *  <!-- IMPORTANTE: utilizar 'contatos()' não 'contatos'. contatos é um signal, então para
 *   pegar seu valor devemos invocar ele como se fosse uma função -->
 *  <div *ngFor="let contato of contatos()" >
 *   Nome: {{contato.nome}}
 *  </div>
 *  <button (click)="adicionarContato()">Adicionar Contato</button>
 * </section>

 * 
 * ```
 */
@Injectable()
export class ContatoService {
  
  private contatos = signal<ContatoModel[]>([]);

  private persistenceService : ContatoPersistence = inject(CONTATO_PERSISTENCE_IMPLEMENTATION);

  getContatos(){
    return this.contatos.asReadonly();
  }

  listagemContatos() : void {
    //pipe(take(1)) -> serve para garantir que mesmo se a implementação do serviço de
    //persistência não completar o observable depois de emitir um valor não haverá
    //subscription ativa depois da emissão
    this.persistenceService.listagemContatos().pipe(take(1)).subscribe({
      next: (contatos)=>{
        this.contatos.set(contatos);
      }
    });
  }

  adicionarContato(nome: string, telefone : string, email: string) : void {
    //pipe(take(1)) -> serve para garantir que mesmo se a implementação do serviço de
    //persistência não completar o observable depois de emitir um valor não haverá
    //subscription ativa depois da emissão
    this.persistenceService.adicionarContato(nome, telefone, email).pipe(take(1)).subscribe({
      next: (res : ContatoModel)=>{
        this.listagemContatos();
      }
    });
  }

  atualizarContato(contatoAtualizado : ContatoModel) : void {
    //pipe(take(1)) -> serve para garantir que mesmo se a implementação do serviço de
    //persistência não completar o observable depois de emitir um valor não haverá
    //subscription ativa depois da emissão
    this.persistenceService.atualizarContato(contatoAtualizado).pipe(take(1)).subscribe({
      next: (res : ContatoModel)=>{
        this.listagemContatos();
      },
      error: (error) => {
        console.error("Erro ao atualizar contato", error);
      }
    });
  }

  detalheDoContatoPorId(idContato : string) : Observable<ContatoModel>{
    //pipe(take(1)) -> serve para garantir que mesmo se a implementação do serviço de
    //persistência não completar o observable depois de emitir um valor não haverá
    //subscription ativa depois da emissão
    return this.persistenceService.getContato(idContato).pipe(take(1));
  }

  excluirContato(idContato : string){
    //pipe(take(1)) -> serve para garantir que mesmo se a implementação do serviço de
    //persistência não completar o observable depois de emitir um valor não haverá
    //subscription ativa depois da emissão
    this.persistenceService.excluirContato(idContato).pipe(take(1)).subscribe({
      next: ()=>{
        this.listagemContatos();
      }
    })
  }

}
