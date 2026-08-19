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
    }
];

const search = document.getElementById("search");
const results = document.getElementById("results");
const resultCount = document.getElementById("result-count");

function displayCases(list) {
    results.innerHTML = "";

    resultCount.textContent = `${list.length} case${list.length === 1 ? "" : "s"}`;

    if (list.length === 0) {
        results.innerHTML = `
            <div class="no-results">
                <h3>No cases found</h3>
                <p>Try a different case name, year, court or area of law.</p>
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

function searchCases() {
    const term = search.value.toLowerCase().trim();

    if (term === "") {
        displayCases(cases);
        return;
    }

    const filtered = cases.filter(c => {
        return (
            c.name.toLowerCase().includes(term) ||
            c.year.toString().includes(term) ||
            c.court.toLowerCase().includes(term) ||
            c.area.toLowerCase().includes(term) ||
            c.summary.toLowerCase().includes(term)
        );
    });

    displayCases(filtered);
}

search.addEventListener("input", searchCases);

displayCases(cases);
