import { listarProductos } from "./conexionAPI.js";

const listaProductosElemento = document.querySelector('[data-listaProductos]');

/**
 * Crea una card de producto para el catálogo.
 * @param {Object} producto - Objeto con las características del producto.
 * @param {string} producto.imagen - Ruta de la imagen del producto.
 * @param {string} producto.descripcion - Descripción del producto.
 * @param {string} producto.precio - Precio del producto.
 * @returns {HTMLElement} - Retorna el elemento HTML de la card.
 */
function crearCard(producto) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col-md-4', 'mb-4');

    const imagen = producto.imagen ? producto.imagen : "/Catalogo/prote1.jpg";

    cardContainer.innerHTML = `
        <div class="card">
            <img src="${imagen}" class="card-img-top" alt="${producto.descripcion}">
            <div class="card-body">
                <h5 class="card-title">${producto.descripcion}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <a href="#" class="btn btn-primary">Ver más</a>
            </div>
        </div>
    `;
    return cardContainer;
}

/**
 * Renderiza una lista de productos en el catálogo.
 * @param {Array} productos - Lista de productos a renderizar.
 */
function renderizarProductos(productos) {
    const fragmento = document.createDocumentFragment();

    productos.forEach(producto => {
        const card = crearCard(producto);
        fragmento.appendChild(card);
    });

    listaProductosElemento.innerHTML = ""; // Limpiar el contenido anterior
    listaProductosElemento.appendChild(fragmento);
}

/**
 * Carga y renderiza los productos desde la API.
 */
async function cargarProductos() {
    try {
        const listaAPI = await listarProductos();

        if (listaAPI.length === 0) {
            listaProductosElemento.innerHTML = '<p>No hay productos disponibles.</p>';
        } else {
            renderizarProductos(listaAPI);
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        listaProductosElemento.innerHTML = '<p>Hubo un problema al cargar los productos. Inténtalo nuevamente más tarde.</p>';
    }
}

// Cargar los productos al iniciar la página
cargarProductos();

// Escuchar el evento personalizado para agregar un nuevo producto
window.addEventListener('productoAgregado', async () => {
    try {
        const listaAPI = await listarProductos();
        renderizarProductos(listaAPI); // Renderizar todos los productos nuevamente
    } catch (error) {
        console.error("Error al actualizar la lista de productos:", error);
    }
});
