import { getRoomWord } from '../property-list/property-list.mappers';

export const mapPropertyToViewModel = (property, equipmentsList) => {
  return {
    mainImage: property.images[0],
    price: `${property.price.toLocaleString()} €`,
    title: property.title,
    city: property.city,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    squareMeter: `${property.squareMeter}m²`,
    bathrooms: `${property.bathrooms} ${bathroomsPlural(property.bathrooms)}`,
    notes: property.notes,
    mainFeatures: property.mainFeatures,
    equipments: equipmentName(property.equipmentIds, equipmentsList),
    locationUrl: property.locationUrl,
    images: property.images,
  };
};

const bathroomsPlural = (bathrooms) => {
  return bathrooms > 1 ? 'baños' : 'baño';
};

 export const equipmentName = (equipmentIds, equipmentsList) => {
  return equipmentIds.map(
    (equipmentId) =>
      equipmentsList.find((equipment) => equipmentId === equipment.id).name
  );
};
