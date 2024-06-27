// Seleccionamos el formulario, input y contenedor de las tareas
const formulario = document.querySelector('#formulario')
const inputTarea = document.querySelector('#tarea')
const listaTareas = document.querySelector('#lista-tareas')
const totalTareas = document.querySelector('#total-tareas')
const tareasCompletadas = document.querySelector('#tareas-completadas')

//Definimos un array inicial de tareas

let tareas = [
    { id: 1, texto: "Hacer las compras", completa: false },
    { id: 2, texto: "Limpiar la cocina", completa: true },
    { id: 3, texto: "Preparar la cena", completa: false }
]

// Función para cargar las tareas en pantalla
const renderTareas = ()=> {
    // Crea una variable para guardar temporalmente el contenido
    let html = ""

    // Por cada tarea del array, genera un elemento li, el cual tiene una ID que usaremos
    // para identificar cada tarea y manipular el array. Gracias a un operador ternario
    // se agrega condicionalmente una clase para las tareas completadas
    tareas.forEach((tarea)=> {
        html += `
            <li id="${tarea.id}">
                <span class="task-id">${tarea.id}</span>
                <span class="${tarea.completa ? 'completa' : ''}">${tarea.texto}</span>
                <input type="checkbox" class="toggle-check" id="check-${tarea.id}" ${tarea.completa ? 'checked' : ''}>
                <button class="eliminar">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>
    `;
});

    // Se carga el contenido en pantalla
    listaTareas.innerHTML = html

    // Agregamos los eventos que tendrán los botones
    actualizarTotal()
    contarCheckboxMarcados()
    completarTareas()
    eliminarTareas()
}

// Función para actualizar el total de tareas
const actualizarTotal = () => {
    totalTareas.textContent = tareas.length
}

const contarCheckboxMarcados = () => {
    const checkboxes = document.querySelectorAll('.toggle-check');
    let count = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            count++;
        }
    });
    return count;
};

// Funcion para agregar la accion de completar una tarea
const completarTareas = ()=> {
    // Seleccionamos todos los botones completar
    const checkboxes = document.querySelectorAll("#lista-tareas .completar")

    // Por cada boton, agregamos un evento click
    checkboxes.forEach((checkbox)=> {
        checkbox.addEventListener('click', ()=> {
            // Cuando el evento ocurra, buscaremos gracias a la ID el index en el array de la tarea correspondiente
            // Como en el elemento HTML la ID pertenece al padre del boton, utilizamos parentNode
            const index = tareas.findIndex((elemento)=> elemento.id == btn.parentNode.id)

            // Al tener el index, podemos acceder al array de tareas en esa posicion, acceder al campo completa
            // y modificar su valor. Como es booleano, podemos reasignarlo a su opuesto para gener un toggle
            tareas[index].completa = !tareas[index].completa
            
            // Volvemos a llamar a renderTareas para generar una versión actualizada del listado de tareas
            renderTareas()
        })
    })
}

// Funcion para agregar la acción de eliminar una tarea
const eliminarTareas = ()=> {
    // Seleccionamos los botones de eliminar
    const botones = document.querySelectorAll("#lista-tareas .eliminar")

    // Por cada boton, agregamos un evento click
    botones.forEach((btn)=> {
        btn.addEventListener("click", ()=> {
            // Para eliminar la tarea podemos buscar el index de la tarea correspondiente y luego utilizar splice
            // o podemos utilizar filter para devolver todas las tareas cuya ID no sea la de la tarea a eliminar

            // const index = tareas.findIndex((elemento)=> elemento.id == btn.parentNode.id)
            // tareas.splice(index, 1)
            tareas = tareas.filter((elemento)=> elemento.id != btn.parentNode.id)

            // Actualizamos el listado de tareas en patanlla
            renderTareas()
        })
    })
}


// Al cargar la página, agregamos el evento al formulario
formulario.addEventListener('submit', (e)=> {
    e.preventDefault()

    // Creamos un nuevo objeto tarea que tiene una ID, el contenido y su campo completa como false
    const nuevaTarea = {
        id: Date.now(),
        texto: inputTarea.value,
        completa: false
    }
    // Guardamos esta nueva tarea en el array de tareas
    tareas.push(nuevaTarea)

    // Hacemos un reset del input
    inputTarea.value = ""

    // Actualizamos el listado de tareas en pantalla
    renderTareas()
})

// Como tenemos tareas por defecto, debemos ejecutar renderTareas al momento de cargar la página
// para mostrar las tareas que ya vienen en el array
renderTareas()