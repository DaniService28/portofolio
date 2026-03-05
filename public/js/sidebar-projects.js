document.addEventListener("DOMContentLoaded", async () => {
    const submenu = document.getElementById("projects-submenu");
    const toggle = document.getElementById("projects-toggle");

    // Toggle del acordeón
    toggle.addEventListener("click", () => {
        submenu.classList.toggle("open");
    });

    // Cargar proyectos desde JSON
    const res = await fetch("/data/projects.json");
    const projects = await res.json();

    projects.forEach(project => {
        const item = document.createElement("a");
        item.className = "nav-subitem";
        item.textContent = project.title;
        item.dataset.projectId = project.id;

        item.addEventListener("click", () => {
            // Marcar el proyecto seleccionado
            document.querySelectorAll(".nav-subitem").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            // Marcar Projects como activo
            toggle.classList.add("active-group");

            // Cargar contenido
            loadProject(project.id);
        });

        submenu.appendChild(item);
    });
});

// Si haces clic en Profile, Skills o Contact → quitar active-group y active de proyectos
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("projects-toggle");

    // Cuando haces clic en Profile, Skills o Contact
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            if (item !== toggle) {
                // Quitar active-group de Projects
                toggle.classList.remove("active-group");

                // Quitar active de subitems
                document.querySelectorAll(".nav-subitem").forEach(i => i.classList.remove("active"));

                // Cerrar el submenú
                document.getElementById("projects-submenu").classList.remove("open");
            }
        });
    });
});