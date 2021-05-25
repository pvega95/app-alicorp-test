import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcessService } from 'src/app/core/services/process/process.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProcesoModalComponent } from './proceso-modal/proceso-modal.component';
import { IProcessResponse } from 'src/app/core/interface/process-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-process',
  templateUrl: './list-process.component.html',
  styleUrls: ['./list-process.component.scss']
})
export class ListProcessComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'delete'];
  dataSource = new MatTableDataSource([]);
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20];
  busqueda$: Observable<any> = new Observable()
  inputControlSearch = new FormControl('');

  constructor(
    private _processService: ProcessService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProcess();
  }

  public getProcess() {
    this._processService.getProcess(this.postsPerPage, this.currentPage).pipe(take(1))
      .subscribe(
        (val: IProcessResponse) => {
          this.dataSource = new MatTableDataSource(val.posts);
          this.totalPosts = val.maxPosts;
        },
        (err: HttpErrorResponse) => {
          //LOGICA EN CASO HUBIERA UN ERROR
        }
      )
  }

  public onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getProcess();
  }

  public delete(id: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(ProcesoModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: boolean) => {
        if (data) {
          this.deleteProcess(id);
        }

      }
    );
  }

  public deleteProcess(id: string) {
    this._processService.setDeleteById(id).pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          this.getProcess();
          this._snackBar.open('Se elimino corretamente', 'Aceptar');
        }
      }, (err: HttpErrorResponse) => {
        //LOGICA EN CASO HUBIERA UN ERROR
      });
  }

}
