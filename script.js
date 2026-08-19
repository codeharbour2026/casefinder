const cases = [
    {
        id: "mabo-1992",
        name: "Mabo v Queensland (No 2)",
        year: 1992,
        court: "High Court of Australia",
        area: "Native Title",
        citation: "[1992] HCA 23",
        summary: "A landmark High Court decision recognising native title in Australian law.",
        description: "The case considered whether Australian common law recognised traditional rights and interests in land held by Indigenous Australians. The decision rejected the legal doctrine of terra nullius and established the recognition of native title.",
        judgment: "https://www.hcourt.gov.au/"
    },
    {
        id: "lange-1997",
        name: "Lange v Australian Broadcasting Corporation",
        year: 1997,
        court: "High Court of Australia",
        area: "Constitutional Law",
        citation: "[1997] HCA 25",
        summary: "A major decision concerning the implied freedom of political communication under the Australian Constitution.",
        description: "The High Court considered the constitutional protection of political communication and established an important framework for considering whether laws that restrict political communication are valid.",
        judgment: "https://www.hcourt.gov.au/"
    },
    {
        id: "roach-2007",
        name: "Roach v Electoral Commissioner",
        year: 2007,
        court: "High Court of Australia",
        area: "Electoral Law",
        citation: "[2007] HCA 43",
        summary: "The High Court considered whether laws preventing prisoners from voting were constitutionally valid.",
        description: "The case examined the constitutional requirements surrounding federal elections and whether legislation could completely prevent prisoners from voting.",
        judgment: "https://www.hcourt.gov.au/"
    },
    {
        id: "communist-party-1951",
        name: "Australian Communist Party v Commonwealth",
        year: 1951,
        court: "High Court of Australia",
        area: "Constitutional Law",
        citation: "[1951] HCA 5",
        summary: "The High Court considered the constitutional validity of legislation seeking to dissolve the Communist Party of Australia.",
        description: "The case was an important decision concerning constitutional limits on Commonwealth legislative power and the separation of judicial and legislative functions.",
        judgment: "https://www.hcourt.gov.au/"
    },
    {
        id: "love-2020",
        name: "Love v Commonwealth",
        year: 2020,
        court: "High Court of Australia",
        area: "Constitutional Law",
        citation: "[2020] HCA 3",
        summary: "The High Court considered the constitutional meaning of alienage and its application to Aboriginal Australians.",
        description: "The case considered whether Aboriginal Australians could be treated as aliens for the purposes of the Australian Constitution.",
        judgment: "https://www.hcourt.gov.au/"
    },
    {
        id: "dietrich-1992",
        name: "Dietrich v The Queen",
        year: 1992,
        court: "High Court of Australia",
        area: "Criminal Law",
        citation: "[1992] HCA 57",
        summary: "A significant case concerning the right to legal representation in serious criminal trials.",
        description: "The High Court considered the circumstances in which an accused person should receive legal representation in a serious criminal trial.",
        judgment: "https://www.hcourt.gov.au/"
    }
];

const search = document.getElementById("search");
const results = document.getElementById("results");
const resultCount = document.getElementById("result-count");

const lawSelect = document.getElementById("law-select");
const courtSelect = document.getElementById("court-select");

const lawBubbles = document.getElementById("law-bubbles");
const courtBubbles = document.getElementById("court-bubbles");

const minYear = document.getElementById("min-year");
const maxYear = document.getElementById("max-year");
const yearDisplay = document.getElementById("year-display");
const rangeSelected = document.getElementById("range-selected");

const clearFiltersButton =
    document.getElementById("clear-filters");

const searchPage =
    document.getElementById("search-page");

const casePage =
    document.getElementById("case-page");

const aboutPage =
    document.getElementById("about-page");

const backButton =
    document.getElementById("back-button");

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const mobileNav =
    document.getElementById("mobile-nav");

let selectedLaws = [];
let selectedCourts = [];


/* -------------------------
   Navigation
------------------------- */

function showSearchPage() {
    searchPage.classList.remove("hidden");
    casePage.classList.add("hidden");
    aboutPage.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showAboutPage() {
    searchPage.classList.add("hidden");
    casePage.classList.add("hidden");
    aboutPage.classList.remove("hidden");

    mobileNav.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.getElementById("home-button")
    .addEventListener("click", showSearchPage);

document.getElementById("nav-search")
    .addEventListener("click", showSearchPage);

document.getElementById("mobile-search")
    .addEventListener("click", showSearchPage);

document.getElementById("nav-about")
    .addEventListener("click", showAboutPage);

document.getElementById("mobile-about")
    .addEventListener("click", showAboutPage);


/* Mobile menu */

mobileMenuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
});


/* Keyboard shortcut */

document.addEventListener("keydown", event => {

    if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
    ) {
        event.preventDefault();

        showSearchPage();
        search.focus();
    }
});


/* -------------------------
   Case Results
------------------------- */

function displayCases(list) {

    results.innerHTML = "";

    resultCount.textContent =
        `${list.length} case${list.length === 1 ? "" : "s"}`;

    if (list.length === 0) {

        results.innerHTML = `
            <div class="no-results">
                <h3>No cases found</h3>
                <p>
                    Try changing your search or adjusting your filters.
                </p>
            </div>
        `;

        return;
    }

    list.forEach(c => {

        results.innerHTML += `
            <article class="case-card">

                <h3>${c.name}</h3>

                <div class="case-info">
                    ${c.year} • ${c.court} • ${c.area}
                </div>

                <p class="case-summary">
                    ${c.summary}
                </p>

                <button
                    class="view-case-button"
                    onclick="openCase('${c.id}')"
                >
                    View Case →
                </button>

            </article>
        `;
    });
}


