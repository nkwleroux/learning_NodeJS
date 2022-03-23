const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const volume = wrapper.querySelector(".word i");
const infoText = wrapper.querySelector(".info-text");
const removeIcon = wrapper.querySelector(".search span");
let audio;

const meanings = wrapper.querySelector(".meanings .list");
const example = wrapper.querySelector(".examples .list");
const synonyms = wrapper.querySelector(".synonyms .list");

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");

    //Word
    document.querySelector(".word p").innerText = result[0].word;

    //Phonetics
    let phontetics = "";
    if (result[0].phonetics[0] != undefined) {
      phontetics = `${result[0].meanings[0].partOfSpeech}  ${result[0].phonetics[0].text}`;
    }
    document.querySelector(".word span").innerText = phontetics;

    //Meanings
    meanings.innerHTML = "";
    document.querySelector(".meanings .details span").innerText = "";
    let definitions = result[0].meanings[0].definitions;
    let tag;
    for (let index = 0; index < definitions.length; index++) {
      tag = `<span> ${index + 1}. ${definitions[index].definition}</span>`;
      meanings.insertAdjacentHTML("beforeend", tag);
      if (definitions[index].example != undefined) {
        tag = `<span> ${index + 1}. (Example) ${
          definitions[index].example
        }</span>`;
        meanings.insertAdjacentHTML("beforeend", tag);
      }
    }

    //Examples
    // example.innerHTML = "";
    // let examples = result[0].meanings[0].examples;
    // for (index = 0; index < examples.length; index++) {
    //   let tag = `<span> ${index+1}. ${examples[index].example}</span>`;
    //   example.insertAdjacentHTML("beforeend", tag);
    //   console.log(`${examples[index].example}`);
    // }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
}

function fetchApi(word) {
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed getting the JSON response");
    })
    .then((responseJSON) => {
      data(responseJSON, word);
    })
    .catch((err) => {
      console.log(err);
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
