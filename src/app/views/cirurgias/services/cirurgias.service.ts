import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, map, tap } from "rxjs";
import { environment } from "src/app/environments/environment.development"
import { FormsCirurgiaViewModel } from "../models/forms-cirurgia.view-model";
import { ListarCirurgiaViewModel } from "../models/listar-consulta.view-model";
import { VisualizarCirurgiaViewModel } from "../models/visualizar-consulta.view-model";
import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.view-model";

@Injectable()
export class CirurgiasService {
    private API_URL = `${environment.API_URL}/Cirurgia`;

    constructor(private http: HttpClient) {}

  criar(cirurgia: FormsCirurgiaViewModel): Observable<FormsCirurgiaViewModel> {
    return this.http.post<FormsCirurgiaViewModel>(this.API_URL, cirurgia);
  }

  editar(id: string, Cirurgia: FormsCirurgiaViewModel): Observable<FormsCirurgiaViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<FormsCirurgiaViewModel>(url, Cirurgia);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<VisualizarCirurgiaViewModel>(url);
  }

  selecionarPorId(id: string): Observable<FormsCirurgiaViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarCirurgiaViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }

  selecionarPorIdCompleto(id: string): Observable<VisualizarCirurgiaViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodosMedicosCirurgias(id: string): Observable<ListarMedicoViewModel[]> {
    const url = `${this.API_URL}/medicos/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados), tap(x => console.log(x)));
  }
}