import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedicosService } from '../services/medicos.service';
import { Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent implements OnInit{
  form!: FormGroup;
  medicoVM!: FormsMedicoViewModel;

  constructor(
    private fb: FormBuilder,
    private medicosService: MedicosService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl(['']),
      crm: new FormControl(['']),
      telefone: new FormControl(['']),
    });
  }

  gravar() {

    this.medicoVM = this.form.value;

    this.medicosService.criar(this.medicoVM).subscribe();
  }
}
