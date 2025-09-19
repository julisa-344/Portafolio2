// Datos de los proyectos y sus imágenes
const projectsData = {
    calcomaniacos: {
        name: 'Calcomaniacos',
        description: 'Aplicación web para diseño y venta de stickers personalizados con editor visual en tiempo real',
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
        description: 'Plataforma en línea enfocada en Seguridad Industrial y Salud Ocupacional para el sector construcción',
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
        description: 'Aplicación de exploración y descubrimiento de lugares con experiencias únicas',
        images: [
            'xplorahome.png',
            'xplorapage2.png'
        ]
    }
};

// Variables globales
let currentImages = [];
let currentImageIndex = 0;
let filteredImages = [];

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
    setupSmoothScrolling();
    setupHeaderAnimation();
});

// Función principal para inicializar el portfolio
function initializePortfolio() {
    console.log('Inicializando portfolio...');
    const allProjectsGrid = document.getElementById('portfolioGrid');
    console.log('Grid encontrado:', allProjectsGrid);
    
    // Crear todas las imágenes para la vista "Todos"
    Object.keys(projectsData).forEach(projectKey => {
        const project = projectsData[projectKey];
        console.log(`Procesando proyecto: ${projectKey} con ${project.images.length} imágenes`);
        project.images.forEach((imageName, index) => {
            const portfolioItem = createPortfolioItem(projectKey, project, imageName, index);
            allProjectsGrid.appendChild(portfolioItem);
            currentImages.push({
                element: portfolioItem,
                project: projectKey,
                imageName: imageName,
                category: project.name
            });
        });
    });
    
    // Crear secciones individuales para cada proyecto
    Object.keys(projectsData).forEach(projectKey => {
        const projectGrid = document.getElementById(`${projectKey}-grid`);
        console.log(`Grid para ${projectKey}:`, projectGrid);
        if (projectGrid) {
            const project = projectsData[projectKey];
            project.images.forEach((imageName, index) => {
                const portfolioItemCopy = createPortfolioItem(projectKey, project, imageName, index);
                projectGrid.appendChild(portfolioItemCopy);
            });
        }
    });
    
    filteredImages = [...currentImages];
    updateFilterCounts();
    
    // Animar la aparición de las imágenes
    setTimeout(() => {
        const allProjectsSection = document.getElementById('all-projects');
        if (allProjectsSection) {
            allProjectsSection.classList.add('active');
            
            const items = allProjectsSection.querySelectorAll('.portfolio-item');
            console.log(`Animando ${items.length} items iniciales`);
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 30);
            });
        }
    }, 100);
}

// Actualizar contadores de filtros
function updateFilterCounts() {
    // Contar todas las imágenes
    document.getElementById('count-all').textContent = currentImages.length;
    
    // Contar por proyecto
    Object.keys(projectsData).forEach(projectKey => {
        const count = currentImages.filter(img => img.project === projectKey).length;
        const countElement = document.getElementById(`count-${projectKey}`);
        if (countElement) {
            countElement.textContent = count;
        }
    });
}

// Crear elemento de portfolio
function createPortfolioItem(projectKey, project, imageName, index) {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = `portfolio-item ${projectKey}`;
    portfolioItem.dataset.category = projectKey;
    portfolioItem.dataset.imageName = imageName;
    
    portfolioItem.innerHTML = `
        <img src="${projectKey}/${imageName}" alt="Imagen de ${project.name}" class="portfolio-image" loading="lazy">
    `;
    
    // Agregar evento click para abrir lightbox
    portfolioItem.addEventListener('click', () => {
        openLightboxFromProject(projectKey, imageName);
    });
    
    return portfolioItem;
}

