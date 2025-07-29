import { AfterViewInit, Component, effect, ElementRef, OnDestroy, OnInit, signal, Signal, TemplateRef, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { ContatoService } from '../../../core/services/contato-service';
import { ContatoModel } from '../../../shared/models/contato-model';
import { debounce, debounceTime, fromEvent, of, Subscription } from 'rxjs';
import { ModalType } from '../contato-modal/edicao-contato-modal';

@Component({
  selector: 'app-contato-component',
  standalone: false,
  templateUrl: './contato-component.html',
  styleUrl: './contato-component.scss'
})
export class ContatoComponent implements OnInit, AfterViewInit, OnDestroy {
  exibirModal = false;
  exibirModalExclusao = false;

  contatos : Signal<ContatoModel[]>;
  contatosParaMostrar : WritableSignal<ContatoModel[]> = signal([]);
  valorFiltro : WritableSignal<string> = signal('');

  contatoSelecionado : ContatoModel | undefined;
  tipoDeModal : ModalType = 'adicionar';

  @ViewChild("inputFiltro")
  inputFiltro! : ElementRef;

  constructor(
    private readonly contatoService : ContatoService
  ){
    this.contatos = contatoService.getContatos();
    
    effect(()=>{
      
      //ordena os contatos
      let contatosOrdernadosLocal = this.contatos().sort((a, b)=> a.nome.toLowerCase().localeCompare(b.nome.toLowerCase()));

      //filtra os contatos
      let contatosFiltrados = contatosOrdernadosLocal.filter((c)=> c.nome.toLowerCase().includes(this.valorFiltro().toLowerCase()));

      //coloca o resultado final para mostrar na tela
      this.contatosParaMostrar.set(contatosFiltrados);

    });

  }

  filtroSubscription : Subscription | undefined;

  ngAfterViewInit(): void {

    this.filtroSubscription = fromEvent(this.inputFiltro.nativeElement, 'input').pipe(
      debounceTime(250)
    ).subscribe((evento)=>{
      let valor = this.inputFiltro.nativeElement.value;
      this.valorFiltro.set(valor);
    });

  }

  ngOnInit(): void {

    this.contatoService.listagemContatos();
  }

  abrirModalAdicionarContato(){
    this.contatoSelecionado = ContatoModel.vazio();
    this.tipoDeModal = 'adicionar';
    this.exibirModal = true;
  }

  editarContato(contato : ContatoModel) {
    this.contatoSelecionado = {...contato};
    this.tipoDeModal = 'atualizar';
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }

  salvarContato(contatoAtualizado: ContatoModel) {

    this.fecharModal();

    if(contatoAtualizado.id){
      this.contatoService.atualizarContato(contatoAtualizado);
    }else{
      this.contatoService.adicionarContato(contatoAtualizado.nome, contatoAtualizado.telefone, contatoAtualizado.email);
    }

  }

  naoEncontrouResultados(){
    //array de contatos para exibir estiver vazio 
    //e se o array de contatos existentes não estiver vazio
    return this.contatos().length > 0 && this.contatosParaMostrar().length === 0;
  }

  naoTemContatosCadastrados(){
    return this.contatos().length === 0;
  }

  excluirContato(contato : ContatoModel) {
    this.exibirModalExclusao = true;
    this.contatoSelecionado = contato;
  }

  fecharModalExclusao() {
    this.exibirModalExclusao = false;
  }

  deletarContato(contatoAExcluir: ContatoModel) {
    this.fecharModalExclusao();
    this.contatoService.excluirContato(contatoAExcluir.id);
  }

  trackById(index : number, contato : ContatoModel){
    return contato.id;
  }

  ngOnDestroy(): void {
    this.filtroSubscription?.unsubscribe();
  }
}
