var video = document.getElementById("video");
var playButton = document.getElementById("play-button");
var playVideo = document.getElementById("play-video");

function playMainVideo() {
  video.play();
  playButton.style.display = "none";
}

playButton.addEventListener("click", function() {
  playMainVideo();
});

video.addEventListener("pause", function() {
  playButton.style.display = "block";
});

video.addEventListener("ended", function() {
  playButton.style.display = "block";
});


// Obtener el slider y las diapositivas
const slider = document.querySelector('.slider');
const sliderTrack = document.querySelector('.slider-track');

// Clonar las diapositivas y añadir al final
const slides = sliderTrack.querySelectorAll('.slide');
slides.forEach((slide) => {
  const cloneSlide = slide.cloneNode(true);
  sliderTrack.appendChild(cloneSlide);
});

// Ajustar el ancho del slider-track para acomodar las diapositivas clonadas
const slideWidth = slides[0].offsetWidth;
const slideCount = slides.length;
sliderTrack.style.width = `${slideWidth * slideCount}px`;

function downloadFile() {
  // Realizar la redirección después de un breve retraso (por ejemplo, 1 segundo)
  setTimeout(function() {
    window.location.href = "http://127.0.0.1:3002/index.html"; // Reemplaza "ruta/a/home" con la ubicación de tu pantalla de inicio
  }, 1000); // Retraso de 1 segundo (1000 milisegundos) antes de redirigir
}


function descargarArchivo() {
  // URL del archivo ZIP
  var archivoURL = "LUCAS.zip";

  // Crear un elemento <a> oculto para iniciar la descarga
  var link = document.createElement("a");
  link.href = archivoURL;
  link.download = "LUCAS.zip"; // Nombre del archivo descargado

  // Simular el clic en el enlace para iniciar la descarga
  link.click();
}



