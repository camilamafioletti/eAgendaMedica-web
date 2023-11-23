import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';
import { ListarConsultaViewModel } from '../models/listar-consulta.view-model';

@Injectable()
export class ConsultasService {
  private API_URL = `${environment.API_URL}/Consulta`;

  constructor(private http: HttpClient) {}

  criar(consulta: FormsConsultaViewModel): Observable<FormsConsultaViewModel> {

    return this.http.post<FormsConsultaViewModel>(this.API_URL, consulta);
  }

  editar(id: string, consulta: FormsConsultaViewModel): Observable<FormsConsultaViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<FormsConsultaViewModel>(url, consulta);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<VisualizarConsultaViewModel>(url);
  }

  selecionarPorId(id: string): Observable<VisualizarConsultaViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarConsultaViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }
}