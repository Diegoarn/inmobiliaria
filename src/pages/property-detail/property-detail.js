import { history } from '../../core/router/history';
import { setPropertyValues } from './property-detail.helpers';
import { mapPropertyToViewModel } from './property-detail.mappers';
import { getDetail, getEquipments, saveContact } from './property-detail.api';
import { formValidation } from './property-detail.validations';
import {
  onSubmitForm,
  onUpdateField,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';

let propertyDetail = {
  id: '',
  title: '',
  notes: '',
  price: '',
  city: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: '',
  equipments: '',
  mainImage: '',
  images: '',
};

let contact = {
  email: '',
  message: '',
};

const params = history.getParams();
const isEditMode = Boolean(params.id);

if (isEditMode) {
  Promise.all([getDetail(params.id), getEquipments()]).then(
    ([property, equipmentsList]) => {
      propertyDetail = mapPropertyToViewModel(property, equipmentsList);
      setPropertyValues(propertyDetail);
    }
  );
}

onUpdateField('email', (event) => {
  const value = event.target.value;
  contact = { ...contact, email: value };
  formValidation.validateField('email', contact.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('message', (event) => {
  const value = event.target.value;
  contact = { ...contact, message: value };
});

onSubmitForm('contact-button', () => {
  console.log(contact);
  formValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      saveContact(contact).then(() => {
        history.back();
      });
    }
  });
});
