// Load and display projects from data/projects.json
fetch('/data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const container = document.getElementById('projects-container');
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = `
                <h2><a href="${project.url}" target="_blank">${project.name}</a></h2>
                <p>${project.description}</p>
            `;
            container.appendChild(projectDiv);
        });
    })
    .catch(error => console.error('Error loading projects:', error));