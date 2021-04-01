import {
  eventsList,
  categoriesNames,
  categoriesColors,
  socialCategoriesList,
} from "./constants.js";

const allEventsCheckbox = document.getElementById("all-events");
const checkboxes = document.getElementsByName("category-item");
const filterSection = document.querySelector(".filter-section");

const daysSections = document.querySelectorAll(".day-section");
const daysTitles = document.querySelectorAll(".day-title");

let renderedEventsList = [];

const toggleCheck = (checkbox) => (checkbox.checked = true);
const toggleUncheck = (checkbox) => (checkbox.checked = false);

export const getCategoriesList = () =>
  [...checkboxes].filter((c) => c.checked).map((c) => c.id);

export function setCurrentDay() {
  let currentDayIndex = new Date().getDay();
  let currentDayTitle = [...daysTitles].find(
    (day) => day.dataset.dayId === currentDayIndex.toString()
  );
  currentDayTitle.classList.add("current-day-title");
}

allEventsCheckbox.addEventListener("change", () => {
  if (allEventsCheckbox.checked) {
    checkboxes.forEach((c) => toggleUncheck(c));
    renderEvents();
  }
});

filterSection.addEventListener("click", ({ target }) => {
  if (target.name === "category-item") {
    toggleUncheck(allEventsCheckbox);
    renderEvents(getCategoriesList());
  }

  if (![...checkboxes].some((c) => c.checked)) {
    toggleCheck(allEventsCheckbox);
    renderEvents();
  }
});

setCurrentDay();

function getDayColumnById(id) {
  let dayColumn = Array.from(daysSections).find(
    (day) => day.dataset.dayId === id.toString()
  ).firstElementChild;
  return dayColumn;
}

function renderEvents(categories) {
  let list = [];

  if (categories) {
    // якщо дані категорії
    eventsList.forEach((event) => {
      // перебирає список подій
      let index = renderedEventsList.indexOf(event); // вертає індекс події зі списку вже зренджерених
      if (categories.some((tag) => event.categories.includes(tag))) {
        // якщо подія підпадає під необхідну категорію
        if (index < 0) {
          // якщо події немає в списку зрендерених
          list.push(event); // додає в список тих, які необхідно зрендерити
        }
      } else {
        // якщо подія не підпадає під категорії
        if (index > 0) {
          // якщо подія є зрендерена
          // видалити картку ???
          removeEventCard(event);
        }
      }
    });
  } else {
    // рендерить весь список подій
    eventsList.forEach((event) => {
      let index = renderedEventsList.indexOf(event); // вертає індекс події зі списку вже зренджерених
      if (index < 0) {
        list.push(event);
      }
    });
  }

  list.forEach((event) => {
    let eventCard = renderEventCard(event);
    let dayColumn = getDayColumnById(event.day);
    dayColumn.append(eventCard);
    renderedEventsList.push(event);
  });
}

renderEvents();

function removeEventCard(event) {
  let id = eventsList.indexOf(event);
  let card = document.querySelector(`.event-card[data-id="${id}"]`);
  card.remove();
  let index = renderedEventsList.indexOf(event);
  renderedEventsList.splice(index, 1);
}

function renderEventCard(event) {
  let id = eventsList.indexOf(event);
  let eventCard = document.createElement("div");
  eventCard.classList.add("event-card");
  eventCard.dataset.id = id;
  eventCard.innerHTML = `
    <h6 class="event-card-title">${event.name}</h6>
    <li class="${event.location ? "event-card-contact-item" : "empty-item"}">
        <div class="event-card-contact-icon">
            <i class="fas ${event.location ? "fa-map-marker-alt" : null}"></i>
        </div> ${event.location ? event.location : ""}
    </li>
    <li class="${
      event.isOnline ? "contact-item event-card-contact-item" : "empty-item"
    }">
        <div class="event-card-contact-icon">
            <i class="fas ${event.isOnline ? "fa-globe" : null}"></i>
        </div> ${event.isOnline ? event.streamingPlatform : ""}
    </li>
    <li class="${
      event.phone ? "contact-item event-card-contact-item" : "empty-item"
    }">
        <div class="event-card-contact-icon">
            <i class="${event.phone ? "fas fa-phone-alt" : null}"></i>
        </div> ${event.phone ? event.phone : ""}
    </li>
  `;

  let tagsSection = document.createElement("div");
  tagsSection.classList.add("tags-section");
  if (socialCategoriesList.every((tag) => event.categories.indexOf(tag) >= 0)) {
    let tag = document.createElement("p");
    tag.classList.add("tag");
    tag.textContent = "для всіх";
    tag.style.backgroundColor = categoriesColors["all"];
    tagsSection.append(tag);
    if (event.categories.includes("online")) {
      let onlineTag = document.createElement("p");
      onlineTag.classList.add("tag");
      onlineTag.textContent = "онлайн";
      onlineTag.style.backgroundColor = categoriesColors["online"];
      tagsSection.append(onlineTag);
    }
  } else {
    for (let i = 0; i < event.categories.length; i++) {
      let tag = document.createElement("p");
      tag.classList.add("tag");
      tag.textContent = categoriesNames[event.categories[i]];
      tag.style.backgroundColor = categoriesColors[event.categories[i]];
      tagsSection.append(tag);
    }
  }
  eventCard.append(tagsSection);
  return eventCard;
}
