import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicosService } from '../services/medicos.service';
import { Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicosService: MedicosService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
    });
  }

  gravar(): void {
    this.medicosService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsMedicoViewModel) {
    this.notification.sucesso(
      `A medico ${res.nome} foi cadastrada com sucesso!`
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.mensagem
    );
  }
}
