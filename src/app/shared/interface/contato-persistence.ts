import { Observable } from "rxjs";
import { ContatoModel } from "../models/contato-model";

export interface ContatoPersistence {

    listagemContatos() : Observable<ContatoModel[]>;

    getContato(idContato : string) : Observable<ContatoModel>;

    adicionarContato(nome : string, telefone : string, email : string) : Observable<ContatoModel>;

    atualizarContato(contatoAtualizado : ContatoModel) : Observable<ContatoModel>;

    excluirContato(idContato : string) : Observable<void>;
}