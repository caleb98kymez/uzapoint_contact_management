import { ref } from "vue";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api/contacts";

export default function useContacts() {
    const contacts = ref([]);

    const getContacts = async () => {
        try {
            const response = await axios.get(apiUrl);
            contacts.value = response.data.data;
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const destroyContact = async (contactId) => {
        try {
            await axios.delete(`${apiUrl}/${contactId}`);
            // Assuming the API call is successful, update the contacts list
            await getContacts();
        } catch (error) {
            console.error(
                `Error deleting contact with ID ${contactId}:`,
                error
            );
        }
    };

    const addNewContact = async (newContact) => {
        try {
            // Assuming the API expects the new contact data in the request body
            await axios.post(apiUrl, newContact);
            // Assuming the API call is successful, update the contacts list
            await getContacts();
        } catch (error) {
            console.error("Error adding new contact:", error);
        }
    };

    const editContact = async (editedContact) => {
        try {
            // Assuming the API expects the edited contact data in the request body
            await axios.put(`${apiUrl}/${editedContact.id}`, editedContact);
            // Assuming the API call is successful, update the contacts list
            await getContacts();
        } catch (error) {
            console.error("Error editing contact:", error);
        }
    };

    return {
        contacts,
        getContacts,
        destroyContact,
        addNewContact,
        editContact,
    };
}
