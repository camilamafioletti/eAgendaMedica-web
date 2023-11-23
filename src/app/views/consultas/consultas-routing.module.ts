import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ConsultasService } from './services/consultas.service';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';
import { VisualizarConsultaViewModel } from './models/visualizar-consulta.view-model';
import { MedicosService } from '../medicos/services/medicos.service';

const formsConsultasResolver = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;

  return inject(ConsultasService).selecionarPorId(id);
};

const listarConsultasResolver = () => {
  return inject(ConsultasService).selecionarTodos();
};

const visualizarConsultasResolver: ResolveFn<VisualizarConsultaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorId(
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
    component: ListarConsultasComponent,
    resolve: { consultas: listarConsultasResolver },
  },
  {
    path: 'inserir',
    component: InserirConsultaComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'editar/:id',
    component: EditarConsultaComponent,
    resolve: { consulta: formsConsultasResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirConsultaComponent,
    resolve: { consulta: visualizarConsultasResolver },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
