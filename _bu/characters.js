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
let storyCount = 20;

loadJSON('stories/index.json', function(response) {
  let data = JSON.parse(response);

  titleIndex = data;
}, 'json');

let stories = [];
let storiesAnalysed = [];

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
    stories.push(response);

    let compromise = window.nlp(response).normalize().people().out('frequency');
    // let compromise = window.nlp(response).normalize().topics().slice(0, 50).out('frequency');
    console.log(compromise); 
    storiesAnalysed.push(compromise);
    listItems(compromise, i);
  });
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

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}