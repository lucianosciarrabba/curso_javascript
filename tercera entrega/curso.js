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

document.getElementById('actualizarTablaBtn').addEventListener('click', actualizarTabla);
document.getElementById('contarAlumnosBtn').addEventListener('click', contarAlumnos);
document.getElementById('buscarPorDniBtn').addEventListener('click', function() {
    const dni = prompt('Ingrese el DNI del alumno que desea buscar:');
    if (dni) {
        filtrarPorDni(dni);
    }
});

document.querySelectorAll('.dropdown-item[data-filtro]').forEach(item => {
    item.addEventListener('click', function() {
        const filtro = this.getAttribute('data-filtro');
        ordenarPor(filtro);
    });
});

document.querySelectorAll('.dropdown-item[data-genero]').forEach(item => {
    item.addEventListener('click', function() {
        const genero = this.getAttribute('data-genero');
        filtrarGenero(genero);
    });
});

document.getElementById('mostrarTodos').addEventListener('click', actualizarTabla);

function actualizarTabla() {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    curso.forEach((alumno, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-btn" data-id="${alumno.id}">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${alumno.id}">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });

    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            editarAlumno(id);
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            if (confirm('¿Estás seguro de que quieres borrar el alumno?')) {
                eliminarAlumno(id);
            }
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
    curso = curso.filter(alumno => alumno.id !== id);
    localStorage.setItem('curso', JSON.stringify(curso));
    actualizarTabla();
}

function contarAlumnos() {
    alert(`Total de alumnos: ${curso.length}`);
}

function ordenarPor(filtro) {
    curso.sort((a, b) => {
        if (a[filtro] < b[filtro]) {
            return -1;
        } else if (a[filtro] > b[filtro]) {
            return 1;
        } else {
            return 0;
        }
    });
    actualizarTabla();
}

function filtrarGenero(genero) {
    const alumnosFiltrados = curso.filter(alumno => alumno.genero === genero);
    mostrarAlumnos(alumnosFiltrados);
}

function filtrarPorDni(dni) {
    const alumnoFiltrado = curso.filter(alumno => alumno.dni === dni);
    mostrarAlumnos(alumnoFiltrado);
}

function mostrarAlumnos(alumnos) {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-btn" data-id="${alumno.id}">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${alumno.id}">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });

    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            editarAlumno(id);
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            if (confirm('¿Estás seguro de que quieres borrar el alumno?')) {
                eliminarAlumno(id);
            }
        });
    });
}

// Inicializar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', actualizarTabla);
