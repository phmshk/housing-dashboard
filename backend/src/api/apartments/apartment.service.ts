import Apartment, { ApartmentStatus } from "./apartment.model";

async function createNewApartment(
  title: string,
  link: string,
  price: string,
  status: ApartmentStatus,
  userId: unknown
) {
  const newApartment = await Apartment.create(
    title,
    link,
    price,
    status,
    userId
  );
  return newApartment;
}

export { createNewApartment };
