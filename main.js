/* const peticiónPelículas = async()=>{
    try {
        const respuesta =  await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a637988813c72a09d84944793f3e5443');
        if (!respuesta.ok){
            throw new Error(`"Network response was not ok ${respuesta.statusText}`);
        }
        const datos = await respuesta.json();
    
        console.log(datos)
        console.log(datos["poster_path"])
    } catch (error) {
        console.error("Problema con solicitud fetch", error)
    }
};

peticiónPelículas(); */

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPelículas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPelículas();
	}
});

const cargarPelículas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a637988813c72a09d84944793f3e5443&MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let películas = '';
			datos.results.forEach(película => {
				películas += `
					<div class="película">
						<img class="poster" src="https://image.tmdb.org/t/p/w500${película.poster_path}">
						<h3 class="titulo">${película.title}</h3>
					</div>
				`;
                console.log(películas)
			});
			document.getElementById('contenedor').innerHTML = películas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La película que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPelículas();