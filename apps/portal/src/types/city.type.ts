export type City = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
};

export type CityResponse = {
  list: City[];
  total: number;
};
