import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ViacepService {

  private urlApi = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<any> {
    return this.http.get(`${this.urlApi}/${cep}/json/`);
  }
}