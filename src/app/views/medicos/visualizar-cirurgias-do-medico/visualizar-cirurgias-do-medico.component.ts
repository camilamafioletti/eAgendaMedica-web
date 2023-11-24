import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarCirurgiaViewModel } from '../../cirurgias/models/listar-consulta.view-model';

@Component({
  selector: 'app-visualizar-cirurgias-do-medico',
  templateUrl: './visualizar-cirurgias-do-medico.component.html',
  styleUrls: ['./visualizar-cirurgias-do-medico.component.scss']
})
export class VisualizarCirurgiasDoMedicoComponent {
  cirurgias$?: Observable<ListarCirurgiaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cirurgias$ = this.route.data.pipe(map(dados => dados['cirurgias']));
    console.log(this.cirurgias$);
  }
}