import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirurgiasRoutingModule } from './cirurgias-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CirurgiasService } from './services/cirurgias.service';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { MedicosService } from '../medicos/services/medicos.service';
import { VisualizarMedicosDaCirurgiaComponent } from './visualizar-medicos-da-cirurgia/visualizar-medicos-da-cirurgia.component';


@NgModule({
  declarations: [
    ListarCirurgiasComponent,
    InserirCirurgiaComponent,
    EditarCirurgiaComponent,
    ExcluirCirurgiaComponent,
    VisualizarMedicosDaCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    CirurgiasService,
    MedicosService
  ]
})
export class CirurgiasModule { }
