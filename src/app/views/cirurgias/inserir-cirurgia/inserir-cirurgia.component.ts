import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { FormsCirurgiaViewModel } from '../models/forms-cirurgia.view-model';
import { CirurgiasService } from '../services/cirurgias.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-inserir-cirurgia',
  templateUrl: './inserir-cirurgia.component.html',
  styleUrls: ['./inserir-cirurgia.component.scss']
})
export class InserirCirurgiaComponent implements OnInit {
  form?: FormGroup;
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cirurgiasService: CirurgiasService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicosSelecionados: [[]],
    });

    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
  }
  
  gravar(): void {
    this.cirurgiasService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsCirurgiaViewModel) {
    this.notification.sucesso(
      `A cirurgia ${res.titulo} foi cadastrada com sucesso!`
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.mensagem
    );
  }
}
