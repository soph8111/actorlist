const actorsFile = "actors.json"; // opretter en constant variabel, hvor filen skal ned i. (stien dertil)
const containerWithActors = document.querySelector("#all_actors");
const actorTemplate = document.querySelector("#name");
const containerWithInfo = document.querySelector("#popup");
const movieTemplate = document.querySelector("#info");

// Henter actores ind ved hjælp af fetch (i en promise chain)
async function getData(actorsFile) {
  const result = await fetch(actorsFile);
  const actors = await result.json();

  console.log(actors); // tjekker i consollen om array er hentet

  showActors(actors); // kalder funktionen showActors og sender array'et med
}

function showActors(actors) {
  actors.forEach((actor) => {
    //looper igennem array'et
    let klon = actorTemplate.cloneNode(true).content; // Gør det muligt at klone ned i template
    klon.querySelector(".name").textContent = actor.fullname; // navn hentes
    klon.querySelector(".name").addEventListener("click", () => {
      containerWithInfo.style.display = "block";
      console.log(actor);
      showInfo(actor);
    });
    containerWithActors.appendChild(klon); //kloner ind i sektionen
  });
}

function showInfo(actor) {
  let klon = movieTemplate.cloneNode(true).content; // Gør det muligt at klone ned i template
  klon.querySelector(".movie").textContent = actor.movie; // film hentes
  containerWithInfo.appendChild(klon); //kloner ind i sektionen
}

getData(actorsFile);
