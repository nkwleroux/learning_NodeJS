const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const volume = wrapper.querySelector(".word i");
const infoText = wrapper.querySelector(".info-text");
const removeIcon = wrapper.querySelector(".search span");
let audio;

const wordsList = wrapper.querySelector(".wordsList .list");
const synonyms = wrapper.querySelector(".synonyms .list");
const antonyms = wrapper.querySelector(".antonyms .list");
let list = [];

//debug (calls onLoad + my own funciton)
document.addEventListener("DOMContentLoaded", function () {
  if (searchInput.value == undefined || searchInput.value == "") {
    //Debug only
    for (let index = 0; index < 15; index++) {
      let tag = `<span>- ${index}</span>`;
      const sidebar = document.querySelector(".sidebar .list");
      sidebar.insertAdjacentHTML("beforeend", tag);
    }

    
    fetchApi("set");
    return;
  }
  fetchApi(searchInput.value);
});

function data(result) {
  wrapper.classList.add("active");

  //if i want the whole word search result
  // let wordInput = {
  //   Word: result[0].word,
  //   PartOfSpeech: result[0].meanings[0].partOfSpeech,
  //   Phonetics: result[0].phonetics[0].text,
  //   Meanings: result[0].meanings[0].definitions,
  //   Synonyms: result[0].meanings[0].synonyms,
  //   Antonyms: result[0].meanings[0].antonyms,
  // };

  // let jsOb = JSON.stringify(wordInput); //to json
  // let parsedata = JSON.parse(jsOb); // from json

  // if (!list.includes(jsOb)) {
  //   list.push(jsOb);
  // }

  //Word
  let wordSearched = result[0].word.replace(/^\w/, (c) => c.toUpperCase());
  document.querySelector(".word strong").innerText = wordSearched;

  if (!list.includes(result[0].word)) {
    list.push(result[0].word);
    let tag = `<span>- ${wordSearched}</span>`;
    const sidebar = document.querySelector(".sidebar .list");
    sidebar.insertAdjacentHTML("beforeend", tag);
  }

  //Phonetics
  let phontetics = "";
  if (result[0].phonetics[0].text != undefined) {
    phontetics = `${result[0].meanings[0].partOfSpeech}  ${result[0].phonetics[0].text}`;
  }
  document.querySelector(".word span").innerText = phontetics;

  if (result[0].phonetics[0].text != undefined) {
    volume.style.display = "block";
    audio = new Audio(result[0].phonetics[0].audio);
  } else {
    volume.style.display = "none";
  }

  //Words
  wordsList.innerHTML = "";
  let definitions = result[0].meanings[0].definitions;
  let tag;
  for (let index = 0; index < definitions.length; index++) {
    tag = `<li>
        <p> ${index + 1}. ${definitions[index].definition}</p>
      `;
    if (definitions[index].example != undefined) {
      tag += `<span> Example: ${definitions[index].example}</span>`;
    }
    tag += `</li>`;
    wordsList.insertAdjacentHTML("beforeend", tag);
  }

  //synonyms
  let wordSynonyms = result[0].meanings[0].synonyms;
  addLinkedRelatedWords(synonyms, wordSynonyms);

  //antonyms
  let wordAntonyms = result[0].meanings[0].antonyms;
  addLinkedRelatedWords(antonyms, wordAntonyms);
}

//synonyms & antonyms
function addLinkedRelatedWords(html, wordsList) {
  let tag;
  if (wordsList[0] == undefined) {
    html.parentElement.style.display = "none";
    html.innerHTML = "";
  } else {
    for (index = 0; index < wordsList.length; index++) {
      tag = `<span onclick="search('${wordsList[index]}')">${wordsList[index]},</span>`;
      html.insertAdjacentHTML("beforeend", tag);
    }
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
      infoText.innerHTML = `Information of <span>"${word}"</span> not found. Please, search for another word.`;
      throw new Error("Failed getting JSON response");
    })
    .then((responseJSON) => {
      data(responseJSON);
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

//TODO Audio doesn't work
volume.addEventListener("click", () => {
  volume.style.color = "#4D59FB";
  audio.play();
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

//----------------//

//for "function data"
//!bit overkill and scuffed
//!Prints a list of all info of a word
// let ob = result.map((object) => {
//   const { word, phonetics, meanings } = object;

//   let phoneticsText = phonetics.map((phoneticsOb) => {
//     const { text } = phoneticsOb;
//     return { text };
//   });

//   let meaningsText = meanings.map((meaningsOb) => {
//     const { partOfSpeech, definitions, synonyms, antonyms } = meaningsOb;

//     let defAndExText = definitions.map((defAndExOb) => {
//       const { definition, example } = defAndExOb;
//       return { definition, example };
//     });

//     return { partOfSpeech, defAndExText, synonyms, antonyms };
//   });

//   return { word, phoneticsText, meaningsText };
// });
// console.log(ob);

//----------------//
