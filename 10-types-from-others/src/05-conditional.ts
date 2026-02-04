//                   test (extends)   ?   true_result  :   false_result
type ApiResult<T> = T extends string ? { value: string } : { value: number };

type ValueType<T> = { value: T };
type StringResult = { value: string };
type NumberResult = { value: number };

// { value: string }
// { value: number }

type A = ApiResult<3>;
type B = ApiResult<"hello">;

type ValueHello = ValueType<"hello">;
