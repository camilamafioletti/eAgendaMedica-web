import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';

@Injectable()
export class MedicosService {
  private API_URL = `${environment.API_URL}/medicos`;

  constructor(private http: HttpClient) {}

  criar(medicos: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    return this.http.post<FormsMedicoViewModel>(this.API_URL, medicos);
  }

  editar(id: string, medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<FormsMedicoViewModel>(url, medico);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<VisualizarMedicoViewModel>(url);
  }

  selecionarPorId(id: string): Observable<FormsMedicoViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<FormsMedicoViewModel>(url);
  }

  selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http.get<ListarMedicoViewModel[]>(this.API_URL);
  }

  selecionarMedicoCompletoPorId(id: string){
    return this.http.get<any>(this.API_URL + 'visualizacao-completa/' + id)
  }
}