function loadJSON(fileName, callback, type) {   
	var xobj = new XMLHttpRequest();
      if (type === 'json') { xobj.overrideMimeType("application/json"); }
			xobj.open('GET', fileName, true); // Replace 'my_data' with the path to your file
			xobj.onreadystatechange = function () {
						if (xobj.readyState == 4 && xobj.status == "200") {
							// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
							callback(xobj.responseText);
				}
	};
	xobj.send(null);   
}

let titleIndex;
let storyCount = 209;
let animals;

loadJSON('stories/index.json', function(response) {
  let data = JSON.parse(response);

  titleIndex = data;
}, 'json');

loadJSON('animals.json', function(response) {
  animals = JSON.parse(response);
}, 'json');

let stories = [];
let storiesAnalysed = [];
let longAssStory = '';
// for (let i = 0; i < 10; i++) {
//   loadJSON(`stories/${pad(i + 1, 3)}.txt`, function(response) {
//     stories.push(response);

//     let compromise = window.nlp(response).normalize().nouns().out('frequency');
//     storiesAnalysed.push(compromise);
//     listItems(compromise, i);
//   });
// }

for (let i = 0; i < storyCount; i++) {
  loadJSON(`stories/${pad(i + 1, 3)}.txt`, function(response) {
    longAssStory = longAssStory + ' ' + response;

    // let compromise = window.nlp(response).normalize().people().out('frequency');
    // storiesAnalysed.push(compromise);
    // listItems(compromise, i);

    if (i === storyCount - 1) {
      console.log('doing it');
      document.querySelector('.test').innerHTML = longAssStory;
      // analyseThis(longAssStory);

      let results = ContainsAny(longAssStory, animals);
      console.log(results);

      let animalContainer = document.querySelector('.animal-results');
      listAnimals(results, animalContainer);
    }
  });
}

function analyseThis(story) {
  let compromise = window.nlp(story).normalize().people().out('frequency');
  // storiesAnalysed.push(compromise);
  listItems(compromise, 1);
} 

function container(i) {
  var outer = document.createElement('div');
  outer.classList.add('list-container');
  var title = document.createElement('h3');
  title.innerHTML = titleIndex[i].title;
  var container = document.createElement("table");
  container.classList.add(`list-${i}`);
  container.innerHTML = `
    <tr>
      <th>normal</th>
      <th>count</th>
      <th>percent</th>
    </tr>
  `;

  document.querySelector('.container').appendChild(outer);
  outer.appendChild(title);
  outer.appendChild(container);
}

function listItems(t, i) {
  container(i);

  t.forEach((text) => {
    var listItem = document.createElement("tr");
    
    listItem.innerHTML = `
      <td>${text.normal}</td>
      <td>${text.count}</td>
      <td>${text.percent}</td>
    `;

    document.querySelector(`.list-${i}`).appendChild(listItem);
  });
}

function listAnimals(t, container) {
  t.forEach((text) => {
    var listItem = document.createElement("tr");
    
    listItem.innerHTML = `
      <td>${text.keyWord}</td>
      <td>${text.items.length}</td>
    `;

    container.appendChild(listItem);
  });
}

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function ContainsAny(str, items){
  var lastMatch;
  var groupedByKey = [];

  str = str.toLowerCase();
  items.forEach((element) => {
    element = element.toLowerCase();
    if ((lastMatch = str.indexOf(element)) >= 0) {
      if (!groupedByKey.some(key => key.keyWord === element)) {
        groupedByKey.push({
          keyWord: element,
          wordLength: element.length,
          items: [],
        });
      }

      var keyObj = groupedByKey.find(obj => {
        return obj.keyWord === element
      })

      keyObj.items.push(lastMatch);

      while ((lastMatch = str.indexOf(element, lastMatch + element.length)) >= 0) {
        keyObj.items.push(lastMatch);
      }
    }
  });

  return groupedByKey;
}

// let string = `
// In olden times when wishing still helped one, there lived a king whose daughters were all beautiful, 
// but the youngest was so beautiful that the sun itself, which has seen so much, 
// was astonished whenever it shone in her face. Close by the king's castle lay a 
// great dark forest, and under an old lime-tree in the forest was a well, and when the day was very warm, the king's child went out into the forest and sat down by the side of the cool fountain, and when she was bored she took a golden ball, and threw it up on high and caught it, and this ball was her favorite plaything. Now it so happened that on one occasion the princess's golden ball did not fall into the little hand which she was holding up for it, but on to the ground beyond, and rolled straight into the water. 
// `;

// console.log(ContainsAny(string, ["wishing", "was", "lived"]));