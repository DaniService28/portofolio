async function loadProject(id) {
    const res = await fetch("/data/projects.json");
    const projects = await res.json();

    const project = projects.find(p => p.id === id);
    if (!project) return;

    // 1. Limpiar active de nav-items principales
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));

    // 2. Marcar Projects como active-group
    document.getElementById("projects-toggle").classList.add("active-group");

    // 3. Limpiar active de subitems
    document.querySelectorAll(".nav-subitem").forEach(i => i.classList.remove("active"));

    // 4. Marcar el proyecto seleccionado
    const selected = document.querySelector(`[data-project-id="${id}"]`);
    if (selected) selected.classList.add("active");

    // 5. Cargar contenido
    const content = document.getElementById("content-area");
    content.innerHTML = `
        <h1>${project.title}</h1>
        <div class="section-divider"></div>
        <p>${project.description}</p>
        <h2>Technologies</h2>
        <ul>
            ${project.technologies.map(t => `<li>${t}</li>`).join("")}
        </ul>
        <div id="network-panel-container"></div>
        <div id="dynamic-fields"></div>
        <pre id="server-response"></pre>

    `;

    // 6. Si es el proyecto networking-microservice, cargar panel extra
    if (id === "networking-microservice") {
        const panelRes = await fetch("/partials/network");
        const panelHTML = await panelRes.text();
        document.getElementById("network-panel-container").innerHTML = panelHTML;

        if (typeof connectToBridge === "function") {
            connectToBridge();
            }
    }

}