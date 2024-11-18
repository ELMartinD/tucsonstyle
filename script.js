// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar todos los botones de "Comprar"
  const botonesComprar = document.querySelectorAll('.btn-comprar');

  // Elementos del carrito
  const carritoLista = document.getElementById('carrito-lista');
  const carritoVentana = document.getElementById('carrito');
  const btnVaciarCarrito = document.getElementById('vaciar-carrito');
  const btnCerrarCarrito = document.getElementById('cerrar-carrito');
  const btnCarrito = document.querySelector('.btn-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const btnIniciarCompra = document.getElementById('iniciar-compra');

  let carrito = []; // Arreglo para almacenar los productos del carrito

  // Función para abrir y cerrar el carrito
  btnCarrito.addEventListener('click', () => {
    carritoVentana.classList.toggle('active');
  });

  btnCerrarCarrito.addEventListener('click', () => {
    carritoVentana.classList.remove('active');
  });

  // Función para agregar un producto al carrito desde el HTML
  function agregarAlCarrito(event) {
    const producto = event.target.closest('.ropas'); // Encuentra el contenedor del producto
    const nombre = producto.querySelector('.producto-nombre').textContent; // Nombre del producto
    const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', '').replace('.', '').trim()); // Precio del producto
    const imagenSrc = producto.querySelector('.ropaimg img').src; // Imagen del producto

    if (isNaN(precio)) {
      console.error(`Error: El precio del producto "${nombre}" no es un número válido.`);
      return;
    }

    // Crear el elemento para el carrito
    const item = document.createElement('li');
    item.classList.add('carrito-item');

    const precioFormateado = `$${precio.toLocaleString()}`;

    item.innerHTML = `
      <img style="width: 110px; height:70px; object-fit: cover;" src="${imagenSrc}" alt="${nombre}">
      <div>
        <h4>${nombre}</h4>
        <p>${precioFormateado}</p>
      </div>
      <button class="btn-eliminar">Eliminar</button>
    `;

    carritoLista.appendChild(item);
    carrito.push({ nombre, precio, imagenSrc, item });

    // Evento para eliminar el producto del carrito
    item.querySelector('.btn-eliminar').addEventListener('click', (event) => {
      event.stopPropagation();
      item.remove();
      carrito = carrito.filter(p => p.item !== item);
      actualizarTotal();
    });

    // Abrir el carrito automáticamente
    carritoVentana.classList.add('active');

    // Actualizar el total
    actualizarTotal();
  }

  // Asignar el evento de agregar al carrito a todos los botones de compra
  botonesComprar.forEach((boton) => {
    boton.addEventListener('click', (event) => {
      agregarAlCarrito(event);
    });
  });

  // Vaciar el carrito
  btnVaciarCarrito.addEventListener('click', () => {
    carritoLista.innerHTML = '';
    carrito = [];
    actualizarTotal();
  });

  // Función para actualizar el total
  function actualizarTotal() {
    const total = carrito.reduce((sum, producto) => {
      const precio = parseFloat(producto.precio);
      return isNaN(precio) ? sum : sum + precio;
    }, 0);

    totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
    btnIniciarCompra.style.display = carrito.length > 0 ? 'block' : 'none';
  }

  // Función para redirigir al pago
  btnIniciarCompra.addEventListener('click', () => {
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    const urlPago = `https://link.mercadopago.com.ar/tuquisito`;
    window.location.href = urlPago;
  });

  // Cerrar el carrito automáticamente al hacer clic fuera
  window.addEventListener('click', (event) => {
    if (!carritoVentana.contains(event.target) && !btnCarrito.contains(event.target) && !event.target.closest('.btn-comprar')) {
      carritoVentana.classList.remove('active');
    }
  });
});


































