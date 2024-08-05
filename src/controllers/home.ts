import { Post } from "./post";
import { PostController } from "./post.controller";

const logoutButton = document.querySelector("#logout-button") as HTMLButtonElement;
const session = sessionStorage.getItem('token');

const url = 'http://localhost:3000';

const PostSection = document.querySelector('#card-section') as HTMLElement;

(() => {
    if (!session) {
        alert('debes iniciar sesión');
        window.location.href = '../../index.html';
    }
})();

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
});

async function showPost() {
    const postsController = new PostController(url);
    try {
        const post = await postsController.getPost('posts');
        console.log(post); // Verifica qué se está devolviendo
        
        if (Array.isArray(post)) {
            post.forEach(postx => {
                PostSection?.append(Post(postx));
            });
        } else {
            console.error('La respuesta de getPost no es un array:', post);
        }
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
    }
}

showPost();