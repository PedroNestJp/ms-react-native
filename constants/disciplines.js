export const PORTUGUESE_ID = 1;
export const MATH_ID = 2;
export const PORTUGUESE = "Língua Portuguesa";
export const MATH = "Matemática";

export const getDisciplineTitle = (disciplineId) => {
  return disciplineId == PORTUGUESE_ID ? PORTUGUESE : MATH;
}