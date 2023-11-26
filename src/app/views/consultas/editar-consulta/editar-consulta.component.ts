import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from '../services/consultas.service';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Observable, map } from 'rxjs';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.scss']
})
export class EditarConsultaComponent implements OnInit {
  form!: FormGroup;
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required,]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicoId: new FormControl('', [Validators.required]),   
    });
    
    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));

    const consulta = this.route.snapshot.data['consulta'];

    this.form.patchValue(consulta);
  }

  campoEstaInvalido(nome: string){
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }
  
  gravar(): void {
    if(this.form?.invalid){
      for(let erro of this.form.validate()) {
        this.notification.erro(erro);
      }

      return;
    }
    
    const id = this.route.snapshot.paramMap.get('id')!;
    this.consultasService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsConsultaViewModel) {
    this.notification.sucesso(
      `A consulta foi cadastrada com sucesso!`
    );

    this.router.navigate(['/consultas/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros[0]
    );
  }
}
