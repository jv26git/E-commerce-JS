
let productos = [];

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  mostrarCarrito();
});

const vaciarCarrito = document.querySelector('#vaciarCarrito');
const compra = document.querySelector('#comprar');

function cargarProductos() {
  fetch("./data/productos.json")
    .then(response => response.json())
    .then(data => {
      productos = data;
      const catalogoElement = document.getElementById('catalogo');
      catalogoElement.innerHTML = ''; 

      productos.forEach(producto => {
        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('card');

        const imagen = document.createElement('img');
        imagen.classList.add('card-img-top');
        imagen.src = producto.imagen;
        imagen.alt = producto.titulo;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const titulo = document.createElement('h5');
        titulo.classList.add('card-title');
        titulo.textContent = producto.titulo;

        const precio = document.createElement('p');
        precio.classList.add('card-text');
        precio.textContent = `$${producto.precio}`;

        const botonAgregar = document.createElement('button');
        botonAgregar.classList.add('btn', 'btn-secondary');
        botonAgregar.textContent = 'Agregar';
        botonAgregar.addEventListener('click', function () {
          agregarAlCarrito(producto.id);
          Toastify({
            text: "Producto agregado.",
            duration: 2000,
            close: false,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#FF2800",
              color: "#000000",
              borderRadius: ".77rem",
              fontSize: "1rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
            },
            offset: {
              x: '1.5rem',
              y: '1rem'
            },
            onClick: function () { }
          }).showToast();

        });

        cardBody.appendChild(titulo);
        cardBody.appendChild(precio);
        cardBody.appendChild(botonAgregar);

        contenedorProducto.appendChild(imagen);
        contenedorProducto.appendChild(cardBody);

        catalogoElement.appendChild(contenedorProducto);
      });
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });
}

function agregarAlCarrito(id) {
  const producto = productos.find((producto) => producto.id === id);

  const carrito = obtenerCarrito();
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      titulo: producto.titulo,
      imagen: producto.imagen,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  mostrarCarrito();
}

function eliminarProducto(id) {
  const carrito = obtenerCarrito();
  const carritoFiltrado = carrito.filter((producto) => producto.id !== id);
  guardarCarrito(carritoFiltrado);
  mostrarCarrito();

  Toastify({
    text: "Producto eliminado.",
    duration: 2000,
    close: false,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#FF2800",
      color: "#000000",
      borderRadius: ".77rem",
      fontSize: "1rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
    },
    offset: {
      x: '10rem',
      y: '1rem'
    },
    onClick: function () { }
  }).showToast();
}

const mostrarCarrito = () => {
  const modalContenido = document.getElementById('modal-contenido');
  const carrito = obtenerCarrito();

  modalContenido.innerHTML = carrito.length === 0
    ? '<p class="text-center  parrafo">Carrito Vacío</p>'
    : '';

  modalContenido.innerHTML = ''; 

  carrito.forEach((prod) => {
    const { id, titulo, imagen, precio, cantidad } = prod;
    const productoElement = document.createElement('div');
    productoElement.classList.add('modal-contenedor');
    productoElement.dataset.id = id;
    productoElement.innerHTML = `
      <div>
        <h4>${titulo}</h4>
        <img src="${imagen}" alt="${titulo}" class="imagen-carrito" />
        <p>Precio: ${precio}</p>
        <p>Cantidad: <span class="cantidad">${cantidad}</span></p>
        <button class="btn btn-eliminar">Eliminar Producto</button>
      </div>
    `;
    modalContenido.appendChild(productoElement);
  });

  const botonesEliminar = document.querySelectorAll('.btn-eliminar');

  botonesEliminar.forEach((boton) => {
    const id = boton.parentNode.parentNode.dataset.id;
    boton.addEventListener('click', () => eliminarProducto(id));
  });
};

function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', function () {
  const carritoElement = document.getElementById("carrito");
  const modalElement = document.getElementById('modal');

  
  carritoElement.addEventListener("click", function () {
    modalElement.style.display = 'block';
  });

  
  const closeModalButton = modalElement.querySelector('.btn-close');
  closeModalButton.addEventListener('click', function () {
    modalElement.style.display = 'none';
  });

  
  modalElement.addEventListener('transitionend', function (e) {
    if (e.propertyName === 'opacity' && !this.classList.contains('show')) {
      modalElement.style.display = 'none';
    }
  });
});

const botonVaciarCarrito = document.querySelector('#vaciarCarrito');
botonVaciarCarrito.addEventListener('click', function () {
  const carrito = obtenerCarrito();
  if (carrito.length > 0) {
    guardarCarrito([]);
    mostrarCarrito();
    Toastify({
      text: "Carrito eliminado.",
      duration: 2000,
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#FF2800",
        color: "#000000",
        borderRadius: ".77rem",
        fontSize: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
      },
      offset: {
        x: '10rem',
        y: '1rem'
      },
      onClick: function () { }
    }).showToast();
  }
});

const realizarCompra = document.querySelector('#comprar');
realizarCompra.addEventListener('click', function () {
  const carrito = obtenerCarrito();
  if (carrito.length > 0) {
    guardarCarrito([]);
    mostrarCarrito();
    Toastify({
      text: "Compra realizada.",
      duration: 2000,
      close: false,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "#FF2800",
        color: "#000000",
        borderRadius: ".77rem",
        fontSize: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
      },
      offset: {
        x: '1.5rem',
        y: '1rem'
      },
      onClick: function () { }
    }).showToast();
  }
});

