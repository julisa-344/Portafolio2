// Datos de los proyectos
const projectsData = {
    calcomaniacos: {
        name: 'Calcomaniacos',
        type: 'E-commerce · UX/UI',
        description: 'Rediseño completo de la experiencia de usuario para una plataforma de stickers personalizados. Enfoque en simplificar el proceso de diseño, optimizar el flujo de compra y crear una interfaz intuitiva que inspire creatividad en los usuarios.',
        tags: ['Research', 'Wireframing', 'Prototyping', 'User Testing', 'Visual Design'],
        images: [
            'fullhome 1.png',
            'login 1.png',
            'register 1.png',
            'cart 1.png',
            'cart-vacio 1.png',
            'cod-verifi 1.png',
            'Group 121.png',
            'Group 141.png',
            'Group 143.png',
            'Group 144.png',
            'Group 145.png',
            'Group 146.png',
            'Group 147.png',
            'Group 148.png',
            'Group 149.png',
            'image 21.png',
            'Screen Shot 2025-06-21 at 18.29.47.png',
            'Screen Shot 2025-06-21 at 18.30.01.png',
            'Screen Shot 2025-06-21 at 18.31.12.png',
            'Screen Shot 2025-06-21 at 18.31.24.png'
        ]
    },
    safety: {
        name: 'Safety',
        type: 'Plataforma Educativa · UX/UI',
        description: 'Diseño de experiencia educativa digital enfocada en Seguridad Industrial. Creación de flujos de aprendizaje intuitivos, arquitectura de información clara y sistema de certificaciones que facilita el acceso a capacitación especializada.',
        tags: ['User Journey', 'Information Architecture', 'E-learning UX', 'Accessibility', 'Interface Design'],
        images: [
            'home.png',
            'inicio.png',
            'inicio-1.png',
            'course.png',
            'serv.png',
            'servin.png',
            'servley.png',
            'serplan.png',
            'cart.png',
            'contac 1.png'
        ]
    },
    xplora: {
        name: 'Xplora',
        type: 'App Móvil · UX/UI',
        description: 'Aplicación móvil para descubrimiento de experiencias locales. Diseño centrado en el usuario que combina geolocalización inteligente con recomendaciones personalizadas, creando una experiencia de exploración fluida y emocionante.',
        tags: ['Mobile UX', 'User Research', 'Interaction Design', 'Usability Testing', 'Design System'],
        images: [
            'xplorahome.png',
            'xplorapage2.png'
        ],
        video: 'xplora.mp4'
    }
};

// Variables para el lightbox
let currentImageIndex = 0;
let currentImages = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    console.log('Inicializando portfolio...');

    // Crear las secciones dinámicamente
    createAllSections();

    // Configurar filtros
    setupFilters();

    // Configurar lightbox
    setupLightbox();

    // Mostrar todos los proyectos apilados por defecto
    setActiveFilterButton('all');
    showSection('all');
}

function createAllSections() {
    const wrapper = document.querySelector('.portfolio-wrapper');
    wrapper.innerHTML = '';

    // Orden personalizado: Xplora primero
    const keys = Object.keys(projectsData);
    const orderedKeys = ['xplora', ...keys.filter(k => k !== 'xplora')];

    orderedKeys.forEach(projectKey => {
        const section = createProjectSection(projectKey, projectsData[projectKey]);
        wrapper.appendChild(section);
    });

    updateFilterCounts();
}

