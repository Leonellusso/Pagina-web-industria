// Lógica personalizada en JavaScript

// Función para agregar productos al carrito y mostrar la notificación
function agregarAlCarrito(event) {
    event.preventDefault();
    
    // Obtener el elemento del botón y su texto
    const button = event.target;
    const buttonText = button.innerText;
  
    // Cambiar el texto del botón a "Agregando..."
    button.innerText="Agregando...";
  
    // Deshabilitar el botón mientras se agrega el producto
    button.disabled = true;
  
    // Simular una llamada a una API o una operación asíncrona para agregar el producto
    setTimeout(function() {
      // Restaurar el texto del botón original
      button.innerText = buttonText;
  
      // Habilitar el botón nuevamente
      button.disabled = false;
  
      // Mostrar la notificación de producto agregado al carrito
      mostrarNotificacion();
    }, 1500);
  }
  
  // Función para mostrar la notificación de producto agregado al carrito
  function mostrarNotificacion() {
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartNotification = document.querySelector('.cart-notification');
  
    // Mostrar la capa de superposición y la notificación
    cartOverlay.style.display = 'flex';
    cartNotification.style.display = 'block';
  
    // Ocultar la notificación después de 3 segundos
    setTimeout(function() {
      cartOverlay.style.display = 'none';
      cartNotification.style.display = 'none';
    }, 3000);
  }


  // Esperar a que se cargue completamente la página
window.addEventListener('load', function() {
    // Obtener el elemento del preloader
    var preloader = document.querySelector('.preloader');
    // Obtener el elemento del contenido de la página
    var content = document.getElementById('content');
  
    // Ocultar el preloader y mostrar el contenido de la página después de un tiempo de retardo
    setTimeout(function() {
      preloader.style.display = 'none';
      content.classList.remove('hidden');
    }, 2000); // Cambia el tiempo de retardo según tus necesidades
  });


  window.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = carousel.querySelectorAll('li');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselWidth = carouselContainer.offsetWidth;
  
    let currentPosition = 0;
    let scrollAmount = 0;
  
    function scrollCarousel() {
      currentPosition -= 1;
      scrollAmount += 1;
      carousel.style.transform = `translateX(${currentPosition}px)`;
  
      if (scrollAmount >= carouselItems[0].offsetWidth) {
        currentPosition += scrollAmount;
        scrollAmount = 0;
        carousel.appendChild(carouselItems[0]);
      }
  
      requestAnimationFrame(scrollCarousel);
    }
  
    function startCarousel() {
      requestAnimationFrame(scrollCarousel);
    }
  
    startCarousel();
  });