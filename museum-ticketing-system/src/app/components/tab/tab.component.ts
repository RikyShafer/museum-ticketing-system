import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotsService } from '../../slots.service'; // ייבוא ה-Service

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule], // הסרת HttpClientModule כאן
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input() visitorCount: number = 1;

  morningSlots: any[] = [];
  afternoonSlots: any[] = [];
  eveningSlots: any[] = [];

  selectedSlot: any = null;

  constructor(private cdr: ChangeDetectorRef, private slotsService: SlotsService) {}

  ngOnInit(): void {
    this.slotsService.getSlots().subscribe((slots: any) => {
      console.log('זמני הזמנות התקבלו:', slots);
      this.categorizeSlots(slots);
    }, (error) => {
      console.error('שגיאה בהבאת זמני הזמנות:', error);
    });
  }

  categorizeSlots(slots: any[]) {
    const morningStart = '08:00';
    const afternoonStart = '12:00';
    const eveningStart = '17:00';

    this.morningSlots = slots.filter(slot => slot.startTime >= morningStart && slot.startTime < afternoonStart);
    this.afternoonSlots = slots.filter(slot => slot.startTime >= afternoonStart && slot.startTime < eveningStart);
    this.eveningSlots = slots.filter(slot => slot.startTime >= eveningStart);
  }

  isLowAvailability(slot: any): boolean {
    return slot.available < this.visitorCount && slot.available > 0;
  }

  onSlotClick(slot: any): void {
    if (!slot.isClosed && !this.isLowAvailability(slot)) {
      this.selectedSlot = slot;
    }
  }

  confirmBooking(): void {
    try {
      console.log('התחלת פונקציה confirmBooking');
      if (this.selectedSlot) {
        console.log('נבחרה שעה:', this.selectedSlot.startTime);
        if (this.selectedSlot.availablePlaces >= this.visitorCount) {
          console.log('יש מספיק כרטיסים');
          // עדכון הזמינות
          this.selectedSlot.availablePlaces -= this.visitorCount;
  
          // שליחת הנתונים לשירות לעדכון השרת
          this.slotsService.updateSlot(this.selectedSlot).subscribe(
            (response) => {
              console.log('הזמנה בוצעה בהצלחה');
              // אם ההזמנה בוצעה בהצלחה, הצגת הודעת אישור
              this.selectedSlot.confirmationMessage = `ההזמנת כרטיסים לשעה ${this.selectedSlot.startTime} אושרה`;
              this.cdr.detectChanges();
  
              // אפס את ה-slot אחרי 5 שניות
              setTimeout(() => {
                this.selectedSlot = null;
                this.cdr.detectChanges();
              }, 5000);
            },
            (error) => {
              console.error('שגיאה בעדכון השרת:', error);
            }
          );
        } else {
          console.warn('אין מספיק כרטיסים');
        }
      }
    } catch (error) {
      console.error('שגיאה בפונקציה:', error);
    }
  }
  
  cancelBooking(): void {
    this.selectedSlot = null;
  }
}