import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProcessService } from 'src/app/core/services/process/process.service';
import { ListProcessComponent } from './list-process.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

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

describe('ListProcessComponent', () => {
  let component: ListProcessComponent;
  let fixture: ComponentFixture<ListProcessComponent>;
  let service: ProcessService;
  // let dialog : MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ListProcessComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useClass: MatDialogMock },
        ProcessService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcessComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProcessService);
    // dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('Deberias poder crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar al metodo getProcess', ()=> {
    spyOn(component,'getProcess');
    component.ngOnInit();
    expect(component.getProcess).toHaveBeenCalled();
  });

  it('Deberia llamar al metodo getProcess por cada evento de paginacion', ()=> {
    spyOn(component,'getProcess');
    const pageData: PageEvent = {
      pageIndex: 0,
      length: 0,
      pageSize: 0,
    }
    component.onChangedPage(pageData);
    expect(component.getProcess).toHaveBeenCalled();
  });

  it('Deberia llamar al listado de procesos', ()=> {
    spyOn(service,'getProcess').and.returnValue(of(MOCK_RESPONSE));
    component.getProcess();
    expect(component.totalPosts).toEqual(7);
  });

  it('Deberia llamar al listado de procesos - error ', ()=> {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: {
        code: 'T09999'
      }
    });
    spyOn(service,'getProcess').and.returnValue(throwError(errorResponse));
    component.getProcess();
    expect(component.totalPosts).toEqual(10);
  });

  it('Deberia llamar al modal querer eliminar un registro', ()=> {
    spyOn(component,'deleteProcess');
    spyOn(component.dialog, 'open')
     .and
     .returnValue({afterClosed: () => of(true)} as MatDialogRef<typeof component>);
    component.delete('6059409b3a990747e00f2732');
    expect(component.deleteProcess).toHaveBeenCalled();
  });

  it('Deberia llamar al modal querer eliminar un registro - false', ()=> {
    spyOn(component,'deleteProcess');
    spyOn(component.dialog, 'open')
     .and
     .returnValue({afterClosed: () => of(false)} as MatDialogRef<typeof component>);
    component.delete('6059409b3a990747e00f2732');
    expect(component.deleteProcess).not.toHaveBeenCalled();
  });

  it('Deberia llamar al servicio de eliminar registro ', ()=> {
    spyOn(service,'setDeleteById').and.returnValue(of(true));
    spyOn(component,'getProcess');
    component.deleteProcess('6059409b3a990747e00f2732');
    expect(component.getProcess).toHaveBeenCalled();
  });

});
