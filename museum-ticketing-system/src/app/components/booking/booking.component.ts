import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TabComponent
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  visitorCount: number = 1; // כמות המבקרים שנבחרה
  showTable: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  increase(): void {
    this.visitorCount++;
  }

  decrease(): void {
    if (this.visitorCount > 1) {
      this.visitorCount--;
    }
  }

  // פונקציה להצגת הטבלה
  displayTable(): void {
    this.showTable = true;
  }
}
