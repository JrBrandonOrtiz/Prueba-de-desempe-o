import { ILogin, IResponseLogin } from "../models/ILogin";

export class PageController {
    url : string;
    constructor(url : string) {
        this.url = url;
    }

    async login(data : ILogin, endPoint : string) : Promise<IResponseLogin> { 
        const response = await fetch(`${this.url}${endPoint}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify(data)
        });

        if (response.status != 200) {
            throw new Error('no se pudo iniciar sesión');
        }

        const token : IResponseLogin = await response.json();
        return token;
    }
}