function createProjectSection(projectKey, project) {
    const section = document.createElement('div');
    section.className = 'projects-section';
    section.id = `${projectKey}-section`;

    // Intro del proyecto
    const intro = document.createElement('div');
    intro.className = 'project-intro';
    intro.innerHTML = `
        <div class="project-header">
            <h3 class="project-name">${project.name}</h3>
            <span class="project-type">${project.type}</span>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;

    // Grid de imágenes
    const grid = document.createElement('div');
    grid.className = 'portfolio-grid';

    // Xplora: usar grid especial y spans + video
    if (projectKey === 'xplora') {
        grid.classList.add('grid-xplora');

        // Primera imagen: media anchura
        if (project.images[0]) {
            const item0 = createImageItem(projectKey, project.name, project.images[0]);
            item0.classList.add('span-6');
            grid.appendChild(item0);
        }

        // Segunda imagen: media anchura (misma fila)
        if (project.images[1]) {
            const item1 = createImageItem(projectKey, project.name, project.images[1]);
            item1.classList.add('span-6');
            grid.appendChild(item1);
        }

        // Video (si existe): ancho completo debajo
        if (project.video) {
            const videoWrapper = document.createElement('div');
            videoWrapper.className = 'portfolio-item span-12';
            videoWrapper.innerHTML = `
                <video class="portfolio-video" 
                       muted 
                       loop 
                       autoplay 
                       preload="metadata" 
                       poster="${projectKey}/${project.images[0] || ''}"
                       playsinline>
                    <source src="${projectKey}/${project.video}" type="video/mp4">
                    Tu navegador no soporta la reproducción de video.
                </video>
            `;
            grid.appendChild(videoWrapper);
        }
    } else {
        project.images.forEach(imageName => {
            const item = createImageItem(projectKey, project.name, imageName);
            grid.appendChild(item);
        });
    }

    section.appendChild(intro);
    section.appendChild(grid);
    return section;
}

function createImageItem(projectKey, projectName, imageName) {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.innerHTML = `
        <img src="${projectKey}/${imageName}" alt="${projectName}" class="portfolio-image" loading="lazy">
    `;

    item.addEventListener('click', () => {
        openLightbox(projectKey, imageName);
    });

    return item;
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Mostrar sección
            showSection(filter);
        });
    });
}

function setActiveFilterButton(filter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function showSection(filter) {
    console.log('Mostrando sección:', filter);

    // Siempre mostrar todas las secciones apiladas
    const allSections = document.querySelectorAll('.projects-section');
    allSections.forEach(section => section.classList.remove('is-hidden'));

    if (filter === 'all') {
        // No ocultar nada
        return;
    }

    // Ocultar secciones distintas al filtro
    allSections.forEach(section => {
        const id = section.id;
        const match = id === `${filter}-section`;
        if (!match) {
            section.classList.add('is-hidden');
        }
    });
}

function updateFilterCounts() {
    // Contar total
    const totalImages = Object.values(projectsData).reduce((total, project) => total + project.images.length, 0);
    const allCountElement = document.getElementById('count-all');
    if (allCountElement) allCountElement.textContent = totalImages;

    // Contar por proyecto
    Object.keys(projectsData).forEach(projectKey => {
        const count = projectsData[projectKey].images.length;
        const countElement = document.getElementById(`count-${projectKey}`);
        if (countElement) countElement.textContent = count;
    });
}

// Lightbox functions
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    document.getElementById('lightbox-prev').addEventListener('click', showPreviousImage);
    document.getElementById('lightbox-next').addEventListener('click', showNextImage);
}

function openLightbox(projectKey, imageName) {
    // Preparar array de imágenes SOLO del proyecto actual para navegación
    currentImages = projectsData[projectKey].images.map(imgName => ({ project: projectKey, image: imgName }));

    // Encontrar índice de la imagen actual
    currentImageIndex = currentImages.findIndex(img =>
        img.project === projectKey && img.image === imageName
    );

    showLightboxImage();

    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'block';
    setTimeout(() => lightbox.classList.add('active'), 10);
}

function showLightboxImage() {
    const currentImg = currentImages[currentImageIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = `${currentImg.project}/${currentImg.image}`;

    // Actualizar contador
    const counter = document.querySelector('.lightbox-counter');
    counter.innerHTML = `${currentImageIndex + 1} <span class="counter-separator">de</span> ${currentImages.length}`;

    // Actualizar botones de navegación
    document.getElementById('lightbox-prev').disabled = currentImageIndex === 0;
    document.getElementById('lightbox-next').disabled = currentImageIndex === currentImages.length - 1;
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showLightboxImage();
    }
}

function showNextImage() {
    if (currentImageIndex < currentImages.length - 1) {
        currentImageIndex++;
        showLightboxImage();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 300);
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}
