import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent } from './listar-medicos/listar-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { MedicosService } from './services/medicos.service';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';

const formsMedicosResolver = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;

  return inject(MedicosService).selecionarPorId(id);
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
    component: ListarMedicosComponent,
    // resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    // resolve: { medicos: formsMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirMedicoComponent,
    // resolve: { medicos: formsMedicosResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}
