export type State = {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  state_code: string;
};

export type StateResponse = {
  list: State[];
  total: number;
};
