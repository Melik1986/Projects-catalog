import { CarProps, FilterProps } from "@types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps): Promise<CarProps[]> {
  // Формируем фильтры для CarAPI
  const { manufacturer, year, model, limit, fuel } = filters;
  const filterArr = [];
  if (manufacturer) filterArr.push({ field: "make", op: "=", val: manufacturer });
  if (model) filterArr.push({ field: "model", op: "=", val: model });
  if (year) filterArr.push({ field: "year", op: "=", val: year });
  if (fuel) filterArr.push({ field: "fuel_type", op: "=", val: fuel });

  const query = filterArr.length > 0 ? `json=${encodeURIComponent(JSON.stringify(filterArr))}` : "";
  const url = `https://carapi.app/api/trims?${query}&limit=${limit || 10}`;

  // Если нужен токен, добавьте его в .env и используйте Bearer
  // const token = process.env.CARAPI_JWT;
  // const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      // ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    // credentials: 'include',
  });
  const data = await response.json();
  // CarAPI возвращает { data: [...] }
  return data.data || [];
}

export const generateCarImageUrl = async (car: CarProps) => {
  const { make, model } = car;
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${make}%20${model}&per_page=1`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_KEY || '',
      },
    }
  );
  const data = await response.json();
  return data.photos?.[0]?.src?.medium || '/default-car.jpg';
}