// Función para abrir lightbox desde un proyecto específico
function openLightboxFromProject(projectKey, imageName) {
    // Determinar qué conjunto de imágenes usar según la vista actual
    const activeSection = document.querySelector('.projects-section.active');
    let imagesToUse = [];
    
    if (activeSection && activeSection.id === 'all-projects') {
        // Vista "Todos" - usar todas las imágenes
        imagesToUse = currentImages;
    } else {
        // Vista de proyecto específico - usar solo las imágenes de ese proyecto
        imagesToUse = currentImages.filter(img => img.project === projectKey);
    }
    
    const imageIndex = imagesToUse.findIndex(img => 
        img.project === projectKey && img.imageName === imageName
    );
    
    if (imageIndex !== -1) {
        filteredImages = imagesToUse;
        currentImageIndex = imageIndex;
        openLightboxDirect();
    }
}

// Generar título legible desde el nombre del archivo
function getImageTitle(imageName) {
    return imageName
        .replace(/\.(png|jpg|jpeg)$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace(/(\d+)/g, ' $1')
        .trim();
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            setActiveFilter(button);
            filterPortfolioItems(filter);
        });
    });
    
    // Navegación móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Lightbox
    setupLightbox();
}

// Filtrar elementos del portfolio
function filterPortfolioItems(filter) {
    console.log('Filtrando por proyecto:', filter);
    
    // Actualizar botones activos
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('.projects-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección apropiada
    setTimeout(() => {
        const targetSection = filter === 'all' 
            ? document.getElementById('all-projects')
            : document.getElementById(`${filter}-section`);
            
        if (targetSection) {
            targetSection.classList.add('active');
            console.log(`Mostrando sección: ${targetSection.id}`);
        } else {
            console.error(`No se encontró la sección para: ${filter}`);
        }
    }, 100);
}

// Configurar lightbox
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    // Cerrar lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Navegación con botones
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);
}

// Abrir lightbox directamente con índice ya calculado
function openLightboxDirect() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    const imageData = filteredImages[currentImageIndex];
    
    lightboxImg.src = `${imageData.project}/${imageData.imageName}`;
    lightboxImg.alt = `Imagen de ${imageData.category}`;
    
    // Actualizar contador
    lightboxCurrent.textContent = currentImageIndex + 1;
    lightboxTotal.textContent = filteredImages.length;
    
    // Actualizar botones de navegación
    lightboxPrev.disabled = currentImageIndex === 0;
    lightboxNext.disabled = currentImageIndex === filteredImages.length - 1;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animar la aparición
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

// Cerrar lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Mostrar imagen anterior
function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
    }
}

// Mostrar imagen siguiente
function showNextImage() {
    if (currentImageIndex < filteredImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
    }
}

// Actualizar imagen en lightbox
function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const imageData = filteredImages[currentImageIndex];
    
    // Efecto de fade
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = `${imageData.project}/${imageData.imageName}`;
        lightboxImg.alt = `Imagen de ${imageData.category}`;
        
        // Actualizar contador
        lightboxCurrent.textContent = currentImageIndex + 1;
        
        // Actualizar botones de navegación
        lightboxPrev.disabled = currentImageIndex === 0;
        lightboxNext.disabled = currentImageIndex === filteredImages.length - 1;
        
        lightboxImg.style.opacity = '1';
    }, 150);
}

// Configurar scroll suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animación del header al hacer scroll
function setupHeaderAnimation() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar header en scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Lazy loading para imágenes
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Animación de entrada para elementos al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.portfolio-item, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Manejar errores de carga de imágenes
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Error al cargar imagen:', e.target.src);
    }
}, true);

// Precargar imágenes críticas
function preloadCriticalImages() {
    const criticalImages = [
        'calcomaniacos/fullhome 1.png',
        'safety/home.png',
        'xplora/xplorahome.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar funciones adicionales
window.addEventListener('load', () => {
    setupScrollAnimations();
    preloadCriticalImages();
    optimizeMasonryLayout();
});

// Optimizar el layout masonry después de que todas las imágenes se carguen
function optimizeMasonryLayout() {
    const images = document.querySelectorAll('.portfolio-image');
    let loadedImages = 0;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    // Todas las imágenes están cargadas, reorganizar si es necesario
                    reorganizeMasonry();
                }
            });
        }
    });
    
    // Si todas las imágenes ya están cargadas
    if (loadedImages === images.length) {
        reorganizeMasonry();
    }
}

// Performance: Debounce para scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
