import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-consulta.view-model';
import { CirurgiasService } from '../services/cirurgias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-excluir-cirurgia',
  templateUrl: './excluir-cirurgia.component.html',
  styleUrls: ['./excluir-cirurgia.component.scss']
})
export class ExcluirCirurgiaComponent implements OnInit{
  cirurgia$?: Observable<VisualizarCirurgiaViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultasService: CirurgiasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cirurgia$ = this.route.data.pipe(map((res) => res['cirurgia']));
  }

  confirmar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.consultasService.excluir(id).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: VisualizarCirurgiaViewModel) {
    this.notification.sucesso(
      `A cirurgia foi excluída com sucesso!`
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(err: any) {
    console.log(err);
  }
}

