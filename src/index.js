const API = "https://pd-spellbook-api.richardrcargill.now.sh/";
const APP_NODE = document.querySelector("#app");

const makeNav = () =>
  `<nav class="nav">
    <a href="mailto:mailto:annalisavalente@pm.me" class="nav__item button button--ghost">Contact me</a>
    <a href="https://annalisa.space/" target="_blank" class="nav__item button">About</a>
  </nav>`;

const makeHeader = () =>
  `<header class="header">
    <h1 class="header__title">Product designer spellbook</h1>
    <div class="term__content">
      <p>Terms that I use everyday as a Product designer. This glossary is for technical and non-technical people. If you think something is missing or you want to contribute feel free to ping me!</p>
    </div>
  </header>`;

const makeLetters = letters =>
  `<nav id="letters" class="letters">
    <ul class="no-style">
      ${letters
        .map(
          letter =>
            `<li><a id="${letter}" class="letter" href="#${letter}_target">${letter}</a></li>`
        )
        .join("")}
    </ul>
  </nav>`;

const makeTerms = terms =>
  `<main id="terms" class="terms">
    ${makeHeader()}
    ${
      terms
        ? `<ul class="no-style">
      ${terms
        .map(
          (term, key) => `<li>
          <article ${
            term.position !== null
              ? `id="${term.title[0].toLowerCase()}_target"`
              : null
          } class="term">
            <h2 data-key="${key}" class="term__title">
              ${term.title}
              <ul class="no-style tags">
                ${term.tags.map(tag => `<li>${tag}</li>`).join("")}
              </ul>
            </h2>
            <div class="term__content">${term.children}</div>
          </article>
      </li>`
        )
        .join("")}
    </ul>`
        : '<p style="color:red" class="term__content">There was a problem loading</p>'
    }
  </main>`;

function inView(elem) {
  const boundingClientRect = elem.getBoundingClientRect();
  if (
    boundingClientRect.top >= 0 &&
    boundingClientRect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return true;
  } else {
    return false;
  }
}

function scrollNav(elem) {
  const desktopQuery = window.matchMedia("(min-width: 600px)");

  if (!inView(elem) && desktopQuery.matches) {
    document.querySelector("#letters").scrollTop = elem.offsetTop;
  } else {
    document.querySelector("#letters").scrollLeft = elem.offsetLeft;
  }
}

function setupActiveLetter(elems) {
  elems.map(function(elem) {
    if (inView(elem)) {
      if (document.querySelector(".active") !== null) {
        document.querySelector(".active").classList.remove("active");
      }
      const navItem = document.querySelector(`#${elem.innerText[0]}`);
      navItem.classList.add("active");
      scrollNav(navItem);
    }
  });
}

function setupStickyLetters(elems) {
  const mainEl = document.querySelector("#terms ul");
  const navEl = document.querySelector("#letters");
  const desktopQuery = window.matchMedia("(min-width: 600px)");

  document.addEventListener("scroll", function() {
    if (desktopQuery.matches) {
      const navTop =
        mainEl.getBoundingClientRect().top > 18
          ? mainEl.getBoundingClientRect().top
          : 18;
      navEl.style.top = navTop;
    } else {
      navEl.style.top = 0;
    }
    setupActiveLetter(elems);
  });
}

function setupLetterClicks() {
  const anchors = [...document.querySelectorAll("#letters a")];
  anchors.forEach(anchor => {
    anchor.addEventListener("click", () => {
      if (document.querySelector(".active") !== null) {
        document.querySelector(".active").classList.remove("active");
      }
      anchor.classList.add("active");
    });
  });
}

function lastTargetElem(elems) {
  const elemsLength = elems.length;
  let result = [];

  for (let i = 0; i < elemsLength; i++) {
    const previousKey = parseInt(elems[i].getAttribute("data-key"), 10) - 1;
    const elem = document.querySelector(`[data-key="${previousKey}"]`);

    if (elem) {
      result = [...result, elem];
    }
  }

  return result;
}

function groupedElems() {
  const elems = [...document.querySelectorAll('[id$="_target"] h2')];
  const previousElems = lastTargetElem(elems);

  return [...elems, ...previousElems];
}

function request(successFn, failureFn) {
  return fetch(API)
    .then(r => r.json())
    .then(data => successFn.call(null, data))
    .catch(error => failureFn.call(null, error));
}

function successfulRender({ letters, terms }) {
  const navTemplate = makeNav();
  const letterTemplate = makeLetters(letters);
  const termTemplate = makeTerms(terms);

  APP_NODE.innerHTML = navTemplate + letterTemplate + termTemplate;
}

function failureRender() {
  const navTemplate = makeNav();
  const termTemplate = makeTerms();

  APP_NODE.innerHTML = navTemplate + termTemplate;
}

request(successfulRender, failureRender).then(() => {
  const elems = groupedElems();
  setupActiveLetter(elems);
  setupStickyLetters(elems);
  setupLetterClicks();
});
