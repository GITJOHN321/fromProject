//method for not repeat any element in ARRAYS----------------------------------------------
export const notRepeatArrays = (array, objeto) => {
  return array.some(
    (elemento) => JSON.stringify(elemento) === JSON.stringify(objeto)
  );
};

export const formatDate = (date) => {
  if (date) {
    var data = date.split("/");
    var dia = parseInt(data[0]);
    var mes = parseInt(data[1]);
    var anio = parseInt(data[2]);

    var nombresMeses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    var nombreMes = nombresMeses[mes - 1];
    var fechaPalabras = dia + " " + nombreMes + " del " + anio;
  } else {
    fechaPalabras = date;
  }

  return fechaPalabras;
};
