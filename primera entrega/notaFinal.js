function calcularNotaFinal() {
    // Solicitar el nombre del alumno
    const nombre = prompt("Por favor, ingresa el nombre del alumno:");

    // Solicitar las notas
    const nota1 = parseFloat(prompt("Ingresa la primera nota:"));
    const nota2 = parseFloat(prompt("Ingresa la segunda nota:"));
    const nota3 = parseFloat(prompt("Ingresa la tercera nota:"));

    // Calcular el promedio
    const promedio = (nota1 + nota2 + nota3) / 3;

    // Determinar si el alumno esta aprobado o no
    if (promedio >= 6) {
        alert(`El alumno ${nombre} ha aprobado con un promedio de ${promedio}.`);
    } else {
        alert(`El alumno ${nombre} no ha aprobado con un promedio de ${promedio}.`);
    }
}

// Llamar a la funcion para ejecutar el programa
calcularNotaFinal();