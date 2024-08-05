import { ILogin, IResponseLogin } from "../models/ILogin"; 

export class PageController { //exportar a PageController
    url : string;
    constructor(url : string) {
        this.url = url;
    }

    async login(data : ILogin, endPoint : string) : Promise<IResponseLogin> { //Con esta función se puede hacer login a la pagina web
        const response = await fetch(`${this.url}${endPoint}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify(data) //enviar datos en formato json
        });

        if (response.status != 200) { //si el status es diferente a 200 se lanza error
            throw new Error('no se pudo iniciar sesión');
        }

        const token : IResponseLogin = await response.json(); //si todo va bien se obtiene el token
        return token;
    }
}