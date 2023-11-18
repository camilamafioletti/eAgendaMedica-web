import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { MedicosRoutingModule } from './medicos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosService } from './services/medicos.service';



@NgModule({
  declarations: [
    InserirMedicoComponent,
    ListarMedicoComponent
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