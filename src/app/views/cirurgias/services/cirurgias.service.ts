import { Observable } from "rxjs";
import { Cirurgia } from "../models/cirurgia";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/app/environments/environment.development";
import { Injectable } from "@angular/core";


@Injectable()
export class CirurgiasService {
  private API_URL = `${environment.API_URL}/cirurgias`;

  constructor(private http: HttpClient) {}

  criar(cirurgias: Cirurgia): Observable<Cirurgia> {
    return this.http.post<Cirurgia>(this.API_URL, cirurgias);
  }

  editar(id: number, cirurgia: Cirurgia): Observable<Cirurgia> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<Cirurgia>(url, cirurgia);
  }

  selecionarPorId(id: number): Observable<Cirurgia> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<Cirurgia>(url);
  }

  selecionarTodos(): Observable<Cirurgia[]> {
    return this.http.get<Cirurgia[]>(this.API_URL);
  }
}