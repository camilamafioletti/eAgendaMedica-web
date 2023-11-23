import { Component, OnInit } from '@angular/core';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';
import { ConsultasService } from '../services/consultas.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-excluir-consulta',
  templateUrl: './excluir-consulta.component.html',
  styleUrls: ['./excluir-consulta.component.scss']
})
export class ExcluirConsultaComponent implements OnInit{
  consulta$?: Observable<VisualizarConsultaViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultasService: ConsultasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.consulta$ = this.route.data.pipe(map((res) => res['consulta']));
  }

  confirmar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.consultasService.excluir(id).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: VisualizarConsultaViewModel) {
    this.notification.sucesso(
      `A consulta foi excluída com sucesso!`
    );

    this.router.navigate(['/consultas/listar']);
  }

  processarFalha(err: any) {
    console.log(err);
  }
}

