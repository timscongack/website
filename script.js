document.addEventListener('DOMContentLoaded', function() {
    // Check if the current page is not index.html
    if (window.location.pathname !== '/index.html') {
      // Create the button element
      var button = document.createElement('button');
      button.textContent = 'Return to Home';
      button.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 10px 20px; font-size: 16px; background-color: #1F2739; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s, color 0.3s;';

      // Add click event listener to redirect to the home page
      button.addEventListener('click', function() {
        window.location.href = 'index.html';
      });

      // Append the button to the document body
      document.body.appendChild(button);
    }

    document.getElementById('scrollBtn').addEventListener('click', function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    document.getElementById('scrollBtn').addEventListener('click', function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Tim Scongack`;

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
    skills.forEach(skill => {
      const div = document.createElement('div');
      div.classList.add('skills-item');
      div.innerHTML = `
        <i class="${skill.icon}"></i>
        <span>${skill.name}</span>
      `;
      skillsGrid.appendChild(div);
    });

    const portfolioItems = [
      {
        icon: "fas fa-chart-line",
        description: "Javascript Dashboard.",
        link: "data-vis/index.html"
      },
      {
        icon: "fas fa-code",
        description: "Website - Power BI Consultancy Company.",
        link: "powerbi-website/index.html"
      },
      {
        icon: "fas fa-gamepad",
        description: "Javascript Game",
        link: "game/index.html"
      },
      {
        icon: "fas fa-sitemap",
        description: "Classifying Poisonous Mushrooms.",
        link: "classification.html"
      }
    ];

    // Fill portfolio items
    const portfolioGrid = document.querySelector(".portfolio-grid");
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
  });