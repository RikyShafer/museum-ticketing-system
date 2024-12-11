import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { HourSlotComponent } from './components/hour-slot/hour-slot.component';
import { TabComponent } from './components/tab/tab.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BookingComponent,HourSlotComponent, TabComponent, DateSelectorComponent, HeaderComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'מערכת כרטיסים למוזיאון';
}
