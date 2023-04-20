import {
  getSalesTypeList,
  getProvinceList,
} from '../property-list/property-list.api';
import { saveNewProperty } from './upload-property.api';
import {
  setCheckboxList,
  setOptionList,
  formatCheckboxId,
  onAddFeature,
  formatDeleteFeatureButtonId,
  onRemoveFeature,
  onAddImage,
} from './upload-property.helpers';
import { getEquipments } from '../property-detail/property-detail.api';
import {
  onSubmitForm,
  onUpdateField,
  onSetError,
  onSetFormErrors,
  onAddFile,
} from '../../common/helpers';
import { formPropertyValidation } from './upload-property.validations';
import { mapPropertyToApi } from './upload-property.mappers';

Promise.all([getSalesTypeList(), getProvinceList(), getEquipments()]).then(
  ([salesTypeList, provinceList, equipmentsList]) => {
    setCheckboxList(salesTypeList, 'saleTypes');
    setCheckboxList(equipmentsList, 'equipments');
    setOptionList(provinceList, 'province');
    setEvents(salesTypeList, 'saleTypeIds');
    setEvents(equipmentsList, 'equipmentIds');
  }
);

let newProperty = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypeIds: [],
  address: '',
  city: '',
  provinceId: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: [],
  equipmentIds: [],
  images: [],
};

const addElement = (element, id) => {
  newProperty = {
    ...newProperty,
    [id]: [...newProperty[id], element],
  };
};
const removeElement = (element, id) => {
  const index = newProperty[id].indexOf(element);
  newProperty[id].splice(index, 1);
};

const setEvents = (list, id) => {
  list.forEach((element) => {
    const checkedId = formatCheckboxId(element);
    onUpdateField(checkedId, (event) => {
      const value = event.target.value;
      event.target.checked ? addElement(value, id) : removeElement(value, id);
    });
  });
};

onUpdateField('title', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    title: value,
  };
  formPropertyValidation
    .validateField('title', newProperty.title)
    .then((result) => {
      onSetError('title', result);
    });
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    notes: value,
  };
  formPropertyValidation
    .validateField('notes', newProperty.notes)
    .then((result) => {
      onSetError('notes', result);
    });
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    email: value,
  };
  formPropertyValidation
    .validateField('email', newProperty.email)
    .then((result) => {
      onSetError('email', result);
    });
});

onUpdateField('price', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    price: value,
  };
  formPropertyValidation
    .validateField('price', newProperty.price)
    .then((result) => {
      onSetError('price', result);
    });
});

onUpdateField('phone', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    phone: value,
  };
  formPropertyValidation
    .validateField('phone', newProperty.phone)
    .then((result) => {
      onSetError('phone', result);
    });
});

onUpdateField('address', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    address: value,
  };
  formPropertyValidation
    .validateField('address', newProperty.address)
    .then((result) => {
      onSetError('address', result);
    });
});

onUpdateField('city', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    city: value,
  };
  formPropertyValidation
    .validateField('city', newProperty.city)
    .then((result) => {
      onSetError('city', result);
    });
});

onUpdateField('province', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    provinceId: value,
  };
  formPropertyValidation
    .validateField('province', newProperty.provinceId)
    .then((result) => {
      onSetError('province', result);
    });
});

onUpdateField('squareMeter', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    squareMeter: value,
  };
  formPropertyValidation
    .validateField('squareMeter', newProperty.squareMeter)
    .then((result) => {
      onSetError('squareMeter', result);
    });
});

onUpdateField('rooms', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    rooms: value,
  };
  formPropertyValidation
    .validateField('rooms', newProperty.rooms)
    .then((result) => {
      onSetError('rooms', result);
    });
});

onUpdateField('bathrooms', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    bathrooms: value,
  };
  formPropertyValidation
    .validateField('bathrooms', newProperty.bathrooms)
    .then((result) => {
      onSetError('bathrooms', result);
    });
});

onUpdateField('locationUrl', (event) => {
  const value = event.target.value;
  newProperty = {
    ...newProperty,
    locationUrl: value,
  };
  formPropertyValidation
    .validateField('locationUrl', newProperty.locationUrl)
    .then((result) => {
      onSetError('locationUrl', result);
    });
});

onSubmitForm('insert-feature-button', () => {
  const value = document.getElementById('newFeature').value;
  if (value) {
    newProperty = {
      ...newProperty,
      mainFeatures: [...newProperty.mainFeatures, value],
    };
    onAddFeature(value);
    const deleteFeature = formatDeleteFeatureButtonId(value);
    onSubmitForm(deleteFeature, () => {
      onRemoveFeature(value);
      removeElement(value, 'mainFeatures');
    });
  }
});

onAddFile('add-image', (images) => {
  newProperty = {
    ...newProperty,
    images: [...newProperty.images, images],
  };
  onAddImage(images);
});

onSubmitForm('save-button', () => {
  formPropertyValidation.validateForm(newProperty).then((result) => {
    console.log(result);
    onSetFormErrors(result);
    const apiNewProperty = mapPropertyToApi(newProperty);
    console.log(apiNewProperty);

    if (result.succeeded) {
      saveNewProperty(apiNewProperty).then(() => {
        history.back();
      });
    }
  });
});

//   const apiNewProperty = mapPropertyToApi(newProperty);
//   console.log(apiNewProperty);
//   saveNewProperty(newProperty).then(() => {
//     history.back;
//   });
// });
