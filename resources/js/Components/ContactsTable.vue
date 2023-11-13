<script>
import { ref, onMounted } from 'vue';
import DangerButton from './DangerButton.vue';
import SecondaryButton from './SecondaryButton.vue';
import PrimaryButton from './PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import useContacts from './composable/contacts';
import useContactGroups from './composable/contactGroups';

export default {
  setup() {
    const { contacts, getContacts, destroyContact, addNewContact, editContact } = useContacts();
    const { contactGroups, getContactGroups } = useContactGroups();

    onMounted(getContacts);

    const confirmingContactDeletion = ref(false);
    const showEditModal = ref(false);
    const showAddNewModal = ref(false);
    const editedContact = ref({ id: null, name: '', email: '', phone: '', groupId: '' });
    const newContactData = ref({ name: '', email: '', phone: '', groupId: '' });
    const selectedGroup = ref(null); 
    console.log(contacts)
    console.log(contactGroups)

    const saveUpdatedContact = async () => {
      await editContact(editedContact.value);
      await getContacts();
      showEditModal.value = false;
    };

    const saveNewContact = async () => {
      await addNewContact({ ...newContactData.value, groupId: selectedGroup.value });
      await getContacts();
      showAddNewModal.value = false;
      newContactData.value = { name: '', email: '', phone: '' };
    };

    const deleteContact = (contactId) => {
      confirmingContactDeletion.value = true;
      editedContact.value.id = contactId;
    };

    const closeDeleteModal = () => {
      confirmingContactDeletion.value = false;
    };

    const closeEditModal = () => {
      showEditModal.value = false;
    };

    const closeAddNewModal = () => {
      showAddNewModal.value = false;
    };

    const confirmContactDeletion = async () => {
      await destroyContact(editedContact.value.id);
      await getContacts();
      confirmingContactDeletion.value = false;
    };

    const openEditModal = (contact) => {
      showEditModal.value = true;
      editedContact.value = { ...contact };
    };

    const openAddNewModal = () => {
      showAddNewModal.value = true;
    };

    return {
      confirmingContactDeletion,
      showEditModal,
      showAddNewModal,
      editedContact,
      contacts,
      contactGroups,
      addNewContact,
      saveUpdatedContact,
      deleteContact,
      closeDeleteModal,
      closeEditModal,
      confirmContactDeletion,
      openEditModal,
      closeAddNewModal,
      openAddNewModal,
      saveNewContact,
      getContactGroups,
    };
  },
  components: { DangerButton, SecondaryButton, Modal, PrimaryButton },
};
</script>

<template>
  <div>
    <PrimaryButton @click="openAddNewModal">Add New</PrimaryButton>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <!-- Use editContact method when Edit button is clicked -->
            <SecondaryButton @click="openEditModal(contact)">Edit</SecondaryButton>
            
            <!-- Use deleteContact method when Delete button is clicked -->
            <DangerButton @click="deleteContact(contact.id)">Delete</DangerButton>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :show="confirmingContactDeletion" @close="closeDeleteModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          Are you sure you want to delete the contact?
        </h2>
        <div class="mt-6">
        </div>
        <div class="mt-6 flex justify-end">
          <SecondaryButton @click="closeDeleteModal">Cancel</SecondaryButton>
          <DangerButton class="ms-3" @click="confirmContactDeletion">Confirm Delete</DangerButton>
        </div>
      </div>
    </Modal>
    <Modal :show="showEditModal" @close="closeEditModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Edit Contact</h2>
        </div>
        <div class="modal-body">
          <!-- Autofill the fields in the edit modal -->
          <label for="editName">Name:</label>
          <input v-model="editedContact.name" type="text" id="editName" />
          <label for="editEmail">Email:</label>
          <input v-model="editedContact.email" type="email" id="editEmail" />
          <label for="editPhone">Phone:</label>
          <input v-model="editedContact.phone" type="text" id="editPhone" />
          <select v-model="selectedGroup" id="groupSelector">
            <option v-for="group in contactGroups" :key="group.id" :value="group.id">{{ group.name }}</option>
          </select>
        </div>
        <div class="modal-footer">
          <SecondaryButton @click="closeEditModal">Cancel</SecondaryButton>
          <DangerButton class="ms-3" @click="saveUpdatedContact">Update</DangerButton>
        </div>
      </div>
    </Modal>
    <Modal :show="showAddNewModal" @close="closeAddNewModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Add New Contact</h2>
        </div>
        <div class="modal-body">
          <!-- Autofill the fields in the edit modal -->
          <label for="editName">Name:</label>
          <input  type="text" id="editName" />
          <label for="editEmail">Email:</label>
          <input  type="email" id="editEmail" />
          <label for="editPhone">Phone:</label>
          <input  type="text" id="editPhone" />
          <label for="groupSelector">Select Group:</label>
      <select v-model="selectedGroup" id="groupSelector">
        <option v-for="group in contactGroups" :key="group.id" :value="group.id">{{ group.name }}</option>
      </select>
        </div>
        <div class="modal-footer">
          <SecondaryButton @click="closeAddNewModal">Cancel</SecondaryButton>
          <DangerButton class="ms-3" @click="saveNewContact">Save</DangerButton>
        </div>
      </div>
    </Modal>

  </div>
</template>

<style scoped>
/* Add component-specific styles here if needed */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
}

/* Add styling for modals */
.modal {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
}

.modal-header {
  background-color: #f0f0f0;
  padding: 12px;
  text-align: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 12px;
  text-align: right;
}

/* Add styling for form inputs */
label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}
</style>
