import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { MedicosService } from './services/medicos.service';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';

const formsMedicosResolver = (route: ActivatedRouteSnapshot) => {
  const id = parseInt(route.paramMap.get('id')!);

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
    component: ListarMedicoComponent,
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}
