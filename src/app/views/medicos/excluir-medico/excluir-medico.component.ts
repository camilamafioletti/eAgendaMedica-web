import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';
import { MedicosService } from '../services/medicos.service';

@Component({
  selector: 'app-excluir-medico',
  templateUrl: './excluir-medico.component.html',
  styleUrls: ['./excluir-medico.component.scss']
})
export class ExcluirMedicoComponent implements OnInit{
  medico$?: Observable<VisualizarMedicoViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicosService: MedicosService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.medico$ = this.route.data.pipe(map((res) => res['medico']));
  }

  confirmar(): void {
    
    const id = this.route.snapshot.paramMap.get('id')!;

    const consultas$ = this.medicosService.selecionarConsultasMedico(id);
    const cirurgias$ = this.medicosService.selecionarCirurgiasMedico(id);

    forkJoin([consultas$, cirurgias$]).subscribe(([consultas, cirurgias]) => {
      if (consultas.length > 0) {
        this.notification.erro('O médico possui consultas agendadas, tente novamente mais tarde!');
        return;
      }

      if (cirurgias.length > 0) {
        this.notification.erro('O médico possui cirurgias agendadas, tente novamente mais tarde!');
        return;
      }

      this.medicosService.excluir(id).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err),
      });
    });
  }

  processarSucesso(res: VisualizarMedicoViewModel) {
    this.notification.sucesso(
      `O médico foi excluído com sucesso!`
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(
      err.error.erros
    );
  }
}
