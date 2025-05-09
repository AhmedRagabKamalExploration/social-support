export type Country = {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  translations: {
    fa: string;
  };
  emoji: string;
};

export type CountryResponse = {
  list: Country[];
  total: number;
};
