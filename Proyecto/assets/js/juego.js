// Obtener el parámetro de la URL
const params = new URLSearchParams(window.location.search);
const valor = params.get("valor");

console.log(valor);
if (valor === "cap1") {
  console.log("Entro al capitulo 1");
} else if (valor === "cap2") {
  console.log("Entro al capitulo 2");
} else  if (valor === "cap3") {
  console.log("Entro al capitulo 3");
} else if (valor === "cap4") {
  console.log("Entro al capitulo 4");
} else if (valor === "cap5") {
  console.log("Entro al capitulo 5");
}