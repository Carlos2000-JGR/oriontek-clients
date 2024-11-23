import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { AddressesComponent } from './components/addresses/addresses.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'client/:id', component: AddressesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}