
// ========================================
// PROJECT ROOT
// ========================================

const projectRoot = new URL(
    "../",
    document.currentScript.src
);


// ========================================
// NAVIGATION ROUTES
// ========================================

const routes = {

    home: "index.html",
    menu: "pages/menu.html",
    about: "pages/about.html",
    contact: "pages/contact.html",
    cart: "pages/menu.html#cart"

};


// ========================================
// LOAD SHARED COMPONENT
// ========================================

async function loadComponent(elementId, fileName) {

    const container = document.getElementById(elementId);

    if (!container) return;

    try {

        const filePath = new URL(
            "pages/shared/" + fileName,
            projectRoot
        );

        const response = await fetch(filePath);

        if (!response.ok) {

            throw new Error(
                "HTTP Error: " + response.status
            );

        }

        container.innerHTML = await response.text();

        console.log("Loaded successfully:", fileName);

    } catch (error) {

        console.error("Component loading error:", error);

        container.textContent =
            "Unable to load " + fileName +
            ". Please run the website using Live Server.";

    }

}


// ========================================
// SET NAVIGATION LINKS
// ========================================

function setNavigationLinks() {

    document.querySelectorAll("[data-route]").forEach(link => {

        const route = link.dataset.route;

        if (routes[route]) {

            link.href = new URL(
                routes[route],
                projectRoot
            ).href;

        }

    });

}


// ========================================
// ACTIVE NAVIGATION
// ========================================

function setActiveNavigation() {

    const currentPage = document.body.dataset.page;

    document.querySelectorAll(".nav-links .nav-tab")
        .forEach(link => {

            const isActive =
                link.dataset.route === currentPage;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "page");

            } else {

                link.removeAttribute("aria-current");

            }

        });

}


// ========================================
// INITIALIZE SHARED COMPONENTS
// ========================================

async function initializeSharedComponents() {

    await Promise.all([

        loadComponent(
            "navbar-placeholder",
            "navbar.html"
        ),

        loadComponent(
            "footer-placeholder",
            "footer.html"
        )

    ]);

    setNavigationLinks();

    setActiveNavigation();

}


// ========================================
// START
// ========================================

initializeSharedComponents();
