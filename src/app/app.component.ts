import { Component } from '@angular/core';
import { ClientsComponent } from './components/clients/clients.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClientsComponent],
  template: '<app-clients></app-clients>',
  styles: []
})
export class AppComponent {}