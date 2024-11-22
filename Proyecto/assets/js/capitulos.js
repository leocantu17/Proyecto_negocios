//Capitulo 1
document.getElementById("cap1").addEventListener("click", function (e) {
  e.preventDefault(); // Evitar que el enlace haga la redirección inmediatamente
  const valor = this.getAttribute("data-valor");

  if (valor) {
    this.href = `juego?valor=${encodeURIComponent(valor)}`;
    window.location.href = this.href;
  } else {
    alert("No se encontró el valor.");
  }
});

//Capitulo 2
document.getElementById("cap2").addEventListener("click", function (e) {
  e.preventDefault();
  const valor = this.getAttribute("data-valor");

  if (valor) {
    this.href = `juego?valor=${encodeURIComponent(valor)}`;
    window.location.href = this.href;
  } else {
    alert("No se encontró el valor.");
  }
});

//Capitulo 3
document.getElementById("cap3").addEventListener("click", function (e) {
  e.preventDefault();
  const valor = this.getAttribute("data-valor");

  if (valor) {
    this.href = `juego?valor=${encodeURIComponent(valor)}`;
    window.location.href = this.href;
  } else {
    alert("No se encontró el valor.");
  }
});

//Capitulo 4
document.getElementById("cap4").addEventListener("click", function (e) {
  e.preventDefault();
  const valor = this.getAttribute("data-valor");

  if (valor) {
    this.href = `juego?valor=${encodeURIComponent(valor)}`;
    window.location.href = this.href;
  } else {
    alert("No se encontró el valor.");
  }
});

//Capitulo 5
document.getElementById("cap5").addEventListener("click", function (e) {
  e.preventDefault();
  const valor = this.getAttribute("data-valor");

  if (valor) {
    this.href = `juego?valor=${encodeURIComponent(valor)}`;
    window.location.href = this.href;
  } else {
    alert("No se encontró el valor.");
  }
});