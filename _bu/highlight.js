import { loadJSON, pad } from './helpers/loadJSON';

let storyIndex;
let storyCount = 10; // 209
let animalData;
let stories = [];
let storiesCombined = '';

const fullTextContainer = document.querySelector('.stories-combined');

loadJSON('stories/index.json', (response) => {
  storyIndex = JSON.parse(response);
}, 'json');

loadJSON('animals-2.json', (response) => {
  animalData = JSON.parse(response);

  listAnimals(animalData);
}, 'json');

for (let i = 0; i < storyCount; i++) {
  loadJSON(`stories/${pad(i + 1, 3)}.txt`, (response) => {
    // store seperate stories
    stories.push(response);

    // combine all stories
    storiesCombined = storiesCombined + ' ' + response;

    if (i === storyCount - 1) fullTextContainer.innerHTML = storiesCombined;
  });
}


//?-----------
let context = document.querySelectorAll('.stories-combined'); 
let keywords = document.querySelector('#animals');

keywords.addEventListener('click', function (event) {
  var target = event.target;

  for(var i = 0; i < context.length; i++) {
    var item = context[i];
    var text = item.textContent;
    var featuredWords = item.querySelectorAll('.featured-word');

    var words = Array.prototype.slice.call(featuredWords, 0).map(function(node) {
      return node.textContent;  
    })

    var regex = new RegExp('\\b(' + target.textContent + ')\\b', 'ig');

    text = text.replace(regex, '<span class="highlight">$1</span>');
    var countOccurances = ((text || '').match(regex) || []).length;


    // put the bolded words back
    words.forEach(function(word) {
      text = text.replace(word, '<span class="featured-word">'+word+'</span>'); 
    });
    
    item.innerHTML = text;
  }
}, false);

//?------------------

function listAnimals(data) {
  let container = document.querySelector('#animals');

  data.forEach((text) => {
    var listItem = document.createElement("li");
    
    listItem.innerHTML = `
      <span>${text}</span>
    `;

    container.appendChild(listItem);
  });
}