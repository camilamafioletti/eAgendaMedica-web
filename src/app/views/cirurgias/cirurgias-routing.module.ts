import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';
import { CirurgiasService } from './services/cirurgias.service';
import { MedicosService } from '../medicos/services/medicos.service';
import { VisualizarCirurgiaViewModel } from './models/visualizar-consulta.view-model';

const formsCirurgiaResolver = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;

  return inject(CirurgiasService).selecionarPorId(id);
};

const listarConsultasResolver = () => {
  return inject(CirurgiasService).selecionarTodos();
};

const visualizarCirurgiasResolver: ResolveFn<VisualizarCirurgiaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiasService).selecionarPorIdCompleto(
    route.paramMap.get('id')!
  );
};

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
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
    resolve: { cirurgias: listarConsultasResolver },
  },
  {
    path: 'inserir',
    component: InserirCirurgiaComponent,
    resolve: { medicos: listarMedicosResolver }
  },
  {
  path: 'editar/:id',
  component: EditarCirurgiaComponent,
  resolve: { cirurgia: formsCirurgiaResolver, medicos: listarMedicosResolver },
  },
  {
  path: 'excluir/:id',
  component: ExcluirCirurgiaComponent,
  resolve: { cirurgia: visualizarCirurgiasResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiasRoutingModule { }