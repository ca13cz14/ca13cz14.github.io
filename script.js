const data = [
    { phrase: "Building a diverse range of communities", category: "Housing & Communities", tags: ["Housing", "Communities"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Enhanced public understanding", category: "Public Engagement", tags: ["Public Awareness", "Communication"], source: "Historic England Places Strategy (2018)" },
    { phrase: "Empirical evidence", category: "Evidence & Planning", tags: ["Data", "Evidence"], source: "TCPA Tomorrow 125 (March 24)" },
    { phrase: "Championing local heritage", category: "Heritage & Culture", tags: ["Heritage", "Preservation"], source: "Historic England Places Strategy (2018)" },
    { phrase: "Social Equality", category: "Social Justice", tags: ["Social Equality", "Justice"], source: "TCPA Tomorrow 125 (March 24)" },
    { phrase: "Walkable Streetscapes", category: "Urban Design", tags: ["Urban Design", "Mobility"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Community-Led Regeneration", category: "Regeneration", tags: ["Community", "Local Initiatives"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Effective stewardship", category: "Sustainability", tags: ["Sustainability", "Governance"], source: "UN SDG Report (2024)" },
    { phrase: "Place-based working", category: "Local Governance", tags: ["Local Governance", "Policy"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Climate smart cities", category: "Sustainability", tags: ["Climate", "Environmental Resilience"], source: "UN SDG Report (2024)" },
    { phrase: "Affordable Homes and Strong Communities", category: "Housing & Communities", tags: ["Affordable Housing", "Communities"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Resilience of social infrastructure", category: "Infrastructure & Resilience", tags: ["Infrastructure", "Resilience"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Sustainable urban regeneration", category: "Regeneration", tags: ["Urban Regeneration", "Sustainability"], source: "UN SDG Report (2024)" },
    { phrase: "Integrated and sustainable approach", category: "Sustainability", tags: ["Sustainability", "Integration"], source: "UN SDG Report (2024)" },
    { phrase: "Reducing carbon emissions", category: "Environmental Policy", tags: ["Climate", "Carbon Emissions"], source: "UN SDG Report (2024)" },
    { phrase: "Brownfield first approach", category: "Urban Development", tags: ["Brownfield", "Urban Development"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Place-based regeneration", category: "Regeneration", tags: ["Place-based", "Regeneration"], source: "UN SDG Report (2024)" },
    { phrase: "Collaborative decision-making", category: "Governance & Collaboration", tags: ["Collaboration", "Governance"], source: "UN SDG Report (2024)" },
    { phrase: "Inclusive planning and design", category: "Urban Design", tags: ["Inclusive Design", "Planning"], source: "Homes England Strategic Plan (2023-28)" },
    { phrase: "Empowering communities", category: "Community Empowerment", tags: ["Empowerment", "Communities"], source: "UN SDG Report (2024)" }
];

function displayResults(filteredData = data) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear current results

    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>Phrase: ${item.phrase}</h3>
                <p>Category: ${item.category}</p>
                <p>Tags: ${item.tags.join(", ")}</p>
                <p>Source: ${item.source}</p>
            `;
            card.onclick = () => {
                card.style.transition = "transform 0.2s ease";
                card.style.transform = "scale(1.15)";
                setTimeout(() => openModal(item), 200); // Delay to complete animation before modal opens
            };
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results found</p>";
    }
}

function openModal(item) {
    document.getElementById("modal-title").textContent = `Phrase: ${item.phrase}`;
    document.getElementById("modal-description").textContent = "Full phrase description and details here."; 
    document.getElementById("modal-category").textContent = item.category;
    document.getElementById("modal-tags").textContent = item.tags.join(", ");
    document.getElementById("modal-source").textContent = item.source;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Apply filters function
function applyFilters() {
    const searchText = document.getElementById("search-bar").value.toLowerCase();
    const categoryFilter = document.getElementById("category-filter").value;
    const tagsFilter = Array.from(document.getElementById("tags-filter").selectedOptions).map(opt => opt.value);
    const sourceFilter = document.getElementById("source-filter").value;

    const filteredData = data.filter(item => {
        const itemText = `${item.phrase} ${item.category} ${item.tags.join(" ")} ${item.source}`.toLowerCase();
        const matchesSearch = itemText.includes(searchText);
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesTags = tagsFilter.length === 0 || tagsFilter.every(tag => item.tags.includes(tag));
        const matchesSource = !sourceFilter || item.source === sourceFilter;
        return matchesSearch && matchesCategory && matchesTags && matchesSource;
    });

    displayResults(filteredData);
}

// Event listeners for search and filter changes
document.getElementById("search-bar").addEventListener("input", applyFilters);
document.getElementById("category-filter").addEventListener("change", applyFilters);
document.getElementById("source-filter").addEventListener("change", applyFilters);
document.getElementById("tags-filter").addEventListener("change", applyFilters);

// Clear filters functionality
document.getElementById("clear-filters").onclick = () => {
    document.getElementById("search-bar").value = "";
    document.getElementById("category-filter").value = "";
    Array.from(document.getElementById("tags-filter").options).forEach(option => option.selected = false);
    document.getElementById("source-filter").value = "";

    // Show all results after clearing filters
    displayResults(data);
};

// Initial load to display all data when the page is first opened
window.onload = () => displayResults(data);

// Enhanced modal close button functionality
document.querySelector(".close-button").addEventListener("click", () => {
    const modal = document.getElementById("modal");

    // Fade-out effect for closing modal
    modal.style.transition = "opacity 0.3s ease";
    modal.style.opacity = 0;

    // Hide the modal after the fade-out transition completes
    setTimeout(() => {
        modal.style.display = "none";
        modal.style.opacity = 1; // Reset opacity for next open
    }, 300);
});

// Add click event to close the modal if the user clicks outside of the modal content
document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) {
        closeModal();
    }
});











