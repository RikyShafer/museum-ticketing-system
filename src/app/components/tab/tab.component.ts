import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input() visitorCount: number = 1; // כמות המבקרים שנבחרה

  morningSlots = [
    { hour: '8:30', available: 0, isClosed: true },
    { hour: '8:40', available: 30, isClosed: false },
    { hour: '8:50', available: 10, isClosed: false },
    { hour: '9:00', available: 45, isClosed: false },
  ];
  afternoonSlots = [
    { hour: '12:30', available: 0, isClosed: true },
    { hour: '12:40', available: 30, isClosed: false },
    { hour: '12:50', available: 10, isClosed: false },
    { hour: '13:00', available: 45, isClosed: false },
  ];
  eveningSlots = [
    { hour: '17:30', available: 0, isClosed: true },
    { hour: '17:40', available: 3, isClosed: false },
    { hour: '17:50', available: 10, isClosed: false },
    { hour: '18:00', available: 2, isClosed: false },
  ];

  selectedSlot: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  // פונקציה שבודקת אם כמות הכרטיסים אינה מספיקה
  isLowAvailability(slot: any): boolean {
    return slot.available < this.visitorCount && slot.available > 0;
  }

  // פונקציה שנקראת כשנבחר ריבוע בטבלה
  onSlotClick(slot: any): void {
    if (!slot.isClosed && !this.isLowAvailability(slot)) {
      this.selectedSlot = slot;
    }
  }

  // פונקציה לאישור ההזמנה
  confirmBooking(): void {
    if (this.selectedSlot) {
      // עדכון כמות הכרטיסים הזמינים
      if (this.selectedSlot.available >= this.visitorCount) {
        this.selectedSlot.available -= this.visitorCount; // עדכון כמות הכרטיסים שנבחרו
      }
      
      // הצגת הודעת אישור
      this.selectedSlot.confirmationMessage = `ההזמנת כרטיסים לשעה ${this.selectedSlot.hour} אושרה`;

      // עדכון הממשק לאחר שינוי במצב
      this.cdr.detectChanges();

      // סגור את המודל אחרי 5 שניות
      setTimeout(() => {
        this.selectedSlot = null; // לסגור את המודל ולהחזיר את המסך למצב התחלתי
        this.cdr.detectChanges(); // עדכון הממשק גם אחרי סגירת המודל
      }, 5000); // 5000 מייצג 5 שניות
    }
  }

  // פונקציה לביטול ההזמנה
  cancelBooking(): void {
    this.selectedSlot = null; // לסגור את המודל
  }
}
