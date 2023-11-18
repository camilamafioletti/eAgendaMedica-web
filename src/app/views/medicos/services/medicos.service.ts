import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../../models/medico';
import { environment } from 'src/app/environments/environment.development';

@Injectable()
export class MedicosService {
  private API_URL = `${environment.API_URL}/medicos`;

  constructor(private http: HttpClient) {}

  criar(medicos: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.API_URL, medicos);
  }

  editar(id: number, medico: Medico): Observable<Medico> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<Medico>(url, medico);
  }

  selecionarPorId(id: number): Observable<Medico> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<Medico>(url);
  }

  selecionarTodos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.API_URL);
  }
}