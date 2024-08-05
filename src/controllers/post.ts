import { IPost } from '../models/IPost';
import { PostController } from './post.controller';

export const Post = (props: IPost): HTMLElement => {
    let { title, creationDate, creator,status, estimatedPublicacionDate, platform, approvalPercentage } = props; //se declaran las variables que se utilizarán en el componente
    const PostContainer = document.createElement("article") as HTMLElement;
    PostContainer.className = "post-container"; 

    const titlex = document.createElement("title") as HTMLTitleElement;
    title = "title-post";

    const infoContainer = document.createElement("div") as HTMLElement; //se crea un div para almacenar la información del post
    infoContainer.className = "postInfo-container";

    const postTitle = document.createElement("h3") as HTMLHeadElement; //se crea un h3 para el título del post
    postTitle.className = "post-title";
    const postcreationDate = document.createElement("p") as HTMLParagraphElement;
    const postCreator = document.createElement("p") as HTMLParagraphElement;
    const postStatus = document.createElement("p") as HTMLParagraphElement; 
    const postEstimatedPublicacionDate = document.createElement("p") as HTMLParagraphElement;
    const postPlatform = document.createElement("p") as HTMLParagraphElement;
    const postApprovalPercentage = document.createElement("p") as HTMLParagraphElement; //se crean los p para los valores del post


    postTitle.innerText = title; 
    postcreationDate.innerText = creationDate; //se establecen los valores del post
    postCreator.innerText = creator;
    postStatus.innerText = status;
    postEstimatedPublicacionDate.innerText = estimatedPublicacionDate;
    postPlatform.innerText = platform;
    postApprovalPercentage.innerText = approvalPercentage;

    const crossContainer = document.createElement("span"); //se crea un span para el botón de eliminar
    crossContainer.className = "cross-container";

    const updateButton = document.createElement("button"); //se crea un botón para actualizar el post
    updateButton.innerText = "Actualizar";
    updateButton.className = "update-button";

    updateButton.addEventListener("click", () => {
        
        // Actualiza los valores del formulario
        (document.querySelector("#new-title") as HTMLInputElement).value = title; //se establecen los valores del formulario
        (document.querySelector("#new-creationDate") as HTMLInputElement).value = creationDate;
        (document.querySelector("#new-creator") as HTMLInputElement).value = creator;
        (document.querySelector("#new-status") as HTMLInputElement).value = status; 
        (document.querySelector("#new-estimatedPublicacionDate") as HTMLInputElement).value = estimatedPublicacionDate;
        (document.querySelector("#new-platform") as HTMLInputElement).value = platform;
        (document.querySelector("#new-approvalPercentage") as HTMLInputElement).value = approvalPercentage;

    });

    crossContainer.addEventListener("click", async () => { //se agrega un evento al botón de eliminar
        const eliminar = confirm('¿Deseas eliminar?');
        if (eliminar) {
            try {
                const postsController = new PostController('http://localhost:3000/');
                await PostController.deletePost(`posts  `); //se elimina el post
                PostContainer.remove();
            } catch (error) {
                console.error("Error al eliminar el post:", error);
            }
        }
    });

    infoContainer.append(title, creationDate, creator,status, estimatedPublicacionDate, platform, approvalPercentage);
    PostContainer.append(infoContainer, crossContainer); //se agrega el post al DOM
    return PostContainer;
};
