export const mapPropertyToApi = (property) => {
  return {
    title: property.title,
    notes: property.notes,
    email: property.email,
    phone: property.phone,
    price: parseInt(property.price),
    saleTypeIds: property.saleTypeIds,
    address: property.address,
    city: property.city,
    provinceId: property.provinceId,
    squareMeter: parseInt(property.squareMeter),
    rooms: parseInt(property.rooms),
    bathrooms: parseInt(property.bathrooms),
    locationUrl: property.locationUrl,
    mainFeatures: property.mainFeatures,
    equipmentIds: property.equipmentIds,
    images: property.images,
  };
};
