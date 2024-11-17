// Seleccionar los botones de "Comprar"
const botonesComprar = document.querySelectorAll('.btn-comprar');

// Elementos del carrito
const carritoLista = document.getElementById('carrito-lista');
const carritoVentana = document.getElementById('carrito');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-carrito');
const btnCarrito = document.querySelector('.btn-carrito'); // Este es el botón del carrito que abre y cierra la ventana
const totalCarrito = document.getElementById('total-carrito'); // Para mostrar el total
const btnIniciarCompra = document.getElementById('iniciar-compra'); // Botón de iniciar compra

let carrito = []; // Arreglo para almacenar los productos del carrito

// Función para abrir y cerrar el carrito
btnCarrito.addEventListener('click', () => {
  carritoVentana.classList.toggle('active');
});

btnCerrarCarrito.addEventListener('click', () => {
  carritoVentana.classList.remove('active');
});

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
  const producto = event.target.closest('.ropas'); // Encuentra el contenedor del producto
  const nombre = producto.querySelector('.producto-nombre').textContent; // Nombre del producto
  const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', '').replace('.', '').trim()); // Precio del producto
  const imagenSrc = producto.querySelector('.ropaimg img').src; // Imagen del producto

  // Crear el elemento para el carrito
  const item = document.createElement('li');
  item.classList.add('carrito-item');
  
  // Convertir el precio al formato adecuado con el símbolo "$"
  const precioFormateado = `$${precio.toLocaleString()}`; // Agregar el símbolo "$" y formatear el precio

  item.innerHTML = `
    <img style="width: 110px; height:70px; object-fit: cover;" src="${imagenSrc}" alt="${nombre}">
    <div>
      <h4>${nombre}</h4>
      <p>${precioFormateado}</p> <!-- Aquí usamos el precio formateado con el símbolo "$" -->
    </div>
    <button class="btn-eliminar">Eliminar</button>
  `;

  // Agregar el producto al carrito
  carritoLista.appendChild(item);

  // Guardar el producto en el arreglo "carrito"
  carrito.push({ nombre, precio, imagenSrc });

  // Evento para eliminar el producto del carrito
  item.querySelector('.btn-eliminar').addEventListener('click', (event) => {
    event.stopPropagation(); // Evitar que el clic se propague al contenedor y cierre el carrito
    item.remove();
    // Eliminar producto del carrito y recalcular el total
    carrito = carrito.filter(p => p.nombre !== nombre || p.precio !== precio);
    actualizarTotal();
  });

  // Abrir el carrito automáticamente cuando se agrega un producto
  carritoVentana.classList.add('active');

  // Actualizar el total
  actualizarTotal();
}

// Asignar el evento de agregar al carrito a todos los botones de compra
botonesComprar.forEach((boton) => {
  boton.addEventListener('click', (event) => {
    agregarAlCarrito(event);
    // Abrir el carrito al hacer clic en "Comprar"
    carritoVentana.classList.add('active');
  });
});

// Vaciar el carrito
btnVaciarCarrito.addEventListener('click', () => {
  carritoLista.innerHTML = ''; // Elimina todos los productos del carrito
  carrito = []; // Vaciar el arreglo
  actualizarTotal(); // Actualizar el total
});

// Función para actualizar el total
function actualizarTotal() {
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0); // Sumar los precios
  totalCarrito.textContent = `Total: $${total.toLocaleString()}`; // Actualizar el precio en el HTML
  // Mostrar el botón de "Iniciar Compra" solo si hay productos en el carrito
  if (carrito.length > 0) {
    btnIniciarCompra.style.display = 'block';
  } else {
    btnIniciarCompra.style.display = 'none';
  }
}

// Función para redirigir al pago
btnIniciarCompra.addEventListener('click', () => {
  // Obtener el total del carrito
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0); // Sumar los precios
  const totalFormateado = total.toFixed(2); // Asegurar que el total tenga dos decimales

  // Crear la URL para Mercado Pago con el total (esto sería solo un ejemplo de cómo redirigir)
  const urlPago = `https://link.mercadopago.com.ar/tuquisito/redirect?pref_id=${totalFormateado}`;


  // Redirigir al usuario a la URL de Mercado Pago
  window.location.href = urlPago;
});

// Cerrar el carrito automáticamente al hacer clic fuera, pero no cuando se hace clic en el botón de "Comprar"
window.addEventListener('click', (event) => {
  if (!carritoVentana.contains(event.target) && !btnCarrito.contains(event.target) && !event.target.closest('.btn-comprar')) {
    carritoVentana.classList.remove('active'); // Ocultar el carrito
  }
});














