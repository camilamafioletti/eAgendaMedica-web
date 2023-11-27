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
      crm: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-[A-Z]{2}$/)]),
      telefone: new FormControl('', [Validators.required]),
    });
  }

  gravar(): void {
    if(this.form?.invalid){
      for(let erro of this.form.validate()) {
        this.notification.erro(erro);
      }

      return;
    }
    
    if (this.form.valid) {
      this.medicosService.criar(this.form.value).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err),
      });
    } 
  }

  processarSucesso(res: FormsMedicoViewModel) {
    this.notification.sucesso(
      `O médico foi cadastrado com sucesso!`
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros.consoleLog(err)
    );
  }
}
