import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/**
 * Enum
 */
import { Endpoints } from '../../config/endpoint.enum';
/**
 * Interface
 */
import { IProcessResponse } from '../../interface/process-response';
/**
 * Services
 */
import { HttpClientService } from '../http/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private url = environment.url_API;
  constructor(
    private _http: HttpClientService,
  ) { }

  /**
    * getProcess
    * @description Metodo que trae retorna el listado de procesos
    * @param postPerPage cantidad de registro por pagina
    * @param currentPage pagina actual
    */
  public getProcess(postPerPage: number, currentPage: number): Observable<IProcessResponse> {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`
    const query = `${this.url}` + Endpoints.LIST_PROCESS + queryParams
    return this._http.get(query);
  }

  public setDeleteById(id: string) {
    const query = `${this.url}api/process/${id}`
    return this._http.delete(query);
  }

}
