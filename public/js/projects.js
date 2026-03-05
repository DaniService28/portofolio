document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("projects-container");

    const res = await fetch("/data/projects.json");
    const projects = await res.json();

    projects.forEach(project => {
        // Row del proyecto
        const row = document.createElement("div");
        row.className = "project-row";
        row.innerHTML = `
            <div class="project-header">
                <h3>${project.title}</h3>
                <p>${project.short}</p>
            </div>
        `;

        // Panel expandible
        const panel = document.createElement("div");
        panel.className = "project-panel";
        panel.innerHTML = `
            <p>${project.description}</p>
            <strong>Technologies:</strong>
            <ul>
                ${project.technologies.map(t => `<li>${t}</li>`).join("")}
            </ul>
        `;

        panel.style.display = "none";

        // Toggle
        row.addEventListener("click", () => {
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        });

        container.appendChild(row);
        container.appendChild(panel);
    });
});