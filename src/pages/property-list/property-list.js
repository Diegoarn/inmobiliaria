import {
  getPropertyList,
  getSalesTypeList,
  getProvinceList,
} from './property-list.api';
import {
  mapPropertyListFromApiToViewModel,
  mapFilterToQueryParams,
} from './property-list.mappers';
import {
  addPropertyRows,
  setOptions,
  clearPropertyRows,
} from './property-list.helpers';
import {
  roomOptions,
  bathroomOptions,
  minPriceOptions,
  maxPriceOptions,
} from './property-list.constants';
import { onUpdateField, onSubmitForm } from '../../common/helpers';

Promise.all([getPropertyList(), getSalesTypeList(), getProvinceList()]).then(
  ([propertyList, salesTypeList, provinceList]) => {
    loadPropertyList(propertyList);
    setOptions(salesTypeList, 'select-sale-type', '¿Qué venta?');
    setOptions(provinceList, 'select-province', '¿Dónde?');
    setOptions(roomOptions, 'select-room', '¿Habitaciones?');
    setOptions(bathroomOptions, 'select-bathroom', '¿Baños?');
    setOptions(minPriceOptions, 'select-min-price', 'Min (EUR)');
    setOptions(maxPriceOptions, 'select-max-price', 'Max (EUR');
  }
);

const loadPropertyList = (propertyList) => {
  const viewModelPropertyList = mapPropertyListFromApiToViewModel(propertyList);
  addPropertyRows(viewModelPropertyList);
};

let filter = {
  saleTypeId: '',
  provinceId: '',
  minRooms: '',
  minBathrooms: '',
  minPrice: '',
  maxPrice: '',
};

onUpdateField('select-sale-type', (event) => {
  const value = event.target.value;
  filter = {
    ...filter,
    saleTypeId: value,
  };
});

onUpdateField('select-province', (event) => {
  const value = event.target.value;
  filter = {
    ...filter,
    provinceId: value,
  };
});

onUpdateField('select-room', (event) => {
  const value = event.target.value;
  filter = {
    ...filter,
    minRooms: value,
  };
});

onUpdateField('select-bathroom', (event) => {
  const value = event.target.value;
  filter = {
    ...filter,
    minBathrooms: value,
  };
});

onUpdateField('select-min-price', (event) => {
  const value = event.target.value;
  filter = {
    ...filter,
    minPrice: value,
  };
});

onUpdateField('select-max-price', (event) => {
  const value = event.target.value;
  filter = {
    ...filter,
    maxPrice: value,
  };
});

onSubmitForm('search-button', () => {
  const queryParams = mapFilterToQueryParams(filter);
  clearPropertyRows();
  getPropertyList(queryParams).then((propertyList) => {
    loadPropertyList(propertyList);
  });
});