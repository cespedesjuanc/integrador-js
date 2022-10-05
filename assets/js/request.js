let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarJuegos();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarJuegos();
  }
});

const cargarJuegos = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e7fb6fb922mshb6a2ca071e92c93p18e12cjsn38c98f863183",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const respuesta = await fetch(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    /*
    const respuesta = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games&appid=${key}&page=${pagina}`
      
    );
    */

    console.log(respuesta);

    // Si la respuesta es correcta
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let juegos = "";
      datos.results.forEach((juego) => {
        juegos += `
					<div class="juego">
						<img class="poster" src="${juego.thumbnail}">
						<h3 class="titulo">${juego.title}</h3>
					</div>
				`;
      });

      document.getElementById("contenedor").innerHTML = juegos;
    } else if (respuesta.status === 401) {
      console.log("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      console.log("La juego que buscas no existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarJuegos();

/*
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e7fb6fb922mshb6a2ca071e92c93p18e12cjsn38c98f863183",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
*/
/*
if (response.status === 200) {
  const datos = await response.json();

  let juegos = "";
  datos.results.forEach((juego) => {
    juegos += `
                  <div class="juego">
                      <img class="poster" src="${juego.thumbnail}">
                      <h3 class="titulo">${juego.title}</h3>
                  </div>
              `;
  });

  document.getElementById("card-container").innerHTML = juegos;
}
*/
