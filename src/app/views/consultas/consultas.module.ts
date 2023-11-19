import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultasService } from './services/consultas.service';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';


@NgModule({
  declarations: [
    ListarConsultasComponent,
    InserirConsultaComponent,
    EditarConsultaComponent,
    ExcluirConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    ConsultasService
  ]
})
export class ConsultasModule { }
