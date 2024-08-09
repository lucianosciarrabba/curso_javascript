let curso = [];
let editarIndice = null;

// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', async () => {
    await cargarDatos();
    actualizarTabla();
});

// Cargar datos desde JSONPlaceholder
async function cargarDatos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        curso = data.map(item => ({
            id: item.id,
            nombre: item.name,
            apellido: item.username,
            dni: item.address.zipcode, // Utilizo este item porque no hay DNI ni otro numero que se parezca 
            genero: item.address.suite.includes('Suite') ? 'Masculino' : 'Femenino' //Como no tienen genero utilizo la palabra 'suite' como parametro para determinarlo 
        }));
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Guardar datos en JSONPlaceholder
async function guardarDatos(alumno) {
    try {
        await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alumno),
        });
    } catch (error) {
        console.error('Error al guardar el alumno:', error);
    }
}

// Manejar el envío del formulario
document.getElementById('formAlumno').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const genero = document.getElementById('genero').value;

    if (editarIndice !== null) {
        curso[editarIndice] = { id: curso[editarIndice].id, nombre, apellido, dni, genero };
        editarIndice = null;
    } else {
        const id = curso.length + 1; // Generar ID manualmente
        const nuevoAlumno = { id, nombre, apellido, dni, genero };
        curso.push(nuevoAlumno);
        await guardarDatos(nuevoAlumno); // Guardar el nuevo alumno
    }

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

function contaralumno() {
    const total = curso.length;
    document.getElementById('totalAlumnos').innerText = `Total de alumnos: ${total}`;

    // Mostrar SweetAlert con el total de alumnos
    Swal.fire({
        title: 'Total de Alumnos',
        text: `Hay ${total} alumnos registrados.`,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
}


function actualizarTabla() {
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    curso.forEach((alumno, index) => {
        const row = tabla.insertRow();
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning" onclick="editarAlumno(${index})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarAlumno(${index})">Eliminar</button>
            </td>
        `;
    });
    contarAlumnos();
}

function editarAlumno(index) {
    const alumno = curso[index];
    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('apellido').value = alumno.apellido;
    document.getElementById('dni').value = alumno.dni;
    document.getElementById('genero').value = alumno.genero;
    editarIndice = index;
}

function eliminarAlumno(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            curso.splice(index, 1);
            actualizarTabla();
            Swal.fire('Eliminado!', 'El alumno ha sido eliminado.', 'success');
        }
    });
}

function contarAlumnos() {
    document.getElementById('totalAlumnos').innerText = `Total de alumnos: ${curso.length}`;
}

function filtrarPorDni(dni) {
    const resultado = curso.filter(alumno => alumno.dni.includes(dni));
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    resultado.forEach((alumno, index) => {
        const row = tabla.insertRow();
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning" onclick="editarAlumno(${index})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarAlumno(${index})">Eliminar</button>
            </td>
        `;
    });
    contarAlumnos();
}

function ordenarPor(propiedad) {
    curso.sort((a, b) => a[propiedad].localeCompare(b[propiedad]));
    actualizarTabla();
}

function filtrarGenero(genero) {
    const resultado = curso.filter(alumno => alumno.genero === genero);
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    resultado.forEach((alumno, index) => {
        const row = tabla.insertRow();
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.genero}</td>
            <td>
                <button class="btn btn-warning" onclick="editarAlumno(${index})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarAlumno(${index})">Eliminar</button>
            </td>
        `;
    });
    contarAlumnos();
}
