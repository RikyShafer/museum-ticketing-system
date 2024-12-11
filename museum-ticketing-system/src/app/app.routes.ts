import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BookingComponent } from './components/booking/booking.component';
import { TabComponent } from './components/tab/tab.component';
import { HourSlotComponent } from './components/hour-slot/hour-slot.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';

export const routes: Routes = [
  { path: '', redirectTo: 'booking', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'tab', component: TabComponent },
  { path: 'hour-slot', component: HourSlotComponent },
  { path: 'date-selector', component: DateSelectorComponent },
];
