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
      data: new FormControl('', [Validators.required,]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicosSelecionados: [[]],
    });

    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
    
  }

  campoEstaInvalido(nome: string){
    return this.form?.get(nome)!.touched && this.form.get(nome)!.invalid;
  }
  
  gravar(): void {
    if(this.form?.invalid){
      for(let erro of this.form.validate()) {
        this.notification.erro(erro);
      }

      return;
    }
    
    this.cirurgiasService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsCirurgiaViewModel) {
    this.notification.sucesso(
      `A cirurgia foi cadastrada com sucesso!`
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros[0]
    );
  }
}
