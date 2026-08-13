export const baseResponse = <T = unknown>(
  data: T,
  code?: number,
  success: boolean = true,
  msg?: string,
) => ({
  code: code ?? 0,
  success,
  msg: msg ?? 'success',
  data,
});
