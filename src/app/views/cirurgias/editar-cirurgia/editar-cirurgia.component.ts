import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CirurgiasService } from '../services/cirurgias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { Observable, map } from 'rxjs';
import { FormsCirurgiaViewModel } from '../models/forms-cirurgia.view-model';

@Component({
  selector: 'app-editar-cirurgia',
  templateUrl: './editar-cirurgia.component.html',
  styleUrls: ['./editar-cirurgia.component.scss']
})
export class EditarCirurgiaComponent implements OnInit{
  form!: FormGroup;
  Medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(
    private fb: FormBuilder,
    private cirurgiasService: CirurgiasService,
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
      medicosSelecionados: [[]],
    });

    this.Medicos$ = this.route.data.pipe(map(dados => dados['medicos']));

    const cirurgia = this.route.snapshot.data['cirurgia'];

    this.form.patchValue(cirurgia);
  }

  campoEstaInvalido(nome: string){
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.cirurgiasService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsCirurgiaViewModel) {
    this.notification.sucesso(
      `O cirurgia ${res.titulo} foi cadastrado(a) com sucesso!`
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros[0]
    );
  }
}
