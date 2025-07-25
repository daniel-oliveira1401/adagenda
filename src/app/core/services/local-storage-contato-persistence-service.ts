import { map, Observable, of, tap } from "rxjs";
import { ContatoPersistence } from "../../shared/interface/contato-persistence";
import { ContatoModel } from "../../shared/models/contato-model";

export class LocalStorageContatoPersistenceService implements ContatoPersistence {
  
  private readonly CONTATOS_KEY = 'contatos';

  listagemContatos(): Observable<ContatoModel[]> {
    return of(localStorage.getItem(this.CONTATOS_KEY)).pipe(map((contatosJsonStringificado : string | null)=>{
      
      let contatos : ContatoModel[] = [];

      if(contatosJsonStringificado){
        try{
          contatos = JSON.parse(contatosJsonStringificado)
        }catch(error){
          // O erro está sendo "engolido" para que a aplicação não fique em um estado
          //quebrado permanentemente caso alguem altere os dados do localstorage manualmente
          console.error("Error ao ler contatos do LocalStorage");
        }
      }

      return contatos;
    }));
  }
  
  getContato(idContato: string): Observable<ContatoModel> {
    
    return this.listagemContatos().pipe(map((contatos)=> {
      const contato = contatos.find((c) => c.id == idContato);
      
      if(!contato) throw new Error('Não foi possível encontrar o contato com id '+ idContato);

      return contato;
    }));
  }

  adicionarContato(nome: string, telefone: string, email: string): Observable<ContatoModel> {
    return this.listagemContatos().pipe(
      map((contatos)=>{
        const contatoParaAdicionar = new ContatoModel(
          crypto.randomUUID(),
          nome,
          telefone,
          email
        );
        
        contatos.push(contatoParaAdicionar);

        this.salvarContatosNoLocalStorage(contatos);

        return contatoParaAdicionar;
      })
    );
  }

  atualizarContato(contatoAtualizado: ContatoModel): Observable<ContatoModel> {
    return this.listagemContatos().pipe(
      map((contatos)=>{
        let contatoParaRetornar : ContatoModel | undefined = undefined;
        contatos = contatos.map((contato)=>{
          if(contato.id == contatoAtualizado.id){
            contato.nome = contatoAtualizado.nome;
            contato.telefone = contatoAtualizado.telefone;
            contato.email = contatoAtualizado.email;
            
            contatoParaRetornar = contato;
          }
          return contato;
        });
        this.salvarContatosNoLocalStorage(contatos);
        
        if(!contatoParaRetornar) {
          throw new Error("Não foi possível localizar o contato com id " + contatoAtualizado.id);
        }

        return contatoParaRetornar;
      })
    );
  }
  excluirContato(idContato: string): Observable<void> {
    return this.listagemContatos().pipe(
      map((contatos)=>{
        contatos = contatos.filter((c) => c.id != idContato);

        this.salvarContatosNoLocalStorage(contatos);
      })
    );
  }

  private salvarContatosNoLocalStorage(contatos : ContatoModel[]){
    localStorage.setItem(this.CONTATOS_KEY, JSON.stringify(contatos));
  }
  
}
