import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isUrl } from '@lemoncode/fonk-is-url-validator';

const validationsSchema = {
  field: {
    title: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    notes: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],

    email: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],

    phone: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: /^(6|7|8|9)\d{8}$/ },
        message: 'Teléfono no valido',
      },
    ],

    price: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    saleTypeIds: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    address: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    city: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    squareMeter: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    rooms: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    bathrooms: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    locationUrl: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: isUrl.validator,
        message: 'Dirección no valida',
      },
    ],
    mainFeatures: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
  },
};

export const formPropertyValidation = createFormValidation(validationsSchema);
