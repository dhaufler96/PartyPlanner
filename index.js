const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2608-Dustin";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let parties = [];

let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();

    parties = result.data;

    render();
  } catch (error) {
    console.error(error);
  }
}


async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();

    selectedParty = result.data;

    render();
  } catch (error) {
    console.error(error);
  }
}

function PartyListItem(party) {
  const $li = document.createElement("li");

  $li.textContent = party.name;

  $li.addEventListener("click", () => {
    getParty(party.id);
  });

  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");

  const $parties = parties.map(PartyListItem);

  $ul.replaceChildren(...$parties);

  return $ul;
}

function PartyDetails() {

  if (!selectedParty) {
    const $p = document.createElement("p");

    $p.textContent = "Please select a party to learn more.";

    return $p;
  }

  const $party = document.createElement("section");

  $party.innerHTML = `
    <h2>${selectedParty.name}</h2>
    <p>ID: ${selectedParty.id}</p>
    <p>Date: ${selectedParty.date}</p>
    <p>Description: ${selectedParty.description}</p>
    <p>Location: ${selectedParty.location}</p>
  `;

  return $party;
}

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>

    <main>
      <section>
        <h2>Parties</h2>
        <PartyList></PartyList>
      </section>

      <section>
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;

  $app.querySelector("PartyList").replaceWith(PartyList());

  $app
    .querySelector("PartyDetails")
    .replaceWith(PartyDetails());
}

async function init() {
  await getParties();
}

init();