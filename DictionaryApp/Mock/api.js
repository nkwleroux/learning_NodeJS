const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const volume = wrapper.querySelector(".word i");
const infoText = wrapper.querySelector(".info-text");
const synonyms = wrapper.querySelector(".synonyms .list");
const removeIcon = wrapper.querySelector(".search span");
const meanings = wrapper.querySelector(".meaning .list");
const example = wrapper.querySelector(".example span");
let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions;
    let phontetics = `${result[0].meanings[0].partOfSpeech}  ${result[0].phonetics[0].text}`;
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phontetics;

    meanings.innerText = "";
    for(let index = 0; definitions[index].definition != 0;index++){

        meanings.innerText += `${definitions[index].definition} \n\n`;
    }
    console.log(`test`);

    console.log(`${definitions[0].example}`);
    if (definitions[0].example == undefined) {
      //doesnt work since its a span
      //   example.parentElement.style.display = "none";
    } else {
      //   example.parentElement.style.display = "block";
      //   example.innerText = "";
      //   example.innerText = definitions.example;
    }
    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
        synonyms.parentElement.style.display = "block";
        //todo
    }
  }
}

function search(word) {
  fetchApi(word);
  searchInput.value = word;
}

function fetchApi(word) {
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => data(result, word))
    .catch(() => {
      infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}

searchInput.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, " ");
  if (e.key == "Enter" && word) {
    fetchApi(word);
  }
});

volume.addEventListener("click", () => {
  volume.style.color = "#4D59FB";
  console.log("TODO - Audio doesn't work");
  // audio.play();
  setTimeout(() => {
    volume.style.color = "#999";
  }, 800);
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color = "#9A9A9A";
  infoText.innerHTML = "";
});
