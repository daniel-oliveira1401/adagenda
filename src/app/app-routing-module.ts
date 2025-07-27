import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contatos',
    loadChildren: ()=> import('./features/contatos/contatos-module').then((c)=> c.ContatosModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contatos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
