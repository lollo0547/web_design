/**
 * PORTFOLIO DI LORENZO GIUDICI - PROJECT STORYTELLING
 * Enhanced storytelling component for projects
 */

class ProjectStorytelling {
  constructor() {
    this.projects = {};
    this.init();
  }

  init() {
    // Initialize the storytelling components when lightbox is opened
    document.addEventListener('lightbox:opened', this.handleLightboxOpen.bind(this));
    
    // Add project data
    this.addProjectData();
  }

  addProjectData() {
    // Coffee Set Project
    this.projects['coffee-set'] = {
      id: 'coffee-set',
      title: {
        it: 'Set da caffè',
        en: 'Coffee set'
      },
      objective: {
        it: 'Creare un set da caffè elegante e funzionale che combini estetica contemporanea ed ergonomia.',
        en: 'Create an elegant and functional coffee set that combines contemporary aesthetics and ergonomics.'
      },
      challenge: {
        it: 'Bilanciare l\'aspetto estetico con la praticità d\'uso, considerando le proprietà dei materiali e l\'esperienza utente.',
        en: 'Balance aesthetic appeal with practical usability, considering material properties and user experience.'
      },
      process: {
        it: [
          'Ricerca di mercato e analisi dei trend nel design di oggetti per la casa',
          'Studio dell\'ergonomia della presa per garantire comfort e stabilità',
          'Schizzi concettuali e sviluppo di diverse proposte formali',
          'Modellazione 3D delle soluzioni selezionate',
          'Perfezionamento dei dettagli e prototipazione virtuale',
          'Render fotorealistici per valutare l\'aspetto finale'
        ],
        en: [
          'Market research and analysis of trends in home object design',
          'Study of grip ergonomics to ensure comfort and stability',
          'Concept sketches and development of different formal proposals',
          '3D modeling of selected solutions',
          'Refinement of details and virtual prototyping',
          'Photorealistic renders to evaluate the final appearance'
        ]
      },
      tools: ['Blender', 'SolidWorks', 'Photoshop', 'Illustrator'],
      materials: {
        it: ['Ceramica', 'Porcellana', 'Legno'],
        en: ['Ceramic', 'Porcelain', 'Wood']
      },
      results: {
        it: 'Un set da caffè che unisce eleganza contemporanea e funzionalità, caratterizzato da linee pulite e un\'attenta considerazione dell\'esperienza d\'uso. Il progetto dimostra come il design possa elevare anche oggetti quotidiani a elementi di distinzione estetica.',
        en: 'A coffee set that combines contemporary elegance and functionality, characterized by clean lines and careful consideration of the user experience. The project demonstrates how design can elevate even everyday objects to elements of aesthetic distinction.'
      },
      reflection: {
        it: 'Questo progetto mi ha insegnato l\'importanza dell\'iterazione nel processo di design. La versione finale è il risultato di numerosi cicli di raffinamento, ognuno dei quali ha portato miglioramenti significativi nella forma e nella funzionalità.',
        en: 'This project taught me the importance of iteration in the design process. The final version is the result of numerous refinement cycles, each of which brought significant improvements in form and functionality.'
      },
      images: [
        {
          src: '/immagini/webp/progetto 1/all 22.webp',
          alt: {
            it: 'Set da caffè - Vista d\'insieme',
            en: 'Coffee set - Overall view'
          }
        },
        {
          src: '/immagini/webp/progetto 1/tazzina_.webp',
          alt: {
            it: 'Tazzina da caffè - Dettaglio',
            en: 'Coffee cup - Detail'
          }
        },
        {
          src: '/immagini/webp/progetto 1/zuccheriera 2_.webp',
          alt: {
            it: 'Zuccheriera - Dettaglio',
            en: 'Sugar bowl - Detail'
          }
        }
      ]
    };

    // Add data for the cardanica project
    this.projects['cardanica'] = {
      id: 'cardanica',
      title: {
        it: 'La cardanica',
        en: 'The Cardanica'
      },
      objective: {
        it: 'Creare un modello 3D preciso ed educativo di un giunto cardanico, evidenziando il funzionamento del meccanismo.',
        en: 'Create an accurate and educational 3D model of a cardanic joint, highlighting the mechanism\'s operation.'
      },
      challenge: {
        it: 'Rappresentare con precisione la complessità geometrica e i movimenti meccanici del giunto, mantenendo un aspetto visivamente gradevole.',
        en: 'Accurately represent the geometric complexity and mechanical movements of the joint while maintaining a visually pleasing appearance.'
      },
      process: {
        it: [
          'Studio tecnico del funzionamento dei giunti cardanici',
          'Analisi dei componenti e dei vincoli meccanici',
          'Disegno tecnico preliminare delle parti',
          'Modellazione 3D parametrica delle componenti',
          'Assemblaggio virtuale e verifica delle interferenze',
          'Simulazione del movimento per verificare la correttezza meccanica',
          'Rendering finali con diversi materiali e finiture'
        ],
        en: [
          'Technical study of cardan joint operation',
          'Analysis of components and mechanical constraints',
          'Preliminary technical drawing of parts',
          'Parametric 3D modeling of components',
          'Virtual assembly and interference checking',
          'Movement simulation to verify mechanical correctness',
          'Final renderings with different materials and finishes'
        ]
      },
      tools: ['SolidWorks', 'Blender', 'KeyShot'],
      materials: {
        it: ['Acciaio', 'Alluminio', 'Ottone'],
        en: ['Steel', 'Aluminum', 'Brass']
      },
      results: {
        it: 'Un modello 3D funzionale di una cardanica che illustra chiaramente il principio di funzionamento del giunto. Il modello può essere utilizzato sia per scopi educativi che come riferimento tecnico.',
        en: 'A functional 3D model of a cardanic joint that clearly illustrates the working principle of the joint. The model can be used both for educational purposes and as a technical reference.'
      },
      reflection: {
        it: 'Questo progetto ha rafforzato la mia comprensione dell\'importanza della precisione nella modellazione 3D tecnica. Ho imparato a bilanciare il rigore ingegneristico con l\'estetica della presentazione.',
        en: 'This project reinforced my understanding of the importance of precision in technical 3D modeling. I learned to balance engineering rigor with presentation aesthetics.'
      },
      images: [
        {
          src: '/immagini/webp/progetto 2/cardanica.webp',
          alt: {
            it: 'Cardanica - Vista frontale',
            en: 'Cardanic joint - Front view'
          }
        },
        {
          src: '/immagini/webp/progetto 2/cardanica 600.webp',
          alt: {
            it: 'Cardanica - Vista dettagliata',
            en: 'Cardanic joint - Detailed view'
          }
        },
        {
          src: '/immagini/webp/progetto 2/cardanica 900.webp',
          alt: {
            it: 'Cardanica - Vista esplosa',
            en: 'Cardanic joint - Exploded view'
          }
        }
      ]
    };
  }

