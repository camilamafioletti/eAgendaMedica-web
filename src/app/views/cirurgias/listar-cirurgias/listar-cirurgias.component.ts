import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarCirurgiaViewModel } from '../models/listar-consulta.view-model';

@Component({
  selector: 'app-listar-cirurgias',
  templateUrl: './listar-cirurgias.component.html',
  styleUrls: ['./listar-cirurgias.component.scss']
})
export class ListarCirurgiasComponent implements OnInit {
  cirurgias$?: Observable<ListarCirurgiaViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cirurgias$ = this.route.data.pipe(map(dados => dados['cirurgias']));
  }
}