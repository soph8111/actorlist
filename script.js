const actorsFile = "actors.json"; // opretter en constant variabel, hvor filen skal ned i. (stien dertil)
const containerWithActors = document.querySelector("#all_actors");
const actorTemplate = document.querySelector("#name");
const containerWithInfo = document.querySelector("#popup");
const movieTemplate = document.querySelector("#info");
let filterButtons = "all";

// Henter actors ind ved hjælp af fetch (i en promise chain)
async function getData(actorsFile) {
  const result = await fetch(actorsFile);
  const actors = await result.json();

  console.log(actors); // tjekker i konsollen om array er hentet

  showActors(actors); // kalder funktionen showActors og sender array'et med
  //addEventListenerToButtons(actors);
}

function showActors(actors) {
  //looper igennem array'et
  actors.forEach((actor) => {
    if (filterButtons == "all" || actor.movie.includes(filterButtons)) {
      let klon = actorTemplate.cloneNode(true).content; // Gør det muligt at klone ned i template
      klon.querySelector(".name").textContent = actor.fullname; // navn hentes
      klon.querySelector(".name").addEventListener("click", () => {
        containerWithInfo.style.display = "block";
        console.log(actor); // viser den aktuelle skuespiller i konsollen
        showInfo(actor); //sender den aktuelle skuespiller med ned i funktionen "showInfo"
      });
      containerWithActors.appendChild(klon); //kloner ind i sektionen
    }
  });
}

//kører funktionen med den aktuelle skuespiller
function showInfo(actor) {
  containerWithInfo.innerHTML = '<div id="kryds"> X </div>'; //Reset'er sectionen, så der er plads til den nye film - krydset skal bruges til at kunne lukke boksen ned
  let klon = movieTemplate.cloneNode(true).content; // Gør det muligt at klone ned i template
  klon.querySelector(".name").textContent = "Actor: " + actor.fullname;
  klon.querySelector(".movie").textContent = "Movie: " + actor.movie; // film hentes på den aktuelle skuespiller
  containerWithInfo.appendChild(klon); //kloner ind i sektionen

  //tilføjer eventlistener, så boksen fjerner sig, når man trykker på krydset
  document.querySelector("#kryds").addEventListener("click", () => {
    containerWithInfo.style.display = "none";
  });
}

// function addEventListenerToButtons(actors) {
//   document.querySelectorAll("#filter_buttons button").forEach((elm) => {
//     elm.addEventListener("click", () => {
//       filterButtons = elm.dataset;
//     });
//     showActors(actors);
//     console.log(elm.dataset);
//   });
// }

getData(actorsFile);
