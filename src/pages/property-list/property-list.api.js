import Axios from 'axios';
const propertyListUrl = `${process.env.BASE_API_URL}/properties?`;

export const getPropertyList = (queryParams) =>
  Axios.get(`${propertyListUrl}${queryParams}`).then(({ data }) => data);

const saleTypeListUrl = `${process.env.BASE_API_URL}/saleTypes`;

export const getSalesTypeList = () =>
  Axios.get(saleTypeListUrl).then((response) => {
    return response.data;
  });

const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;

export const getProvinceList = () =>
  Axios.get(provinceListUrl).then((response) => {
    return response.data;
  });
