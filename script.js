const cases = [
    {
        name: "Mabo v Queensland (No 2)",
        year: 1992,
        area: "Native Title"
    },
    {
        name: "Lange v ABC",
        year: 1997,
        area: "Constitutional"
    },
    {
        name: "Roach v Electoral Commissioner",
        year: 2007,
        area: "Electoral Law"
    }
];

const search = document.getElementById("search");
const results = document.getElementById("results");

function displayCases(list) {
    results.innerHTML = "";

    list.forEach(c => {
        results.innerHTML += `
            <div>
                <h3>${c.name}</h3>
                <p>${c.year}</p>
                <p>${c.area}</p>
                <hr>
            </div>
        `;
    });
}

displayCases(cases);

search.addEventListener("input", () => {
    const term = search.value.toLowerCase();

    const filtered = cases.filter(c =>
        c.name.toLowerCase().includes(term)
    );

    displayCases(filtered);
});
