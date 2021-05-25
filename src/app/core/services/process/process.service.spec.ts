import { TestBed } from '@angular/core/testing';
import { ProcessService } from './process.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientService } from '../http/http-client.service';
import { environment } from 'src/environments/environment';

const MOCK_RESPONSE = {
  "message": "Posts fetched successfully!",
  "posts": [
    {
      "_id": "6059409b3a990747e00f2732",
      "contract": "CONSORCIO YENOBA SRL Y Y SERVICIOS DE REPRESENTACIONES Y LIMPIEZA MAGA INTEGRAL SAC",
      "type_contract": "5f695e3119af100748d9c7d8",
      "typeProcedure": {
        "_id": "5e373c96542ea639ac488833",
        "name": "Concurso Publico",
        "value": 4,
        "__v": 0
      },
      "number": "38",
      "year": "2019",
      "description": "SERVICIO DE LIMPIEZA GENERAL PARA LAS AGENCIAS , LOBBIES Y CAJEROS DE LOS DEPARTAMENTOS DE CUSCO, APURIMAC, MADRE DE DIOS, AYACUCHO Y PUNO DE LA SUBGERENCIA MACRO REGION IV SEDE CUSCO DE LA GERENCIA DE BANCA DE SERVICIOS DEL BANCO DE LA NACION - ITEM 04",
      "date": "2020-08-13T05:00:00.000Z",
      "items": "2",
      "user": {
        "_id": "5f4eef3dd77ae430cc18a9af",
        "name": "paul",
        "lastName": "vega"
      },
      "createdAt": "2021-03-23T01:12:59.703Z",
      "updatedAt": "2021-03-23T01:12:59.703Z",
      "cod_seg": "PRC2111",
      "__v": 0
    }
  ],
  "maxPosts": 7
}

describe('ProcessService', () => {
  let service: ProcessService;
  let httpService: HttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService]
    });
    service = TestBed.inject(ProcessService);
    httpService = TestBed.inject(HttpClientService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia llamar al servicio para listar los procesos', () => {
    const queryParams = `?pagesize=${5}&page=${1}`;
    service.getProcess(5,1).subscribe((data: any) => {
      void expect(data).toEqual(MOCK_RESPONSE);
    });
    const req = httpMock.expectOne(`${environment.url_API}/api/process/get-all${queryParams}`);

    expect(req.request.method).toBe("GET");

    req.flush(MOCK_RESPONSE);
  });

  it('Deberia llamar al servicio que eliminar el registro de procesos', () => {
    service.setDeleteById('6059409b3a990747e00f2732').subscribe((data: boolean) => {
      void expect(data).toEqual(true);
    });
    const req = httpMock.expectOne(`${environment.url_API}/api/process/6059409b3a990747e00f2732`);

    expect(req.request.method).toBe("DELETE");

    req.flush(true);
  });
});
