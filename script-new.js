// Datos de los proyectos
const projectsData = {
    calcomaniacos: {
        name: 'Calcomaniacos',
        type: 'E-commerce · UX/UI',
        description: 'Aplicación web para diseño y venta de stickers personalizados con editor visual en tiempo real, sistema de pagos integrado y dashboard administrativo.',
        tags: ['React', 'Node.js', 'PayPal API', 'Canvas API', 'MongoDB'],
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
        description: 'Plataforma en línea enfocada en Seguridad Industrial y Salud Ocupacional para el sector construcción con cursos interactivos y certificaciones.',
        tags: ['Vue.js', 'Firebase', 'Video API', 'Quiz Engine', 'Bootstrap'],
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
        description: 'Aplicación móvil de exploración y descubrimiento de lugares únicos con experiencias personalizadas basadas en geolocalización.',
        tags: ['React Native', 'Google Maps', 'GPS', 'Firebase', 'Material Design'],
        images: [
            'xplorahome.png',
            'xplorapage2.png'
        ]
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
    
    // Mostrar todos los proyectos por defecto
    showSection('all');
}

function createAllSections() {
    const wrapper = document.querySelector('.portfolio-wrapper');
    wrapper.innerHTML = '';
    
    // Crear sección "Todos los proyectos"
    const allSection = createAllProjectsSection();
    wrapper.appendChild(allSection);
    
    // Crear secciones individuales
    Object.keys(projectsData).forEach(projectKey => {
        const section = createProjectSection(projectKey, projectsData[projectKey]);
        wrapper.appendChild(section);
    });
    
    updateFilterCounts();
}

function createAllProjectsSection() {
    const section = document.createElement('div');
    section.className = 'projects-section active';
    section.id = 'all-projects';
    
    const grid = document.createElement('div');
    grid.className = 'portfolio-grid';
    
    // Agregar todas las imágenes
    Object.keys(projectsData).forEach(projectKey => {
        const project = projectsData[projectKey];
        project.images.forEach(imageName => {
            const item = createImageItem(projectKey, project.name, imageName);
            grid.appendChild(item);
        });
    });
    
    section.appendChild(grid);
    return section;
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
    
    project.images.forEach(imageName => {
        const item = createImageItem(projectKey, project.name, imageName);
        grid.appendChild(item);
    });
    
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

function showSection(filter) {
    console.log('Mostrando sección:', filter);
    
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('.projects-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección correcta
    const targetId = filter === 'all' ? 'all-projects' : `${filter}-section`;
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`Sección ${targetId} activada`);
    } else {
        console.error(`No se encontró la sección: ${targetId}`);
    }
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
    // Preparar array de imágenes para navegación
    currentImages = [];
    Object.keys(projectsData).forEach(pKey => {
        projectsData[pKey].images.forEach(imgName => {
            currentImages.push({ project: pKey, image: imgName });
        });
    });
    
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
