import { agregarProducto} from './conexionAPI.js';

const formulario = document.querySelector('[data-formulario]');

function agregarProductoHandler(evento) {
    evento.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Capturar los valores del formulario
    const imagen = document.querySelector('[data-imagen]').value; // URL de la imagen
    const descripcion = document.querySelector('[data-descripcion]').value;
    const precio = document.querySelector('[data-precio]').value;

    // Validación básica
    if (!imagen || !descripcion || !precio) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validar que la URL de la imagen sea correcta (opcional)
    const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regexURL.test(imagen)) {
        alert("La URL de la imagen no es válida.");
        return;
    }

    // Crear el objeto del producto
    const producto = {
        imagen: imagen,
        descripcion: descripcion,
        precio: precio
    };

    // Llamar a la función que conecta con el API usando JSON
    agregarProducto(producto)
        .then(() => {
            alert("Producto agregado exitosamente.");
            formulario.reset(); // Limpiar el formulario después de agregar

            // Emitir un evento personalizado para actualizar la lista de productos
            const eventoProductoAgregado = new Event('productoAgregado');
            window.dispatchEvent(eventoProductoAgregado);
        })
        .catch(error => {
            console.error("Error al agregar el producto:", error);
            alert("Hubo un problema al agregar el producto.");
        });
}

// Escuchar el evento de envío del formulario
formulario.addEventListener('submit', agregarProductoHandler);
