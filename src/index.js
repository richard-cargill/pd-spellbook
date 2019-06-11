import './index.css';

const API = 'https://pd-spellbook-api.richardrcargill.now.sh/';

const makeLetters = letters => 
`<nav id="letters" class="letters">
  <ul class="no-style">
    ${letters.map(letter => `<li><a id="${letter}" class="letter" href="#${letter}_target">${letter}</a></li>`).join('')}
  </ul>
</nav>`;

const makeTerms = terms =>
`<main id="terms" class="terms">
  <ul class="no-style">
    ${terms.map(term => `<li>
        <article ${term.position !== null ? `id="${term.title[0].toLowerCase()}_target"` : null} class="term">
          <h2 class="term__title">
            ${term.title}
            <ul class="no-style tags">
              ${term.tags.map(tag => `<li>${tag}</li>`).join('')}
            </ul>
          </h2>
          <div class="term__content">${term.children}</div>
        </article>
    </li>`).join('')}
  </ul>
</main>`;

function inView (elem) {
  const boundingClientRect = elem.getBoundingClientRect();
  if (boundingClientRect.top >= 0 &&
    boundingClientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
    return true;
  } else {
    return false;
  }
}

function scrollNav (elem) {
  if(!inView(elem)) {
    document.querySelector('#letters').scrollTop = elem.offsetTop;
  }
}

function setupActiveLetter (elems) {
  elems.map(function(elem) {
    if(inView(elem)) {
      if(document.querySelector('.active') !== null) {
        document.querySelector('.active').classList.remove('active');
      }
      const navItem = document.querySelector(`#${elem.innerText[0]}`);
      navItem.classList.add('active');
      scrollNav(navItem);
    }
  });
}

function setupStickyLetters (elems) {
  const mainEl = document.querySelector('#terms ul');
  const navEl = document.querySelector('#letters');

  document.addEventListener('scroll', function() {
    const navTop = mainEl.getBoundingClientRect().top > 0 ? mainEl.getBoundingClientRect().top : 0;
    navEl.style.top = navTop;
    setupActiveLetter(elems);
  });
}

function setupLetterClicks () {
  const anchors = [...document.querySelectorAll('#letters a')];
  anchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      if(document.querySelector('.active') !== null) {
        document.querySelector('.active').classList.remove('active');
      }
      anchor.classList.add('active')
    });
  });
}

function request (fn) {
  return fetch(API)
    .then(r => r.json())
    .then(data => fn.call(null, data));
}

function render({letters, terms}) {
  const letterTemplate = makeLetters(letters);
  const termTemplate = makeTerms(terms);
  document.querySelector('#app').innerHTML = letterTemplate + termTemplate;
}

request(render)
  .then(() => {
    const elems = [...document.querySelectorAll('[id$="_target"]')];
    setupActiveLetter(elems);
    setupStickyLetters(elems);
    setupLetterClicks();
  })
