// Garden tracker with localStorage
const gardenKey = 'myGarden';

function loadGarden() {
    const entries = JSON.parse(localStorage.getItem(gardenKey) || '[]');
    const container = document.getElementById('garden-container');
    container.innerHTML = '';
    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
            <h3>${entry.plantName}</h3>
            <p><strong>Date Planted:</strong> ${entry.datePlanted}</p>
            <p><strong>Notes:</strong> ${entry.notes}</p>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        container.appendChild(entryDiv);
    });
}

function saveGarden(entries) {
    localStorage.setItem(gardenKey, JSON.stringify(entries));
}

function addEntry(plantName, datePlanted, notes) {
    const entries = JSON.parse(localStorage.getItem(gardenKey) || '[]');
    entries.push({ plantName, datePlanted, notes });
    saveGarden(entries);
    loadGarden();
}

function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem(gardenKey) || '[]');
    entries.splice(index, 1);
    saveGarden(entries);
    loadGarden();
}

document.getElementById('garden-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const plantName = document.getElementById('plant-name').value;
    const datePlanted = document.getElementById('date-planted').value;
    const notes = document.getElementById('notes').value;
    addEntry(plantName, datePlanted, notes);
    this.reset();
});

// Load entries on page load
loadGarden();