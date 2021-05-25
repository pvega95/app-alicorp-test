import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../http/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private url = environment.url_API
  constructor(
    private _http: HttpClientService,
  ) { }

  getProcess(postPerPage: number, currentPage: number): Observable<any>{
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`
    const query = `${this.url}/api/process/get-all` + queryParams
    return this._http.get(query);
  }

  setDeleteById(id:string){
    const query = `${this.url}/api/process/${id}`
    return this._http.delete(query);
  }
  
}
