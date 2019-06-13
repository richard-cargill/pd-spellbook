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
  ${makeHeader()}
  <ul class="no-style">
    ${terms.map((term, key) => `<li>
        <article ${term.position !== null ? `id="${term.title[0].toLowerCase()}_target"` : null} class="term">
          <h2 data-key="${key}" class="term__title">
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

const makeNav = () => 
`<nav class="nav">
  <a href="mailto:mailto:annalisavalente@pm.me" class="nav__item button button--ghost">Contact me</a>
  <a href="https://annalisa.space/about/" class="nav__item button">About</a>
</nav>`;

const makeHeader = () => 
`<header class="header">
  <h1 class="header__title">Product designer spellbook</h1>
  <div class="term__content">
    <p>Terms that I use everyday as a Product designer. This glossary is for technical and non-technical people. If you think something is missing or you want to contribute feel free to ping me!</p>
  </div>
</header>`;

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
    const navTop = mainEl.getBoundingClientRect().top > 18 ? mainEl.getBoundingClientRect().top : 18;
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

function lastTargetElem (elems) {
  return elems.map(el => {
    const previousKey = parseInt(el.getAttribute('data-key'), 10) - 1;
    const elem = document.querySelector(`[data-key="${previousKey}"]`);
    return elem ? elem : null;
  }).filter(el => el);
}

function groupedElems () {
  const elems = [...document.querySelectorAll('[id$="_target"] h2')];
  const previousElems = lastTargetElem(elems);
  return [...elems, ...previousElems];
}

function request (fn) {
  return fetch(API)
    .then(r => r.json())
    .then(data => fn.call(null, data));
}

// need to move to a virtual dom or other rendering solution
function render ({letters, terms}) {
  const navTemplate = makeNav();
  const letterTemplate = makeLetters(letters);
  const termTemplate = makeTerms(terms);

  document.querySelector('#app').innerHTML = navTemplate + letterTemplate + termTemplate;
}

request(render)
  .then(() => {
    const elems = groupedElems();
    setupActiveLetter(elems);
    setupStickyLetters(elems);
    setupLetterClicks();
  })
