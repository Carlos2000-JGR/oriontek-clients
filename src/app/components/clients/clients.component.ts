import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  clients: Client[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      addresses: [
        { id: 1, street: '123 Main St', city: 'Cityville', state: 'CA', zip: '12345', clientId: 1 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      addresses: [
        { id: 2, street: '456 Elm St', city: 'Townsville', state: 'TX', zip: '54321', clientId: 2 }
      ]
    }
  ];

  clientForm: Client = { id: 0, name: '', email: '', addresses: [] };
  showPopup = false;

  openPopup() {
    this.clientForm = { id: 0, name: '', email: '', addresses: [] };
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  editClient(client: Client) {
    this.clientForm = { ...client };
    this.showPopup = true;
  }

  deleteClient(clientId: number) {
    this.clients = this.clients.filter(client => client.id !== clientId);
  }

  saveClient() {
    if (this.clientForm.id === 0) {
      const newId = this.clients.length > 0 ? Math.max(...this.clients.map(c => c.id)) + 1 : 1;
      this.clients.push({ ...this.clientForm, id: newId });
    } else {
      const index = this.clients.findIndex(c => c.id === this.clientForm.id);
      if (index !== -1) {
        this.clients[index] = { ...this.clientForm };
      }
    }
    this.closePopup();
  }

  addAddress() {
    const newAddress: Address = { id: Date.now(), street: '', city: '', state: '', zip: '', clientId: this.clientForm.id };
    this.clientForm.addresses.push(newAddress);
  }

  removeAddress(addressId: number) {
    this.clientForm.addresses = this.clientForm.addresses.filter((address: Address) => address.id !== addressId);
  }
}
