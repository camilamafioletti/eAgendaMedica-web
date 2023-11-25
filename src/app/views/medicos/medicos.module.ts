import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medico.component';
import { MedicosRoutingModule } from './medicos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosService } from './services/medicos.service';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { VisualizarCirurgiasDoMedicoComponent } from './visualizar-cirurgias-do-medico/visualizar-cirurgias-do-medico.component';
import { VisualizarConsultasDoMedicoComponent } from './visualizar-consultas-do-medico/visualizar-consultas-do-medico.component';
import 'src/app/extensions/form-group.extension';

@NgModule({
  declarations: [
    InserirMedicoComponent,
    ListarMedicosComponent,
    EditarMedicoComponent,
    ExcluirMedicoComponent,
    VisualizarCirurgiasDoMedicoComponent,
    VisualizarConsultasDoMedicoComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    MedicosService
  ]
})
export class MedicosModule { }
