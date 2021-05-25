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
  ) { }

  ngOnInit(): void {
    this.getProcess();
  }

  getProcess() {
    this._processService.getProcess(this.postsPerPage, this.currentPage).pipe(take(1))
      .subscribe(
        val => {
          this.dataSource = new MatTableDataSource(val.posts);
          this.totalPosts = val.maxPosts;
        },
        (err: HttpErrorResponse) => {

        }
      )
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getProcess();
  }

  delete(id: string) {

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

  deleteProcess(id: string) {
    this._processService.setDeleteById(id).pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          this.getProcess();
        }
      }, (err: HttpErrorResponse) => {

      });
  }

}
