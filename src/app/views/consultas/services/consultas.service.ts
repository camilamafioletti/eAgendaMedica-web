import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico as Consulta } from '../../models/medico';
import { environment } from 'src/app/environments/environment.development';

@Injectable()
export class ConsultasService {
  private API_URL = `${environment.API_URL}/medicos`;

  constructor(private http: HttpClient) {}

  criar(consultas: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.API_URL, consultas);
  }

  editar(id: number, consulta: Consulta): Observable<Consulta> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<Consulta>(url, consulta);
  }

  selecionarPorId(id: number): Observable<Consulta> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<Consulta>(url);
  }

  selecionarTodos(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.API_URL);
  }
}