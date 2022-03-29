// const { readFile, writeFile } = require("fs");
// const util = require("util");
// const writeFilePromise = util.promisify(writeFile);

const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const volume = wrapper.querySelector(".word i");
const infoText = wrapper.querySelector(".info-text");
const removeIcon = wrapper.querySelector(".search span");
const content = wrapper.querySelector("ul .content");
const downloadBtn = document.getElementById("downloadBtn");
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
      let tag = `<span>${index}</span>`;
      const sidebar = document.querySelector(".sidebar .list");
      sidebar.insertAdjacentHTML("afterbegin", tag);
    }
    apiSearch("set");
    fetchApi("set");
    return;
  }
  apiSearch(searchInput.value);
});

content.addEventListener("resize", function () {
  let height = content.offsetHeight;
  let width = content.offsetWidth;
  console.log(height);
  console.log(width);
});

function data(result) {
  wrapper.classList.add("active");

  //Word
  let wordSearched = result[0].word.replace(/^\w/, (c) => c.toUpperCase());
  document.querySelector(".word strong").innerText = wordSearched;

  if (!list.includes(result[0].word)) {
    list.push(result[0].word);
    let tag = `<span onclick="search('${result[0].word}')">${wordSearched}</span>`;
    const sidebar = document.querySelector(".sidebar .list");
    sidebar.insertAdjacentHTML("afterbegin", tag);
  }

  //Phonetics
  let phontetics = "";
  if (result[0].phonetics[0] != undefined) {
    phontetics = `${result[0].meanings[0].partOfSpeech}  ${result[0].phonetics[0].text}`;
  }
  document.querySelector(".word span").innerText = phontetics;

  if (result[0].phonetics[0] != undefined) {
    volume.style.display = "block";
    //TODO-audio not working (uri error)
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

  setSidebarHeight();
}

function setSidebarHeight() {
  var height = convertPixelsToRem(
    document.getElementById("wrapper").getBoundingClientRect().height
  );

  document.querySelector(".sidebar").style.maxHeight = height + "rem";
}

function convertPixelsToRem(px) {
  return (
    px /
    parseFloat(
      getComputedStyle(document.documentElement).fontSize.replace("px", "")
    )
  );
}

//synonyms & antonyms
function addLinkedRelatedWords(html, wordsList) {
  let tag;
  if (wordsList[0] == undefined) {
    html.parentElement.style.display = "none";
    html.innerHTML = "";
  } else {
    html.parentElement.style.display = "block";
    html.innerHTML = "";
    for (index = 0; index < wordsList.length; index++) {
      tag = `<span onclick="search('${wordsList[index]}')">${wordsList[index]},</span>`;
      html.insertAdjacentHTML("beforeend", tag);
    }
  }
}

function search(word) {
  searchInput.value = word;
  console.log("search");
  apiSearch(word);
}

function apiSearch(word) {
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  fetchApi(word)
    .then((responseJSON) => {
      data(responseJSON);
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchApi(word) {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    infoText.innerHTML = `Information of <span>"${word}"</span> not found. Please, search for another word.`;
    throw new Error("Failed getting JSON response");
  });
}

searchInput.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, " ");
  if (e.key == "Enter" && word) {
    apiSearch(word);
  }
});

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
  setSidebarHeight();
});

//!Shit don't touch
//TODO-FIX
async function getWordListData(list) {
  let wordListData = [];

  Promise.all(list.map((word, index) => fetchApi(word))).then((response) => {
    var wordInput = getData(response[0]);
    wordListData.push(wordInput);
  });

  return new Promise((resolve, reject) => {
    resolve(wordListData);
  });
}

function getData(result) {
  let wordInput = {
    Word: result[0].word,
    PartOfSpeech: result[0].meanings[0].partOfSpeech,
    Phonetics: result[0].phonetics[0].text,
    Meanings: result[0].meanings[0].definitions,
    Synonyms: result[0].meanings[0].synonyms,
    Antonyms: result[0].meanings[0].antonyms,
  };

  return wordInput;
}

downloadBtn.addEventListener("click", async () => {
  var url = "/download"; // The backend URL which expects your data

  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  xmlhttp.open("POST", url, true);

  // Set the request format
  xmlhttp.setRequestHeader("Accept", "application/json");
  xmlhttp.setRequestHeader("Content-Type", "application/json");

  //When data is recieved from the server
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(`${xmlhttp.responseText}`);
      //window.open("/download");
    }
  };

  var promiseData = await getWordListData(list);

  //TODO-Here goes wrong
  console.log(promiseData);
  console.log(promiseData[0]);

  // promiseData.then((arr) => {
  //   console.log(promiseData);
  // });
  // console.log(JSON.stringify(promiseData));

  // JSON encode the data by stringifying it before sending to the server
  // xmlhttp.send(JSON.stringify(data));
});

//TODO-download file not working
// const start = async () => {
//   try {
//     const first = await readfilePromise(
//       "./Built-In_modules/content/first.txt",
//       "utf-8"
//     );
//     const second = await readfilePromise(
//       "./Built-In_modules/content/second.txt",
//       "utf-8"
//     );
//     await writeFilePromise(
//       "./Built-In_modules/content/test.txt",
//       `data: ${first} ${second}`
//     );
//     // const second = await getText("./Built-In_modules/content/second.txt");

//     console.log(first, second);
//   } catch (error) {
//     console.log(error);
//   }
// };

//----------------//

//for "function data"
//!bit overkill
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
