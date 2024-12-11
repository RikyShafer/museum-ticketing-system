import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // הייבוא של HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // ספק ברמה הגלובלית
})
export class SlotsService {

  private apiUrl = 'http://localhost:5188/api/slots';  // כתובת ה-API שלך

  constructor(private http: HttpClient) {}

  // קריאה לשרת לקבלת כל הזמנים
  getSlots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);  // חזרה על כל הזמנים
  }

  // קריאה לשרת לעדכון כמות המקומות
  updateSlot(slot: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update`, slot);  // שליחה של העדכון לשרת
  }
}
