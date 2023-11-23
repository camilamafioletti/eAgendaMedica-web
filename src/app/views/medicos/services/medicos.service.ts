import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';

@Injectable()
export class MedicosService {
  private API_URL = `${environment.API_URL}/Medico`;

  constructor(private http: HttpClient) {}

  criar(medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {

    return this.http.post<FormsMedicoViewModel>(this.API_URL, medico);
  }

  editar(id: string, medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<FormsMedicoViewModel>(url, medico);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<VisualizarMedicoViewModel>(url);
  }

  selecionarPorId(id: string): Observable<VisualizarMedicoViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }
}