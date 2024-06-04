//* Scroll

function scrollToElement(elementSelector, instance = 0) {
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length > instance) {
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener("click", () => {
  scrollToElement(".tituloprincipal1");
});

link2.addEventListener("click", () => {
  scrollToElement(".tituloprincipal2");
});

link3.addEventListener("click", () => {
  scrollToElement(".tituloprincipal3");
});

//* Añadir actividad

class Activity {
  constructor({ id, title, description, imgUrl }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.id = 0;
  }
  getAllActivities = () => this.activities;
  createActivity(activity) {
    this.id++;
    const activityCreate = new Activity({ id: this.id, ...activity });
    this.activities.push(activityCreate);
  }
  deleteActivity(id) {
    const filtered = this.activities.filter((act) => act.id !== id);
    filtered.forEach((act, index) => (act.id = index + 1));
    this.activities = filtered;
  }
}

const activityRepository = new Repository();

function convertirActHTML(act) {
  const { id, title, description, imgUrl } = act;

  const divAct = document.createElement("div");
  divAct.className = "actContainer";

  const divText = document.createElement("div");
  divText.className = "textDiv";

  const titleEtiqueta = document.createElement("h3");
  titleEtiqueta.className = "titleActivity";
  titleEtiqueta.innerHTML = title;

  const descriptionEtiqueta = document.createElement("p");
  descriptionEtiqueta.className = "descriptionActivity";
  descriptionEtiqueta.innerHTML = description;

  const imgEtiqueta = document.createElement("img");
  imgEtiqueta.className = "imagenActivity";
  imgEtiqueta.src = imgUrl;

  divText.appendChild(titleEtiqueta);
  divText.appendChild(descriptionEtiqueta);
  divAct.appendChild(imgEtiqueta);
  divAct.appendChild(divText);

  return divAct;
}

function actualizarContenedor(contenedor) {
  contenedor.innerHTML = "";

  const actividades = activityRepository.getAllActivities();

  actividades.forEach((activity) => {
    const actividadHTML = convertirActHTML(activity);
    contenedor.appendChild(actividadHTML);
  });
}

function handlerButton() {
  const text = document.getElementById("text");
  const description = document.getElementById("description");
  const img = document.getElementById("imgUrl");
  const contenedor = document.getElementById("activitiesContainer");

  const titleValue = text.value;
  const descriptionValue = description.value;
  const imgUrlValue = img.value;

  if (!titleValue || !descriptionValue || !imgUrlValue) {
    return alert("Por favor, llenar todos los campos");
  }

  activityRepository.createActivity({
    title: titleValue,
    description: descriptionValue,
    imgUrl: imgUrlValue,
  });

  actualizarContenedor(contenedor);

  text.value = "";
  description.value = "";
  img.value = "";
}
