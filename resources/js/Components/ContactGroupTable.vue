<script>
import {ref, onMounted} from 'vue';
import DangerButton from './DangerButton.vue';
import SecondaryButton from './SecondaryButton.vue';
import PrimaryButton from './PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import useContactGroups from './composable/contactGroups';
import ResponsiveNavLink from './ResponsiveNavLink.vue';

import {useRoute} from 'vue-router';

export default {
    setup() {
        const {
            contactGroups,
            getContactGroups,
            destroyContactGroup,
            addNewContactGroup,
            editContactGroup
        } = useContactGroups();

        onMounted(getContactGroups);

        const confirmingContactGroupDeletion = ref(false);
        const showEditGroupModal = ref(false);
        const showAddNewGroupModal = ref(false);
        const editedContactGroup = ref({id: null, name: '', description: '', noofcontacts: 0});
        const newContactGroupData = ref({name: '', description: '', noofcontacts: 0});

        const router = useRoute();

        const saveUpdatedContactGroup = async () => {
            await editContactGroup(editedContactGroup.value);
            await getContactGroups();
            showEditGroupModal.value = false;
        };

        const saveNewContactGroup = async () => {
            await addNewContactGroup(newContactGroupData.value);
            await getContactGroups();
            showAddNewGroupModal.value = false;
            newContactGroupData.value = {name: '', description: '', noofcontacts: 0};
        };

        const deleteContactGroup = (groupId) => {
            confirmingContactGroupDeletion.value = true;
            editedContactGroup.value.id = groupId;
        };

        const closeDeleteGroupModal = () => {
            confirmingContactGroupDeletion.value = false;
        };

        const closeEditGroupModal = () => {
            showEditGroupModal.value = false;
        };

        const closeAddNewGroupModal = () => {
            showAddNewGroupModal.value = false;
        };

        const confirmContactGroupDeletion = async () => {
            await destroyContactGroup(editedContactGroup.value.id);
            await getContactGroups();
            confirmingContactGroupDeletion.value = false;
        };

        const viewContactsHandler = (groupId) => {
            console.log(groupId);
            router.push({name: 'contacts', params: {id: groupId}});

        };

        const openAddNewGroupModal = () => {
            showAddNewGroupModal.value = true;
        };

        return {
            confirmingContactGroupDeletion,
            showEditGroupModal,
            showAddNewGroupModal,
            editedContactGroup,
            newContactGroupData,
            contactGroups,
            addNewContactGroup,
            saveUpdatedContactGroup,
            deleteContactGroup,
            closeDeleteGroupModal,
            closeEditGroupModal,
            confirmContactGroupDeletion,
            viewContactsHandler,
            closeAddNewGroupModal,
            openAddNewGroupModal,
            saveNewContactGroup,
        };
    },
    components: {DangerButton, SecondaryButton, Modal, PrimaryButton, ResponsiveNavLink},
};
</script>

<template>
    <div>
        <PrimaryButton @click="openAddNewGroupModal">Add New</PrimaryButton>

        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>No. of Contacts</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="contactGroup in contactGroups" :key="contactGroup.id">
                <td>{{ contactGroup.name }}</td>
                <td>{{ contactGroup.description }}</td>
                <td>{{ contactGroup.noofcontacts }}</td>
                <td>
                    <!-- <SecondaryButton @click="viewContactsHandler(contactGroup.id)">View</SecondaryButton>
                    <router-link :to="{ name: 'contacts', params: { id: contactGroup.id } }">
                      <SecondaryButton>View</SecondaryButton>
                    </router-link> -->
                    <ResponsiveNavLink href="/contacts">
                        <SecondaryButton>View</SecondaryButton>
                    </ResponsiveNavLink>

                </td>
            </tr>
            </tbody>
        </table>
        <Modal :show="showEditGroupModal" @close="closeEditGroupModal">
            <div class="modal">
                <div class="modal-header">
                    <h2>Edit Contact Group</h2>
                </div>
                <div class="modal-body">
                    <label for="editGroupName">Name:</label>
                    <input v-model="editedContactGroup.name" type="text" id="editGroupName"/>
                    <label for="editGroupDescription">Description:</label>
                    <input v-model="editedContactGroup.description" type="text" id="editGroupDescription"/>
                    <label for="editGroupNoOfContacts">No. of Contacts:</label>
                    <input v-model="editedContactGroup.noofcontacts" type="number" id="editGroupNoOfContacts"/>
                </div>
                <div class="modal-footer">
                    <SecondaryButton @click="closeEditGroupModal">Cancel</SecondaryButton>
                    <DangerButton class="ms-3" @click="saveUpdatedContactGroup">Update</DangerButton>
                </div>
            </div>
        </Modal>
        <Modal :show="showAddNewGroupModal" @close="closeAddNewGroupModal">
            <div class="modal">
                <div class="modal-header">
                    <h2>Add New Contact Group</h2>
                </div>
                <div class="modal-body">
                    <!-- Values not caught -->
                    <label for="newGroupName">Name:</label>
                    <input type="text" id="newGroupName" v-model="newContactGroupData.name"/>
                    <label for="newGroupDescription">Description:</label>
                    <input type="text" id="newGroupDescription" v-model="newContactGroupData.description"/>
                    <label for="newGroupNoOfContacts">No. of Contacts:</label>
                    <input type="number" id="newGroupNoOfContacts" v-model="newContactGroupData.noofcontacts"/>
                </div>
                <div class="modal-footer">
                    <SecondaryButton @click="closeAddNewGroupModal">Cancel</SecondaryButton>
                    <DangerButton class="ms-3" @click="saveNewContactGroup">Save</DangerButton>
                </div>
            </div>
        </Modal>

    </div>
</template>

<style scoped>

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
