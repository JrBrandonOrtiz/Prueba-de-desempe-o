import { IPost } from '../models/IPost';
import { PostController } from './post.controller';

export const Post = (props: IPost): HTMLElement => {
    let { title, creationDate, creator,status, estimatedPublicacionDate, platform, approvalPercentage } = props;
    const PostContainer = document.createElement("article") as HTMLElement;
    PostContainer.className = "post-container";

    const titlex = document.createElement("title") as HTMLTitleElement;
    title.className = "title-post";

    const infoContainer = document.createElement("div") as HTMLElement;
    infoContainer.className = "postInfo-container";

    const postTitle = document.createElement("h3") as HTMLHeadElement;
    postTitle.className = "post-title";
    const postcreationDate = document.createElement("p") as HTMLParagraphElement;
    const postCreator = document.createElement("p") as HTMLParagraphElement;
    const postStatus = document.createElement("p") as HTMLParagraphElement;
    const postEstimatedPublicacionDate = document.createElement("p") as HTMLParagraphElement;
    const postPlatform = document.createElement("p") as HTMLParagraphElement;
    const postApprovalPercentage = document.createElement("p") as HTMLParagraphElement;


    postTitle.innerText = title;
    postcreationDate.innerText = creationDate;
    postCreator.innerText = creator;
    postStatus.innerText = status;
    postEstimatedPublicacionDate.innerText = estimatedPublicacionDate;
    postPlatform.innerText = platform;
    postApprovalPercentage.innerText = approvalPercentage;

    const crossContainer = document.createElement("span");
    crossContainer.className = "cross-container";

    const updateButton = document.createElement("button");
    updateButton.innerText = "Actualizar";
    updateButton.className = "update-button";

    updateButton.addEventListener("click", () => {
        
        // Actualiza los valores del formulario
        (document.querySelector("#new-title") as HTMLInputElement).value = title;
        (document.querySelector("#new-creationDate") as HTMLInputElement).value = creationDate;
        (document.querySelector("#new-creator") as HTMLInputElement).value = creator;
        (document.querySelector("#new-status") as HTMLInputElement).value = status;
        (document.querySelector("#new-estimatedPublicacionDate") as HTMLInputElement).value = estimatedPublicacionDate;
        (document.querySelector("#new-platform") as HTMLInputElement).value = platform;
        (document.querySelector("#new-approvalPercentage") as HTMLInputElement).value = approvalPercentage;

    });

    crossContainer.addEventListener("click", async () => {
        const eliminar = confirm('¿Deseas eliminar?');
        if (eliminar) {
            try {
                const postsController = new PostController('http://localhost:3000/');
                await PostController.deletePost(`posts  `);
                PostContainer.remove();
            } catch (error) {
                console.error("Error al eliminar el post:", error);
            }
        }
    });

    infoContainer.append(title, creationDate, creator,status, estimatedPublicacionDate, platform, approvalPercentage);
    PostContainer.append(infoContainer, crossContainer);

    return PostContainer;
};
