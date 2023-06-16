document.addEventListener('DOMContentLoaded', function() {
  var currentLocation = window.location.href;
  var headerHeight = document.querySelector('.header').offsetHeight;
  var controlsDiv = document.getElementById('controls');
  controlsDiv.style.top = headerHeight + 'px';

  // Check if the current location is the main directory of the website
  if (!currentLocation.endsWith('/')) {
      // Create the button element
      var button = document.createElement('button');
      button.innerHTML = 'Click Me';
      button.style.display = 'none';

      // Add an event listener to the button
      button.addEventListener('click', function() {
          // Perform some action when the button is clicked
          console.log('Button clicked!');
      });

      // Append the button to the document body
      document.body.appendChild(button);
  }

  var scrollBtn = document.getElementById('scrollBtn');
  if (scrollBtn) {
      scrollBtn.addEventListener('click', function() {
          window.scrollTo({top: 0, behavior: 'smooth'});
      });
  }

  var copyright = document.getElementById('copyright');
  if (copyright) {
      copyright.textContent = `© ${new Date().getFullYear()} Tim Scongack`;
  }

  const skills = [
      {
          name: "JavaScript",
          icon: "fab fa-js-square"
      },
      {
          name: "Python",
          icon: "fab fa-python"
      },
      {
          name: "SQL/SQL Server",
          icon: "fas fa-database"
      },
      {
          name: "Machine Learning",
          icon: "fas fa-robot"
      }
  ];

  // Fill skills grid
  const skillsGrid = document.querySelector(".skills-grid");
  if (skillsGrid) {
      skills.forEach(skill => {
          const div = document.createElement('div');
          div.classList.add('skills-item');
          div.innerHTML = `
          <i class="${skill.icon}"></i>
          <span>${skill.name}</span>
          `;
          skillsGrid.appendChild(div);
      });
  }

  const portfolioItems = [
      {
          icon: "fas fa-chart-line",
          description: "Javascript Dashboard",
          link: "data-vis/index.html"
      },
      {
          icon: "fas fa-code",
          description: "Website - Power BI Consultancy Company",
          link: "powerbi-website/index.html"
      },
      {
          icon: "fas fa-gamepad",
          description: "Javascript Game",
          link: "game/index.html"
      },
      {
          icon: "fas fa-sitemap",
          description: "Classifying Poisonous Mushrooms",
          link: "classification.html"
      },
      {
          icon: "fas fa-camera",
          description: "Visual Filter App",
          link: "FilterApp/index.html"
      }
  ];

  // Fill portfolio items
  const portfolioGrid = document.querySelector(".portfolio-grid");
  if (portfolioGrid) {
      portfolioItems.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('portfolio-item');
          div.innerHTML = `
          <i class="${item.icon}"></i>
          <p><a href="${item.link}">${item.description}</a></p>
          `;
          portfolioGrid.appendChild(div);
      });

      // Add event listener to update link color when hovered
      const portfolioLinks = document.querySelectorAll(".portfolio-item a");
      portfolioLinks.forEach(link => {
          link.addEventListener('mouseover', function() {
              link.style.color = '#88ff88';
          });
          link.addEventListener('mouseout', function() {
              link.style.color = '';
          });
          link.addEventListener('click', function(event) {
              event.preventDefault();
              link.style.color = "#88ff88";
              setTimeout(() => {
                  window.location.href = link.getAttribute('href');
              }, 500);
          });
      });
  }
});
