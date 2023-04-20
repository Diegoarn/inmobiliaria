import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/properties`;
const urlEquipments = `${process.env.BASE_API_URL}/equipments`;
const urlContact = `${process.env.BASE_API_URL}/contact`;

export const getDetail = (id) =>
  Axios.get(`${url}/${id}`).then(({ data }) => data);

export const getEquipments = () =>
  Axios.get(urlEquipments).then(({ data }) => data);

export const saveContact = (contact) =>
  Axios.post(urlContact, contact).then(({ data }) => data);
