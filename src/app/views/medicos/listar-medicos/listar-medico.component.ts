import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.scss']
})
export class ListarMedicosComponent {
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(
      map((dados) => dados['medicos'])
    );
  }
}
