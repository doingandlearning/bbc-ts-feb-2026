// keyof
// in

type APIResponse<DataType> = {
  statusCode: number;
  statusText: string;
  results?: number;
  data: Array<DataType>;
};

type ApiKeys<D> = keyof APIResponse<D>;

// Partial -> it makes everything optional
type OptionalAPIResponse<DataType> = {
  //  for key in keyof APIResponse
  readonly [Key in keyof APIResponse<DataType>]-?: APIResponse<DataType>[Key];
};
