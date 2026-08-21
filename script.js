const cases = [
    {
        id: "mabo-1992",
        name: "Mabo v Queensland (No 2)",
        year: 1992,
        court: "High Court of Australia",
        area: "Native Title",
        citation: "[1992] HCA 23",
        summary: "A landmark High Court decision recognising native title in Australian law.",
        facts: "Eddie Mabo and other plaintiffs argued that their traditional connection to the Murray Islands gave them rights to land recognised by Australian law.",
        issues: "The Court considered whether Australian common law recognised native title and whether the doctrine of terra nullius applied to Australia.",
        decision: "The High Court recognised native title and rejected the idea that Australia was legally unoccupied at the time of British settlement.",
        significance: "The decision became one of the most significant Australian cases concerning Indigenous land rights.",
        judgment: "https://www.hcourt.gov.au/"
    },

    {
        id: "lange-1997",
        name: "Lange v Australian Broadcasting Corporation",
        year: 1997,
        court: "High Court of Australia",
        area: "Constitutional Law",
        citation: "[1997] HCA 25",
        summary: "A major decision concerning the implied freedom of political communication.",
        facts: "The former New Zealand Prime Minister David Lange brought proceedings concerning material published by the Australian Broadcasting Corporation.",
        issues: "The Court considered the constitutional protection of political communication and how laws restricting communication should be assessed.",
        decision: "The High Court established an important test for determining whether laws impermissibly burden the freedom of political communication.",
        significance: "The case remains a leading authority on Australia's implied freedom of political communication.",
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
        facts: "A challenge was brought against Commonwealth legislation that restricted prisoners' ability to vote in federal elections.",
        issues: "The Court considered whether the Constitution limited Parliament's power to exclude people from voting.",
        decision: "The Court found that a complete prohibition on prisoner voting was invalid.",
        significance: "The decision established important principles concerning representative government and voting rights.",
        judgment: "https://www.hcourt.gov.au/"
    },

    {
        id: "communist-party-1951",
        name: "Australian Communist Party v Commonwealth",
        year: 1951,
        court: "High Court of Australia",
        area: "Constitutional Law",
        citation: "[1951] HCA 5",
        summary: "A major constitutional case concerning the attempted dissolution of the Communist Party of Australia.",
        facts: "The Commonwealth Parliament passed legislation seeking to dissolve the Communist Party of Australia.",
        issues: "The High Court considered whether the Commonwealth had constitutional power to enact the legislation.",
        decision: "The High Court held that the legislation was invalid.",
        significance: "The case is an important authority concerning constitutional limits on Commonwealth legislative power.",
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
        facts: "The proceedings concerned the deportation of Aboriginal Australian men who were not Australian citizens.",
        issues: "The Court considered whether Aboriginal Australians could constitutionally be classified as aliens.",
        decision: "The majority held that Aboriginal Australians could not be considered aliens within the meaning of the Constitution.",
        significance: "The decision raised important constitutional questions concerning Aboriginal identity and Australian citizenship.",
        judgment: "https://www.hcourt.gov.au/"
    },

    {
        id: "dietrich-1992",
        name: "Dietrich v The Queen",
        year: 1992,
        court: "High Court of Australia",
        area: "Criminal Law",
        citation: "[1992] HCA 57",
        summary: "A significant case concerning legal representation in serious criminal trials.",
        facts: "Dietrich was charged with serious criminal offences and faced trial without publicly funded legal representation.",
        issues: "The Court considered whether an accused person should receive legal representation in serious criminal proceedings.",
        decision: "The Court held that an Australian court should generally adjourn a serious criminal trial where an accused person is unrepresented through no fault of their own.",
        significance: "The case remains an important authority concerning fairness in serious criminal trials.",
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

const searchPage = document.getElementById("search-page");
const casePage = document.getElementById("case-page");
const savedPage = document.getElementById("saved-page");
const aboutPage = document.getElementById("about-page");

const savedResults = document.getElementById("saved-results");

const saveCaseButton =
    document.getElementById("save-case-button");

const clearFiltersButton =
    document.getElementById("clear-filters");

const mobileNav =
    document.getElementById("mobile-nav");

let selectedLaws = [];
let selectedCourts = [];

let currentCaseId = null;


/* Navigation */

function hideAllPages() {
    searchPage.classList.add("hidden");
    casePage.classList.add("hidden");
    savedPage.classList.add("hidden");
    aboutPage.classList.add("hidden");
}

function showSearchPage() {

    hideAllPages();

    searchPage.classList.remove("hidden");

    mobileNav.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showSavedPage() {

    hideAllPages();

    savedPage.classList.remove("hidden");

    mobileNav.classList.remove("open");

    displaySavedCases();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showAboutPage() {

    hideAllPages();

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

document.getElementById("nav-saved")
    .addEventListener("click", showSavedPage);

document.getElementById("mobile-saved")
    .addEventListener("click", showSavedPage);

document.getElementById("nav-about")
    .addEventListener("click", showAboutPage);

document.getElementById("mobile-about")
    .addEventListener("click", showAboutPage);


document.getElementById("mobile-menu-button")
    .addEventListener("click", () => {

        mobileNav.classList.toggle("open");

    });


/* Keyboard Search */

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


/* Search Results */

function displayCases(list) {

    results.innerHTML = "";

    resultCount.textContent =
        `${list.length} case${list.length === 1 ? "" : "s"}`;

    if (list.length === 0) {

        results.innerHTML = `
            <div class="no-results">
                <h3>No cases found</h3>

                <p>
                    Try changing your search or filters.
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


/* Open Case */

function openCase(caseId) {

    const selectedCase =
        cases.find(c => c.id === caseId);

    if (!selectedCase) {
        return;
    }

    currentCaseId = caseId;


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

    document.getElementById("case-facts").textContent =
        selectedCase.facts;

    document.getElementById("case-issues").textContent =
        selectedCase.issues;

    document.getElementById("case-decision").textContent =
        selectedCase.decision;

    document.getElementById("case-significance").textContent =
        selectedCase.significance;

    document.getElementById("judgment-link").href =
        selectedCase.judgment;


    const tags =
        document.getElementById("case-tags");

    tags.innerHTML = `
        <span class="case-tag">${selectedCase.area}</span>
        <span class="case-tag">${selectedCase.court}</span>
        <span class="case-tag">${selectedCase.year}</span>
    `;


    updateSaveButton();


    hideAllPages();

    casePage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


document.getElementById("back-button")
    .addEventListener("click", showSearchPage);


/* Save Cases */

function getSavedCases() {

    return JSON.parse(
        localStorage.getItem("casefinder_saved") || "[]"
    );

}


function saveCurrentCase() {

    if (!currentCaseId) {
        return;
    }

    let savedCases = getSavedCases();

    if (!savedCases.includes(currentCaseId)) {

        savedCases.push(currentCaseId);

    } else {

        savedCases =
            savedCases.filter(
                id => id !== currentCaseId
            );

    }

    localStorage.setItem(
        "casefinder_saved",
        JSON.stringify(savedCases)
    );

    updateSaveButton();

}


function updateSaveButton() {

    const savedCases = getSavedCases();

    const isSaved =
        savedCases.includes(currentCaseId);

    if (isSaved) {

        saveCaseButton.textContent =
            "★ Saved";

        saveCaseButton.classList.add("saved");

    } else {

        saveCaseButton.textContent =
            "☆ Save Case";

        saveCaseButton.classList.remove("saved");

    }

}


saveCaseButton.addEventListener(
    "click",
    saveCurrentCase
);


/* Saved Cases Page */

function displaySavedCases() {

    const savedIds = getSavedCases();

    savedResults.innerHTML = "";

    const savedCases =
        savedIds
            .map(id =>
                cases.find(c => c.id === id)
            )
            .filter(Boolean);


    if (savedCases.length === 0) {

        savedResults.innerHTML = `
            <div class="no-results">

                <h3>No saved cases yet</h3>

                <p>
                    Open a case and select "Save Case"
                    to add it here.
                </p>

            </div>
        `;

        return;
    }


    savedCases.forEach(c => {

        savedResults.innerHTML += `
            <article class="saved-card">

                <h3>${c.name}</h3>

                <div class="case-info">
                    ${c.year} • ${c.court} • ${c.area}
                </div>

                <p>
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


/* Filters */

function createBubble(container, value, type) {

    const bubble =
        document.createElement("div");

    bubble.classList.add("bubble");

    bubble.innerHTML = `
        <span>${value}</span>

        <button
            class="remove-btn"
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

        createBubble(
            lawBubbles,
            law,
            "law"
        );

    });

    selectedCourts.forEach(court => {

        createBubble(
            courtBubbles,
            court,
            "court"
        );

    });

}


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


/* Year Slider */

function updateYearSlider() {

    let min = Number(minYear.value);
    let max = Number(maxYear.value);

    if (min > max) {
        [min, max] = [max, min];
    }

    yearDisplay.textContent =
        `${min} – ${max}`;


    const minPercent =
        ((min - 1900) / 126) * 100;

    const maxPercent =
        ((max - 1900) / 126) * 100;


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


/* Filtering */

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
                    court =>
                        c.court.includes(court)
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


/* Clear */

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


/* Start */

updateYearSlider();
displayCases(cases);
