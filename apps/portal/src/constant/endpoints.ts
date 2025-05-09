export const ENDPOINTS = {
  countries: '/countries',
  states: (countryCode: string) => `/states?country=${countryCode}`,
  cities: (countryCode: string, stateCode: string) =>
    `/cities?country=${countryCode}&state=${stateCode}`,
};
