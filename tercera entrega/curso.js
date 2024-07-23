let Curso = JSON.parse(localStorage.getItem('Curso')) || [];
let editarIndice = null;

document.getElementById('formAlumno').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const genero = document.getElementById('genero').value;

    if (editarIndice !== null) {
        Curso[editarIndice] = { nombre, apellido, dni, genero };
        editarIndice = null;
    } else {
        Curso.push({ nombre, apellido, dni, genero });
    }

    localStorage.setItem('Curso', JSON.stringify(Curso));
    actualizarTabla();
    this.reset();
});

function actualizarTabla() {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    Curso.forEach((alumno, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarAlumno(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

function editarAlumno(index) {
    const alumno = Curso[index];
    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('apellido').value = alumno.apellido;
    document.getElementById('dni').value = alumno.dni;
    document.getElementById('genero').value = alumno.genero;
    editarIndice = index;
}

function eliminarAlumno(index) {
    Curso.splice(index, 1);
    localStorage.setItem('Curso', JSON.stringify(Curso));
    actualizarTabla();
}

function contarAlumnos() {
    document.getElementById('totalAlumnos').innerText = `Total de alumnos: ${Curso.length}`;
}

function ordenarPor(campo) {
    Curso.sort((a, b) => a[campo].localeCompare(b[campo]));
    localStorage.setItem('Curso', JSON.stringify(Curso));
    actualizarTabla();
}

function filtrarGenero(genero) {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    Curso.filter(alumno => alumno.genero === genero).forEach((alumno, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarAlumno(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

function buscarAlumno() {
    const dni = prompt("Ingrese el DNI del alumno que desea buscar:");
    if (dni) {
        const alumno = Curso.find(a => a.dni === dni);
        if (alumno) {
            const tabla = document.getElementById('tablaAlumnos');
            tabla.innerHTML = '';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.dni}</td>
                <td>${alumno.genero}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarAlumno(${Curso.indexOf(alumno)})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(${Curso.indexOf(alumno)})">Eliminar</button>
                </td>
            `;
            tabla.appendChild(row);
        } else {
            alert("Alumno no encontrado.");
        }
    }
}

document.addEventListener('DOMContentLoaded', actualizarTabla);
