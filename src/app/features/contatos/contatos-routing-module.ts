import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato-component/contato-component';
import { PaginaContatoComponent } from './pagina-contato-component';

const routes: Routes = [
  {
    path: '',
    component: PaginaContatoComponent,
    children: [
      {
        path: '',
        component: ContatoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
