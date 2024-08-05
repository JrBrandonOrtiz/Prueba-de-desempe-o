import { Post } from "./post"; // Importamos la función Post para mostrar los posts
import { PostController } from "./post.controller"; // Importamos el controlador PostController para obtener los posts

const logoutButton = document.querySelector("#logout-button") as HTMLButtonElement; // Obtenemos el elemento de botón de logout
const session = sessionStorage.getItem('token'); // Obtenemos el token de sesión

const url = 'http://localhost:3000'; 

const PostSection = document.querySelector('#card-section') as HTMLElement; // Obtenemos el elemento de sección de posts

(() => { // Función anónima que se ejecuta cuando se carga la página
    if (!session) {
        alert('debes iniciar sesión');
        window.location.href = '../../index.html';
    }
})();

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('token'); // Eliminamos el token de sesión
    window.location.href = '/';
});

async function showPost() { // Función que muestra los posts
    const postsController = new PostController(url);
    try { // Intentamos obtener los posts
        const post = await postsController.getPost('posts');
        console.log(post); // Verifica qué se está devolviendo
        
        if (Array.isArray(post)) {
            post.forEach(postx => {
                PostSection?.append(Post(postx)); // Agregamos cada post a la sección de posts
            });
        } else {
            console.error('La respuesta de getPost no es un array:', post);
        }
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error); // Manejo de errores
    }
}

showPost();