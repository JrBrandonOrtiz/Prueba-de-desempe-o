import { PageController } from '../src/controllers/page.controller.ts'

const url = 'https://api-posts.codificando.xyz/auth/login'; //se declara la url de la api

const loginForm = document.querySelector("#loginForm") as HTMLFormElement; //se declara el formulario de login
const emailUser = document.querySelector("#emailUser") as HTMLInputElement; 
const passwordUser = document.querySelector("#passwordUser") as HTMLInputElement;

loginForm.addEventListener("submit", async (event : Event) => { //se agrega un evento al formulario de login
  event.preventDefault();

  const user = {
    email : emailUser.value,
    password : passwordUser.value
  }

 try{
  const pageControoller = new PageController(url);
  const token = await pageControoller.login(user, 'login'); //se envia la petición a la api

  console.log(token);

  sessionStorage.setItem('token', token.token);

  const getToken = sessionStorage.getItem('token'); //se obtiene el token de la sesión

  if (getToken === token.token) {
    window.location.href = './src/views/home.html'
    alert('se inició sesión');
  }
 }
 catch (error) {
  console.log(error); //se imprime el error
 }

})