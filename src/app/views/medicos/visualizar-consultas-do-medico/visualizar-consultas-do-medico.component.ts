import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarConsultaViewModel } from '../../consultas/models/listar-consulta.view-model';

@Component({
  selector: 'app-visualizar-consultas-do-medico',
  templateUrl: './visualizar-consultas-do-medico.component.html',
  styleUrls: ['./visualizar-consultas-do-medico.component.scss']
})
export class VisualizarConsultasDoMedicoComponent {
  consultas$?: Observable<ListarConsultaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map(dados => dados['consultas']));
    console.log(this.consultas$);
  }
}
