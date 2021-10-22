export const issz = (code: string) =>
  /^(000|001|002|003|300|301)\d{3}$/.test(code);
export const issh = (code: string) => /^(600|601|603|605|689)\d{3}$/.test(code);
