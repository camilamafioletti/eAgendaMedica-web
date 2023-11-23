import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent } from './listar-medicos/listar-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { MedicosService } from './services/medicos.service';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { VisualizarMedicoViewModel } from './models/visualizar-medico.view-model';

const formsMedicosResolver = (route: ActivatedRouteSnapshot) => {
  const id =  route.paramMap.get('id')!;

  return inject(MedicosService).selecionarPorId(id);
};

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

const visualizarMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarMedicosComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    resolve: { medico: formsMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirMedicoComponent,
    resolve: { medico: visualizarMedicoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}
