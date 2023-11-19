import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { CirurgiasService } from './services/cirurgias.service';
import { ListarConsultasComponent } from '../consultas/listar-consultas/listar-consultas.component';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';

const formsCirurgiasResolver = (route: ActivatedRouteSnapshot) => {
  const id = parseInt(route.paramMap.get('id')!);

  return inject(CirurgiasService).selecionarPorId(id);
};

const listarCirurgiasResolver = () => {
  return inject(CirurgiasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCirurgiasComponent,
    // resolve: { cirurgias: listarCirurgiasResolver },
  },
  {
    path: 'inserir',
    component: InserirCirurgiaComponent,
  },
  {
  path: 'editar/:id',
  component: EditarCirurgiaComponent,
  // resolve: { cirurgias: formsCirurgiasResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiasRoutingModule { }
