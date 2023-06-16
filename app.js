const form = document.querySelector('#searchForm');
const showPanel = document.querySelector('#show')
const list = document.createElement('div');

document.body.append(list);
list.classList.add('columns', 'is-multiline');

form.addEventListener('submit', async function (e) {
  e.preventDefault();//stops the deafault action - usually refreshes
  list.innerHTML = '';
  const searchTerm = form.elements.query.value;
  const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
  makeImages(result.data);
  form.elements.query.value = '';
})

const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const div = document.createElement('div');
      const innerDiv = document.createElement('div');
      div.classList.add('column', 'is-one-quarter');
      innerDiv.classList.add('box', 'column','is-flex', 'is-align-items-center', 'is-flex-direction-column','is-four-fifths');
      list.append(div);
      div.append(innerDiv);
      const img = document.createElement('IMG');
      img.src = result.show.image.medium;
      img.classList.add('mt-2');
      innerDiv.append(img);

      const name = document.createElement('H2');
      name.innerText = result.show.name;
      name.classList.add('subtitle', 'is-5', 'm-0', 'mt-2');
      innerDiv.append(name);

      const score = document.createElement('p');
      score.innerText = `${Math.round(result.score*100)} / 100`;
      innerDiv.append(score);
    }
  }
}
