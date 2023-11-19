import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ConsultasService } from './services/consultas.service';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';

const formsConsultasResolver = (route: ActivatedRouteSnapshot) => {
  const id = parseInt(route.paramMap.get('id')!);

  return inject(ConsultasService).selecionarPorId(id);
};

const listarConsultasResolver = () => {
  return inject(ConsultasService).selecionarTodos();
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
    // resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirConsultaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarConsultaComponent,
    // resolve: { medicos: formsMedicosResolver },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
