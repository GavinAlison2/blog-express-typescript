type ResponseVO = {
  code: number;
  success: boolean;
  message: string;
  data: any;
  total: number;
};

export function ok(data: any, total: number = 0): ResponseVO {
  return {
    code: 200,
    success: true,
    message: "OK",
    data,
    total,
  };
}
export function fail(message: string): ResponseVO {
  return {
    code: 500,
    success: false,
    message,
    data: null,
    total: 0,
  };
}
export function errorWithCode(code: number, message: string): ResponseVO {
  return {
    code,
    success: false,
    message,
    data: null,
    total: 0,
  };
}
const ResponseUtils = {
  ok,
  fail,
  errorWithCode,
};
export default ResponseUtils;
