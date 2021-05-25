import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proceso-modal',
  templateUrl: './proceso-modal.component.html',
  styleUrls: ['./proceso-modal.component.scss']
})
export class ProcesoModalComponent implements OnInit {
  dataRecieved: any;
  constructor(
    public dialogRef: MatDialogRef<ProcesoModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dataRecieved = data;
   
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close(true);
  }

}
