
// Función para abrir el modal
function openModal() {
        document.getElementById('modal').style.display = 'block';
    }

// Función para cerrar el modal
    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }

    // Cerrar el modal si se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == document.getElementById('modal')) {
            closeModal();
        }
    }
    
    

