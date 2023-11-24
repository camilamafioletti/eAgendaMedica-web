import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';

@Component({
  selector: 'app-visualizar-medicos-da-cirurgia',
  templateUrl: './visualizar-medicos-da-cirurgia.component.html',
  styleUrls: ['./visualizar-medicos-da-cirurgia.component.scss']
})
export class VisualizarMedicosDaCirurgiaComponent implements OnInit{
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(map(dados => dados['medicosCirurgia']), tap(x => console.log(x)));
  }
}

