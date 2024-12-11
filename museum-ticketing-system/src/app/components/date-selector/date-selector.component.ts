import { Component } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  standalone: true,
  imports: [],
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  currentDate: string; // תאריך נוכחי בפורמט יום/חודש/שנה
  ticketsLeft: number = 112; // כמות כרטיסים שנותרו

  constructor() {
    const today = new Date(); // תאריך נוכחי
    this.currentDate = this.formatDate(today); // פורמט התאריך
  }

  // פונקציה לעדכון התאריך שנבחר
  updateDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const selectedDate = new Date(input.value);
      this.currentDate = this.formatDate(selectedDate);
    }
  }

  // פונקציה לעיצוב התאריך בפורמט DD/MM/YYYY
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
