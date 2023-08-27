const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");

//UI Objsini Başlatma

const ui = new UI();

//Storage Objesi Üret

const storage = new Storage();

//Tüm eventleri yükleme

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {});
  let films = storage.getFilmsFromStorage();
  ui.loadAllFilms(films);
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director == "" || url === "") {
    ui.displayMessages("Tüm alanları doldurun..", "danger");
  } else {
    //Yeni film
    const newFilm = new Film(title, director, url);

    ui.addFilmToUI(newFilm); // Arayüze film ekleme
    storage.addFilmToStorage(newFilm); //Storage film ekleme
    ui.displayMessages("Film başarıyla eklendi..", "success");
  }
  ui.clearInputs(titleElement, urlElement, directorElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    //Silme işlemi
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );

    ui.displayMessages("Silme İşlemi Başarılı", "success");
  }
} 

function clearAllFilms() {
  if (confirm("Emin misiniz")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
}

