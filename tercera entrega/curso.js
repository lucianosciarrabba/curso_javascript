let curso = JSON.parse(localStorage.getItem('curso')) || [];
let editarIndice = null;

document.getElementById('formAlumno').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const genero = document.getElementById('genero').value;

    if (editarIndice !== null) {
        curso[editarIndice] = { id: curso[editarIndice].id, nombre, apellido, dni, genero };
        editarIndice = null;
    } else {
        const id = Date.now(); // Unique ID based on timestamp
        curso.push({ id, nombre, apellido, dni, genero });
    }

    localStorage.setItem('curso', JSON.stringify(curso));
    actualizarTabla();
    this.reset();
});

function buscarAlumno() {
    Swal.fire({
        title: 'Buscar Alumno',
        input: 'text',
        inputPlaceholder: 'Ingrese el DNI del alumno',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return '¡Por favor ingrese un DNI!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const dni = result.value;
            filtrarPorDni(dni);
        }
    });
}

function actualizarTabla() {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    curso.forEach((alumno) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-btn">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);

        // Agregar eventos a los botones después de que se crean
        row.querySelector('.editar-btn').addEventListener('click', function() {
            editarAlumno(alumno.id);
        });

        row.querySelector('.eliminar-btn').addEventListener('click', function() {
            eliminarAlumno(alumno.id);
        });
    });

    document.getElementById('totalAlumnos').textContent = `Total de alumnos: ${curso.length}`;
}

function editarAlumno(id) {
    const alumno = curso.find(alumno => alumno.id === id);
    if (alumno) {
        document.getElementById('nombre').value = alumno.nombre;
        document.getElementById('apellido').value = alumno.apellido;
        document.getElementById('dni').value = alumno.dni;
        document.getElementById('genero').value = alumno.genero;
        editarIndice = curso.findIndex(alumno => alumno.id === id);
    }
}

function eliminarAlumno(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            curso = curso.filter(alumno => alumno.id !== id);
            localStorage.setItem('curso', JSON.stringify(curso));
            actualizarTabla();
            Swal.fire('¡Eliminado!', 'El alumno ha sido eliminado.', 'success');
        }
    });
}

function contarAlumnos() {
    Swal.fire(`Total de alumnos: ${curso.length}`);
}

function filtrarPorDni(dni) {
    const alumno = curso.find(alumno => alumno.dni === dni);
    if (alumno) {
        Swal.fire({
            title: 'Alumno encontrado',
            text: `Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}, Género: ${alumno.genero}`,
            icon: 'info'
        });
    } else {
        Swal.fire({
            title: 'No encontrado',
            text: 'No se encontró ningún alumno con ese DNI.',
            icon: 'error'
        });
    }
}

function ordenarPor(propiedad) {
    curso.sort((a, b) => a[propiedad].localeCompare(b[propiedad]));
    actualizarTabla();
}

function filtrarGenero(genero) {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    const resultados = curso.filter(alumno => alumno.genero === genero);
    resultados.forEach(alumno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-btn">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);

        // Agregar eventos a los botones después de que se crean
        row.querySelector('.editar-btn').addEventListener('click', function() {
            editarAlumno(alumno.id);
        });

        row.querySelector('.eliminar-btn').addEventListener('click', function() {
            eliminarAlumno(alumno.id);
        });
    });
}

// Inicializar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', actualizarTabla);