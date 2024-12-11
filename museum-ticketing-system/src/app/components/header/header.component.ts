import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'כניסה למוזיאון';
  description: string =
    'נא למלא את הפרטים הדרושים ולחץ המשך. הכניסה למוזיאון אינה כרוכה בתשלום (כניסה בלבד ללא הדרכה).';
  tourDetails: string = 'פרטי הסיור';
}
