// Este archivo maneja la funcionalidad de añadir o actualizar post en un archivo JSON

import { IPost } from "../models/IPost"; // Importamos la interfaz IPost para tipar los datos de los posts
import { PostController } from "../controllers/post.controller"; // Con esto manejamos las operaciones CRUD de los posts

// Obtenemos referencias a los elementos del formulario
const form = document.querySelector("form") as HTMLFormElement;
const titleInput = document.querySelector("#new-title") as HTMLInputElement;
const datecreatedInput = document.querySelector("#new-datecreated") as HTMLInputElement;
const dateestimatedInput = document.querySelector("#new-dateestimated") as HTMLInputElement;
const descriptionInput = document.querySelector("#new-description") as HTMLTextAreaElement;


// Definimos las variables necesarias
const url: string = 'hhttps://api-posts.codificando.xyz/auth/login'; // URL base de la API
const postsController = new PostController('http://localhost:3000/'); // Instanciamos el controladorcon la URL base del servidor local
const endPoint: string = 'posts/'; // Endpoint para agregar o actualizar posts

// Añadimos un listener para el evento de envío del formulario
form.addEventListener('submit', async (event: Event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Extraemos los valores de los campos del formulario
    const titlex = titleInput.value;
    const datecreatedx = datecreatedInput.value;
    const dateestimatedx = dateestimatedInput.value;
    const descriptionx = descriptionInput.value;

    try {
        // Realizamos una solicitud GET a la API
        const response = await fetch(`${url}?q=${titlex}&appid=${url}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`); // Manejo de errores si la respuesta no es exitosa
        }
        const data = await response.json(); // Convertimos la respuesta a JSON

// title, creationDate, creator,status, estimatedPublicacionDate, platform, approvalPercentage
        // Reseteamos el formulario
        form.reset();

        // Redirigimos a la página de inicio para mostrar los cambios
        window.location.href = "home.html";
    } catch (error) {
        console.error("Error al agregar o actualizar el post:", error); // Manejo de errores
    }
});
