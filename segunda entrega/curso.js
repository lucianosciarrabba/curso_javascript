// Declaración del array que almacenará los alumnos
let Curso = [];

// Función para agregar un nuevo alumno al array
function agregarAlumno() {
    let nombre = prompt("Ingrese el nombre del alumno:");
    let apellido = prompt("Ingrese el apellido del alumno:");
    let dni = prompt("Ingrese el DNI del alumno:");

    // Crear objeto alumno
    let alumno = {
        nombre: nombre,
        apellido: apellido,
        dni: dni
    };

    // Agregar alumno al array Curso
    Curso.push(alumno);

    alert("Alumno agregado correctamente.");
}

// Función para listar todos los alumnos del curso
function listarAlumnos() {
    let mensaje = "Listado de alumnos:\n";

    Curso.forEach(function(alumno) {
        mensaje += `Nombre: ${alumno.nombre} ${alumno.apellido}, DNI: ${alumno.dni}\n`;
    });

    alert(mensaje);
}


//Función para buscar alumno por DNI
function buscarAlumnoPorDNI(dniBuscado) {
    let encontrado = Curso.find(function(alumno) {
        return alumno.dni === dniBuscado;
    });

    if (encontrado) {
        alert(`Alumno encontrado: ${encontrado.nombre} ${encontrado.apellido}, DNI: ${encontrado.dni}`);
    } else {
        alert("Alumno no encontrado.");
    }
}

//Función para eliminar alumno
function eliminarAlumnoPorDNI(dniEliminar) {
    let indice = Curso.findIndex(function(alumno) {
        return alumno.dni === dniEliminar;
    });

    if (indice !== -1) {
        let alumnoEliminado = Curso.splice(indice, 1)[0];
        alert(`Alumno eliminado: ${alumnoEliminado.nombre} ${alumnoEliminado.apellido}, DNI: ${alumnoEliminado.dni}`);
    } else {
        alert("Alumno no encontrado para eliminar.");
    }
}

//Función contar cantidad de alumnos

function contarAlumnos() {
    let cantidad = Curso.length;
    alert(`Cantidad de alumnos en el curso: ${cantidad}`);
}