  handleLightboxOpen(event) {
    const projectId = event.detail?.projectId;
    if (projectId && this.projects[projectId]) {
      this.renderProjectStory(this.projects[projectId]);
    }
  }

  renderProjectStory(project) {
    // Target the lightbox content area
    const contentArea = document.querySelector('.lightbox-content .project-story');
    if (!contentArea) return;

    // Get current language
    const currentLang = document.documentElement.lang || 'it';
    
    // Create the storytelling template
    const storyHTML = `
      <div class="story-section objective">
        <h4>${currentLang === 'it' ? 'Obiettivo' : 'Objective'}</h4>
        <p>${project.objective[currentLang]}</p>
      </div>
      
      <div class="story-section challenge">
        <h4>${currentLang === 'it' ? 'Sfida' : 'Challenge'}</h4>
        <p>${project.challenge[currentLang]}</p>
      </div>
      
      <div class="story-section process">
        <h4>${currentLang === 'it' ? 'Processo' : 'Process'}</h4>
        <ol>
          ${project.process[currentLang].map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
      
      <div class="story-section tools-materials">
        <div class="tools">
          <h4>${currentLang === 'it' ? 'Strumenti' : 'Tools'}</h4>
          <ul class="tools-list">
            ${project.tools.map(tool => `<li>${tool}</li>`).join('')}
          </ul>
        </div>
        
        <div class="materials">
          <h4>${currentLang === 'it' ? 'Materiali' : 'Materials'}</h4>
          <ul class="materials-list">
            ${project.materials[currentLang].map(material => `<li>${material}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="story-section results">
        <h4>${currentLang === 'it' ? 'Risultati' : 'Results'}</h4>
        <p>${project.results[currentLang]}</p>
      </div>
      
      <div class="story-section reflection">
        <h4>${currentLang === 'it' ? 'Riflessioni' : 'Reflections'}</h4>
        <p>${project.reflection[currentLang]}</p>
      </div>
      
      <div class="story-section gallery">
        <h4>${currentLang === 'it' ? 'Galleria' : 'Gallery'}</h4>
        <div class="image-gallery">
          ${project.images.map(img => `
            <figure>
              <picture>
                <source srcset="${img.src}" type="image/webp">
                <img src="${img.src}" alt="${img.alt[currentLang]}" loading="lazy">
              </picture>
              <figcaption>${img.alt[currentLang]}</figcaption>
            </figure>
          `).join('')}
        </div>
      </div>
    `;
    
    // Insert the HTML into the content area
    contentArea.innerHTML = storyHTML;
    
    // Add animation classes
    setTimeout(() => {
      const sections = contentArea.querySelectorAll('.story-section');
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('animate-in');
        }, 100 * index);
      });
    }, 300);
  }
}

// Initialize the storytelling component
const projectStorytelling = new ProjectStorytelling();
