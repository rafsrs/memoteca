import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3050/pensamentos';

  constructor(private http: HttpClient) {}

  listar(pagina: number, filtro: string, favoritos?: boolean): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let paramets = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)
    if (filtro.trim().length > 2) {
        paramets = paramets.set("q", filtro)
    }

    if (favoritos) {
      paramets = paramets
      .set("favorito", true)
    }

    return this.http.get<Pensamento[]>(this.API, {params: paramets});
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito

    return this.editar(pensamento)
  }

}
