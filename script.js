const cases = [
    {
        name: "Mabo v Queensland (No 2)",
        year: 1992,
        court: "High Court of Australia",
        area: "Native Title",
        summary: "A landmark High Court decision recognising native title in Australian law."
    },
    {
        name: "Lange v Australian Broadcasting Corporation",
        year: 1997,
        court: "High Court of Australia",
        area: "Constitutional Law",
        summary: "A major decision concerning the implied freedom of political communication under the Australian Constitution."
    },
    {
        name: "Roach v Electoral Commissioner",
        year: 2007,
        court: "High Court of Australia",
        area: "Electoral Law",
        summary: "The High Court considered whether laws preventing prisoners from voting were constitutionally valid."
    },
    {
        name: "Australian Communist Party v Commonwealth",
        year: 1951,
        court: "High Court of Australia",
        area: "Constitutional Law",
        summary: "The High Court considered the constitutional validity of legislation seeking to dissolve the Communist Party of Australia."
    },
    {
        name: "Love v Commonwealth",
        year: 2020,
        court: "High Court of Australia",
        area: "Constitutional Law",
        summary: "The High Court considered the constitutional meaning of alienage and its application to Aboriginal Australians."
    },
    {
        name: "Dietrich v The Queen",
        year: 1992,
        court: "High Court of Australia",
        area: "Criminal Law",
        summary: "A significant case concerning the right to legal representation in serious criminal trials."
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

const clearFiltersButton = document.getElementById("clear-filters");

let selectedLaws = [];
let selectedCourts = [];


/* Display cases */

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
            </article>
        `;
    });
}


/* Create filter bubble */

function createBubble(container, value, type) {
    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    bubble.innerHTML = `
        <span>${value}</span>
        <button class="remove-btn" aria-label="Remove ${value}">
            ×
        </button>
    `;

    bubble
        .querySelector(".remove-btn")
        .addEventListener("click", () => {

            if (type === "law") {
                selectedLaws = selectedLaws.filter(
                    item => item !== value
                );
            }

            if (type === "court") {
                selectedCourts = selectedCourts.filter(
                    item => item !== value
                );
            }

            updateBubbles();
            filterCases();
        });

    container.appendChild(bubble);
}


/* Update filter bubbles */

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


/* Add law filter */

lawSelect.addEventListener("change", () => {

    const value = lawSelect.value;

    if (value && !selectedLaws.includes(value)) {
        selectedLaws.push(value);
    }

    lawSelect.value = "";

    updateBubbles();
    filterCases();
});


/* Add court filter */

courtSelect.addEventListener("change", () => {

    const value = courtSelect.value;

    if (value && !selectedCourts.includes(value)) {
        selectedCourts.push(value);
    }

    courtSelect.value = "";

    updateBubbles();
    filterCases();
});


/* Year range */

function updateYearDisplay() {

    let min = Number(minYear.value);
    let max = Number(maxYear.value);

    if (min > max) {
        [min, max] = [max, min];
    }

    yearDisplay.textContent = `${min} – ${max}`;

    filterCases();
}

minYear.addEventListener("input", updateYearDisplay);
maxYear.addEventListener("input", updateYearDisplay);


/* Search + filters */

function filterCases() {

    const term = search.value.toLowerCase().trim();

    let min = Number(minYear.value);
    let max = Number(maxYear.value);

    if (min > max) {
        [min, max] = [max, min];
    }

    const filtered = cases.filter(c => {

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
            selectedCourts.some(selectedCourt =>
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


/* Search */

search.addEventListener("input", filterCases);


/* Clear filters */

clearFiltersButton.addEventListener("click", () => {

    selectedLaws = [];
    selectedCourts = [];

    lawSelect.value = "";
    courtSelect.value = "";

    minYear.value = 1900;
    maxYear.value = 2026;

    yearDisplay.textContent = "1900 – 2026";

    updateBubbles();
    filterCases();
});


/* Initial display */

displayCases(cases);
