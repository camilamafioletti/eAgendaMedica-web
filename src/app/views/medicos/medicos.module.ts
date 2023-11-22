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
import 'src/app/extensions/form-group.extension';


@NgModule({
  declarations: [
    InserirMedicoComponent,
    ListarMedicosComponent,
    EditarMedicoComponent,
    ExcluirMedicoComponent
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