/* -------------------------
   Individual Case
------------------------- */

function openCase(caseId) {

    const selectedCase =
        cases.find(c => c.id === caseId);

    if (!selectedCase) {
        return;
    }

    document.getElementById("case-name").textContent =
        selectedCase.name;

    document.getElementById("case-citation").textContent =
        selectedCase.citation;

    document.getElementById("case-area").textContent =
        selectedCase.area;

    document.getElementById("case-court").textContent =
        selectedCase.court;

    document.getElementById("case-year").textContent =
        selectedCase.year;

    document.getElementById("case-law").textContent =
        selectedCase.area;

    document.getElementById("case-summary").textContent =
        selectedCase.summary;

    document.getElementById("case-description").textContent =
        selectedCase.description;

    document.getElementById("judgment-link").href =
        selectedCase.judgment;

    searchPage.classList.add("hidden");
    aboutPage.classList.add("hidden");
    casePage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


backButton.addEventListener("click", showSearchPage);


/* -------------------------
   Filter Bubbles
------------------------- */

function createBubble(container, value, type) {

    const bubble =
        document.createElement("div");

    bubble.classList.add("bubble");

    bubble.innerHTML = `
        <span>${value}</span>
        <button
            class="remove-btn"
            aria-label="Remove ${value}"
        >
            ×
        </button>
    `;

    bubble
        .querySelector(".remove-btn")
        .addEventListener("click", () => {

            if (type === "law") {
                selectedLaws =
                    selectedLaws.filter(
                        item => item !== value
                    );
            }

            if (type === "court") {
                selectedCourts =
                    selectedCourts.filter(
                        item => item !== value
                    );
            }

            updateBubbles();
            filterCases();
        });

    container.appendChild(bubble);
}


function updateBubbles() {

    lawBubbles.innerHTML = "";
    courtBubbles.innerHTML = "";

    selectedLaws.forEach(law => {
        createBubble(lawBubbles, law, "law");
    });

    selectedCourts.forEach(court => {
        createBubble(courtBubbles, court, "court");
    });
}


/* Law filter */

lawSelect.addEventListener("change", () => {

    const value = lawSelect.value;

    if (
        value &&
        !selectedLaws.includes(value)
    ) {
        selectedLaws.push(value);
    }

    lawSelect.value = "";

    updateBubbles();
    filterCases();
});


/* Court filter */

courtSelect.addEventListener("change", () => {

    const value = courtSelect.value;

    if (
        value &&
        !selectedCourts.includes(value)
    ) {
        selectedCourts.push(value);
    }

    courtSelect.value = "";

    updateBubbles();
    filterCases();
});


/* -------------------------
   Year Slider
------------------------- */

function updateYearSlider() {

    let min = Number(minYear.value);
    let max = Number(maxYear.value);

    if (min > max) {
        [min, max] = [max, min];
    }

    yearDisplay.textContent =
        `${min} – ${max}`;

    const minPercent =
        ((min - 1900) / (2026 - 1900)) * 100;

    const maxPercent =
        ((max - 1900) / (2026 - 1900)) * 100;

    rangeSelected.style.left =
        `${minPercent}%`;

    rangeSelected.style.right =
        `${100 - maxPercent}%`;

    filterCases();
}

minYear.addEventListener(
    "input",
    updateYearSlider
);

maxYear.addEventListener(
    "input",
    updateYearSlider
);


/* -------------------------
   Search + Filters
------------------------- */

function filterCases() {

    const term =
        search.value.toLowerCase().trim();

    let min = Number(minYear.value);
    let max = Number(maxYear.value);

    if (min > max) {
        [min, max] = [max, min];
    }

    const filtered =
        cases.filter(c => {

            const matchesSearch =
                term === "" ||
                c.name.toLowerCase().includes(term) ||
                c.year.toString().includes(term) ||
                c.court.toLowerCase().includes(term) ||
                c.area.toLowerCase().includes(term) ||
                c.summary.toLowerCase().includes(term);

            const matchesLaw =
                selectedLaws.length === 0 ||
                selectedLaws.includes(c.area);

            const matchesCourt =
                selectedCourts.length === 0 ||
                selectedCourts.some(
                    selectedCourt =>
                        c.court.includes(selectedCourt)
                );

            const matchesYear =
                c.year >= min &&
                c.year <= max;

            return (
                matchesSearch &&
                matchesLaw &&
                matchesCourt &&
                matchesYear
            );
        });

    displayCases(filtered);
}


search.addEventListener(
    "input",
    filterCases
);


/* -------------------------
   Clear Filters
------------------------- */

clearFiltersButton.addEventListener(
    "click",
    () => {

        selectedLaws = [];
        selectedCourts = [];

        lawSelect.value = "";
        courtSelect.value = "";

        minYear.value = 1900;
        maxYear.value = 2026;

        updateBubbles();
        updateYearSlider();
    }
);


/* Initial display */

updateYearSlider();
displayCases(cases);
