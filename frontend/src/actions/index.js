import axios from 'axios';

/* Define Action Types */
export const NEW_PERSONNEL_ENTRY = 'NEW_PERSONNEL_ENTRY';
export const PERSONNEL_LIST = 'PERSONNEL_LIST';
export const UPDATE_PERSONNEL_ENTRY = 'UPDATE_PERSONNEL_ENTRY';
export const DELETE_PERSONNEL_ENTRY = 'DELETE_PERSONNEL_ENTRY';
export const PERSONNEL_LIST_BY_ID = 'PERSONNEL_LIST_BY_ID';
export const PERSONNEL_SUPERIOR_BY_ID = 'PERSONNEL_SUPERIOR_BY_ID';

/* Create a Soldier */
export function newSoldierEntry(fields) {
   const request = axios.post('/create', fields);
   console.log("Entro  crear usuariooooooooooooooooooooooooooooo")
   return {
      type: NEW_PERSONNEL_ENTRY,
      payload: request
   }
}

/* Personnel soldiers */
export function soldierList() {
   const request = axios.get('/read');
   return {
      type: PERSONNEL_LIST,
      payload: request
   }
}

/* Retrieve all soldiers */
export function soldierSuperiorList(idSuperior) {
   console.log("superiorrrrrrrrrrrrrrrrrrrrrrrrrrv action" + idSuperior);
   const request = axios.get('/readbysuperior/', { params: { id: idSuperior } });
   return {
      type: PERSONNEL_LIST_BY_ID,
      payload: request
   }
}

/* Retrieve a single record by  id */
export function soldierListById(id) {
   const request = axios.get('/readbyid/', { params: { id: id } });
   return {
      type: PERSONNEL_LIST_BY_ID,
      payload: request
   }
}

/* Update Soldier information */
export function updateSoldierEntry(fields) {
   const request = axios.put('/update', fields);
   return {
      type: UPDATE_PERSONNEL_ENTRY,
      payload: request
   }
}

/* Delete soldier by id */
export function deleteSoldierEntry(entryid) {
   const request = axios.delete('/delete', { params: { entryid: entryid } });
   return {
      type: DELETE_PERSONNEL_ENTRY,
      payload: request
   }
}