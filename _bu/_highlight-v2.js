import { loadJSON, pad } from './helpers/loadJSON';

let storyIndex;
let storyCount = 20; // 209
let animalData;
let stories = [];
let storiesCombined = '';
let animalCounts = [];

const fullTextContainer = document.querySelector('.stories-combined');

loadJSON('stories/index.json', (response) => {
  storyIndex = JSON.parse(response);
}, 'json');

loadJSON('animals-2.json', (response) => {
  animalData = JSON.parse(response);
}, 'json');

for (let i = 0; i < storyCount; i++) {
  loadJSON(`stories/${pad(i + 1, 3)}.txt`, (response) => {
    // store seperate stories
    stories.push(response);

    // combine all stories
    storiesCombined = storiesCombined + ' ' + response;

    if (i === storyCount - 1) init();
  });
}

function init() {
  fullTextContainer.innerHTML = storiesCombined;
  listAnimals(animalData);
}

//?-----------

function highLight(target, textContainer, i) {
  var item = textContainer;
  var text = item.textContent;
  var featuredWords = item.querySelectorAll('.highlight');
  
  var words = Array.prototype.slice.call(featuredWords, 0).map(function(node) {
    return node.textContent;  
  })
  
  var regex = new RegExp('\\b(' + target + ')\\b', 'ig');
  
  text = text.replace(regex, `<span class="highlight">$1</span>`);
  var countOccurances = ((text || '').match(regex) || []).length;

  animalCounts[i].count = countOccurances;

  // put the previous words back
  words.forEach(function(word) {
    text = text.replace(word, `<span class="highlight">${word}</span>`); 
  });
  
  item.innerHTML = text;
}

//?------------------

function listAnimals(data) {
  let container = document.querySelector('#animals');

  
  data.forEach((text, i) => {
    let storyContainer = document.querySelector('.stories-combined'); 
    //? let randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16); // leuk voor later
    
    animalCounts.push({ animal: text });
    highLight(text, storyContainer, i);
  });
  
  animalCounts.sort((a, b) => (a.count > b.count) ? -1 : 1);
  animalCounts.forEach((item, i) => {
    var listItem = document.createElement("li");
    listItem.classList.add(`animal-${i}`);
    
    listItem.innerHTML = `
      <span>${item.animal}</span>
      <span>${item.count}x</span>
    `;

    container.appendChild(listItem);
  });
}