//method for not repeat any element in ARRAYS----------------------------------------------
export const notRepeatArrays = (array, objeto) => {
  return array.some(
    (elemento) => JSON.stringify(elemento) === JSON.stringify(objeto)
  );
};
