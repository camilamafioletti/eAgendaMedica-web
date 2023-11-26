import { Component, OnInit } from '@angular/core';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { ConsultasService } from '../services/consultas.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-inserir-consulta',
  templateUrl: './inserir-consulta.component.html',
  styleUrls: ['./inserir-consulta.component.scss']
})
export class InserirConsultaComponent implements OnInit{
  form!: FormGroup;
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
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
  }

  campoEstaInvalido(nome: string){
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar(): void {
    this.consultasService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsConsultaViewModel) {
    this.notification.sucesso(
      `A consulta ${res.titulo} foi cadastrada com sucesso!`
    );

    this.router.navigate(['/consultas/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros[0]
    );
  }
}