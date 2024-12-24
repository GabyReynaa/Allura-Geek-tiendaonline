const API="http://localhost:3000/productos"
// Función para agregar un producto
async function agregarProducto(producto) {

try{
    const conexion = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });

    if (!conexion.ok) {
        throw new Error('Error al agregar el producto. El servidor respondió con un error.');
    }

    const nuevoProducto = await conexion.json();
    return nuevoProducto;

} catch (error) {
    console.error("Error en la conexión:", error);
    throw new Error('Hubo un problema al agregar el producto.');
 }
}

// Función para listar productos
async function listarProductos() {
    try {
        const respuesta = await fetch(API);

        // Verificar si la respuesta del servidor es exitosa
        if (!respuesta.ok) {
            throw new Error('Error al obtener los productos. El servidor respondió con un error.');
        }

        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        // Manejo de errores
        console.error("Error en la conexión:", error);
        throw new Error('Hubo un problema al listar los productos.');
    }
}

// Exportar las funciones necesarias
export { agregarProducto, listarProductos };