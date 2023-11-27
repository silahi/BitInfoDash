import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';

@Component({
  selector: 'bit-info-dash-address-tracking',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './address-tracking.component.html',
  styleUrls: ['./address-tracking.component.css'],
})
export class AddressTrackingComponent {
  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      height: '300px',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
