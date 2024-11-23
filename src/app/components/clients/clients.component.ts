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
      name: 'Juan Perez',
      email: 'juan.perez@example.com',
      addresses: [
        { id: 1, street: '123 Main St', city: 'Santiago', state: 'Santiago', zip: '10114', clientId: 1 },
      ],
    },
    {
      id: 2,
      name: 'Maria Gomez',
      email: 'maria.gomez@example.com',
      addresses: [
        { id: 2, street: '456 Elm St', city: 'Santo Domingo', state: 'Distrito Nacional', zip: '10118', clientId: 2 },
      ],
    },
  ];

  clientForm: Client = { id: 0, name: '', email: '', addresses: [] };
  selectedAddresses: Address[] = [];
  showPopup = false;
  showAddressPopup = false;
  showDeletePopup = false;
  clientToDelete: number | null = null;

  openPopup() {
    this.clientForm = { id: 0, name: '', email: '', addresses: [] };
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  openAddressPopup(addresses: Address[]) {
    this.selectedAddresses = addresses;
    this.showAddressPopup = true;
  }

  closeAddressPopup() {
    this.showAddressPopup = false;
  }

  editClient(client: Client) {
    this.clientForm = { ...client, addresses: [...client.addresses] };
    this.showPopup = true;
  }

  openDeletePopup(clientId: number) {
    this.clientToDelete = clientId;
    this.showDeletePopup = true;
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
  }

  confirmDelete() {
    if (this.clientToDelete !== null) {
      this.clients = this.clients.filter((client) => client.id !== this.clientToDelete);
      this.clientToDelete = null;
    }
    this.closeDeletePopup();
  }

  saveClient() {
    // Validation to ensure all fields are filled
    if (!this.clientForm.name.trim()) {
      alert('Name is required.');
      return;
    }
    if (!this.clientForm.email.trim()) {
      alert('Email is required.');
      return;
    }
    if (this.clientForm.addresses.length === 0) {
      alert('At least one address is required.');
      return;
    }

    for (let address of this.clientForm.addresses) {
      if (
        !address.street.trim() ||
        !address.city.trim() ||
        !address.state.trim() ||
        !address.zip.trim()
      ) {
        alert('All address fields are required.');
        return;
      }
    }

    if (this.clientForm.id === 0) {
      const newId = this.clients.length > 0 ? Math.max(...this.clients.map((c) => c.id)) + 1 : 1;
      this.clients.push({ ...this.clientForm, id: newId });
    } else {
      const index = this.clients.findIndex((c) => c.id === this.clientForm.id);
      if (index !== -1) {
        this.clients[index] = { ...this.clientForm };
      }
    }
    this.closePopup();
  }

  addAddress() {
    const newAddress: Address = {
      id: Date.now(),
      street: '',
      city: '',
      state: '',
      zip: '',
      clientId: this.clientForm.id,
    };
    this.clientForm.addresses.push(newAddress);
  }

  removeAddress(addressId: number) {
    this.clientForm.addresses = this.clientForm.addresses.filter(
      (address) => address.id !== addressId
    );
  }
}
