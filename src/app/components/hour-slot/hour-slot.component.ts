import { Component, Input } from '@angular/core';
import { NgFor, NgClass } from '@angular/common'; // ייבוא NgFor ו-NgClass
import { MatButtonModule } from '@angular/material/button'; // ייבוא MatButtonModule

@Component({
  selector: 'app-hour-slot',
  templateUrl: './hour-slot.component.html', // קישור לקובץ HTML
  styleUrls: ['./hour-slot.component.css'], // קישור לקובץ CSS
  standalone: true,
  imports: [NgFor, NgClass, MatButtonModule], // הוספת המודולים הדרושים
})
export class HourSlotComponent {
  @Input() hourSlots: any[] = []; // קבלת רשימת השעות כקלט
}
