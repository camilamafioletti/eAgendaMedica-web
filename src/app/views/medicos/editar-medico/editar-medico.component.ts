import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { MedicosService } from '../services/medicos.service';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicosService: MedicosService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    });

    const medico = this.route.snapshot.data['medico'];

    this.form.patchValue(medico);
  }

  gravar(): void {
    if(this.form?.invalid){
      for(let erro of this.form.validate()) {
        this.notification.erro(erro);
      }

      return;
    }
    
    const id = this.route.snapshot.paramMap.get('id')!;
    this.medicosService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsMedicoViewModel) {
    this.notification.sucesso(
      `O médico foi editado com sucesso!`
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros[0]
    );
  }
}
