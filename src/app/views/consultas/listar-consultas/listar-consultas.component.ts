import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarConsultaViewModel } from '../models/listar-consulta.view-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.scss']
})
export class ListarConsultasComponent implements OnInit {
  consultas$?: Observable<ListarConsultaViewModel[]>;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map(dados => dados['consultas']));
  }
}
