import { ref } from "vue";
import axios from "axios";

const apiGroupsUrl = "http://127.0.0.1:8000/api/contactgroups";

export default function useContactGroups() {
    const contactGroups = ref([]);

    const getContactGroups = async () => {
        try {
            const response = await axios.get(apiGroupsUrl);
            console.log(response.data);
            contactGroups.value = response.data;
        } catch (error) {
            console.error("Error fetching contact groups:", error);
        }
    };

    const destroyContactGroup = async (groupId) => {
        try {
            await axios.delete(`${apiGroupsUrl}/${groupId}`);
            await getContactGroups();
        } catch (error) {
            console.error(
                `Error deleting contact group with ID ${groupId}:`,
                error
            );
        }
    };

    const addNewContactGroup = async (newContactGroup) => {
        try {
            await axios.post(apiGroupsUrl, newContactGroup);
            await getContactGroups();
        } catch (error) {
            console.error("Error adding new contact group:", error);
        }
    };

    const editContactGroup = async (editedContactGroup) => {
        try {
            await axios.put(
                `${apiGroupsUrl}/${editedContactGroup.id}`,
                editedContactGroup
            );
            await getContactGroups();
        } catch (error) {
            console.error("Error editing contact group:", error);
        }
    };

    return {
        contactGroups,
        getContactGroups,
        destroyContactGroup,
        addNewContactGroup,
        editContactGroup,
    };
}
