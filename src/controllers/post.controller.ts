import { IPost } from "../models/IPost";

export class PostController { //exportar a PostController
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getPost(endPoint: string): Promise<IPost> { //Con esta función se obtiene un post
        const response = await fetch(`${this.url}${endPoint}`);
        const data = await response.json();
        console.log(response.status);

        return data;
    }

    async publicPost(endPoint: string, dataCity: IPost) { //Con esta función se publica un post
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCity)
        });

        console.log(response.status);

        if (response.status !== 201) { //si el status es diferente a 201 se lanza error
            throw new Error(`No se puede publicar`);
        }

        const data = await response.json();
        return data;
    }

    async deletePost(endPoint: string): Promise<IPost> { //Con esta función se elimina un post
        const headers: Record<string, string> = {
            "accept": "*/*",
        };
        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers,
        };

        const response: Response = await fetch(`${this.url}${endPoint}`, reqOptions); //se envia la petición a la api

        if (!response.ok) {
            throw new Error(`Error al eliminar la ciudad: ${response.statusText}`);
        }

        const responseDelete: IPost = await response.json();
        return responseDelete; //se devuelve el post eliminado
    }

    async updatePost(id: string, endPoint: string, dataCity: IPost): Promise<IPost> { //Con esta función se actualiza un post
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json", //se establece el tipo de contenido
        };

        const reqOptions: RequestInit = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(dataCity)
        };

        const response: Response = await fetch(`${this.url}${endPoint}${id}`, reqOptions);
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`Error al actualizar el post: ${response.statusText}`); //si el status es diferente a 200 se lanza error
        }

        const updatedPost: IPost = await response.json();
        return updatedPost;
    }
}