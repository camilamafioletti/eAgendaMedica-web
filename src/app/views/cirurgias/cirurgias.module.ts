import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirurgiasRoutingModule } from './cirurgias-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CirurgiasService } from './services/cirurgias.service';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';


@NgModule({
  declarations: [
    ListarCirurgiasComponent,
    InserirCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    CirurgiasService
  ]
})
export class CirurgiasModule { }
