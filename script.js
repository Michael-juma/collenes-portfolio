// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      }
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Form submission handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const service = document.getElementById("service").value
  const message = document.getElementById("message").value

  // Log form data (in production, this would send to a server)
  console.log("[v0] Form submitted with data:", {
    name,
    email,
    phone,
    service,
    message,
  })

  // Prepare WhatsApp message and open chat with predefined number
  try {
    const waNumber = "254704512567"; // international format without + (Kenya)
    // Build a readable message using newlines; encodeURIComponent will handle encoding
    const waText = `*New contact form submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${service}\n*Message:* ${message}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in new tab/window (mobile will open the app if available)
    window.open(waUrl, "_blank", "noopener,noreferrer")
  } catch (err) {
    console.warn("Could not open WhatsApp link:", err)
  }

  // Show success message
  const successAlert = document.getElementById("formSuccess")
  successAlert.style.display = "block"

  // Reset form
  this.reset()

  // Hide success message after 5 seconds
  setTimeout(() => {
    successAlert.style.display = "none"
  }, 5000)

  // Scroll to success message
  successAlert.scrollIntoView({ behavior: "smooth", block: "nearest" })
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})

// Auto-play carousel with pause on hover
const carousel = document.getElementById("testimonialCarousel")
const bootstrap = window.bootstrap // Declare the bootstrap variable
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 5000,
    wrap: true,
  })

  carousel.addEventListener("mouseenter", () => {
    bsCarousel.pause()
  })

  carousel.addEventListener("mouseleave", () => {
    bsCarousel.cycle()
  })
}

// Add active state to navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Initialize tooltips if Bootstrap tooltips are used
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

// Testimonial Form Logic
document.addEventListener("DOMContentLoaded", function () {
  const testimonialForm = document.getElementById("testimonialForm");
  const testimonialImageInput = document.getElementById("testimonialImage");
  const testimonialImagePreview = document.getElementById("testimonialImagePreview");
  const testimonialFormSuccess = document.getElementById("testimonialFormSuccess");
  const carouselTestimonials = document.getElementById("carouselTestimonials");
  const testimonialList = document.getElementById("testimonialList");

  // Image preview
  testimonialImageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        testimonialImagePreview.innerHTML = `<img src="${ev.target.result}" alt="Preview" class="author-image" style="max-width:80px; border-radius:50%;">`;
      };
      reader.readAsDataURL(file);
    } else {
      testimonialImagePreview.innerHTML = "";
    }
  });

  // Form submission
  testimonialForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("testimonialName").value;
    const service = document.getElementById("testimonialService").value;
    const text = document.getElementById("testimonialText").value;
    const imageFile = testimonialImageInput.files[0];

    if (!name || !service || !text || !imageFile) return;

    // Read image as base64
    const reader = new FileReader();
    reader.onload = function (ev) {
      // Create new testimonial carousel item
      // Add to carousel if exists
      if (carouselTestimonials) {
        const newItem = document.createElement("div");
        newItem.className = "carousel-item";
        newItem.innerHTML = `
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="testimonial-card">
                <div class="stars mb-3">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p class="testimonial-text">${text.replace(/</g, "&lt;")}</p>
                <div class="testimonial-author">
                  <img src="${ev.target.result}" alt="${name}" class="author-image">
                  <div class="author-info">
                    <h5 class="author-name">${name}</h5>
                    <p class="author-title">${service}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        // Remove 'active' from all items, add to new
        const items = carouselTestimonials.querySelectorAll('.carousel-item');
        items.forEach(item => item.classList.remove('active'));
        newItem.classList.add('active');
        carouselTestimonials.appendChild(newItem);
      }

      // Add to testimonial list below form
      if (testimonialList) {
        const card = document.createElement("div");
        card.className = "testimonial-card mb-3 p-3 border rounded bg-white";
        card.innerHTML = `
          <div class="d-flex align-items-center mb-2">
            <img src="${ev.target.result}" alt="${name}" class="author-image me-3" style="width:60px; height:60px; object-fit:cover; border-radius:50%;">
            <div>
              <h5 class="mb-0">${name}</h5>
              <small class="text-muted">${service}</small>
            </div>
          </div>
          <p class="testimonial-text mb-0">${text.replace(/</g, "&lt;")}</p>
        `;
        testimonialList.prepend(card);
      }

      // Show success message
      testimonialFormSuccess.style.display = "block";
      testimonialForm.reset();
      testimonialImagePreview.innerHTML = "";
      setTimeout(() => {
        testimonialFormSuccess.style.display = "none";
      }, 4000);
    };
    reader.readAsDataURL(imageFile);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const colors = ["text-primary", "text-success", "text-warning", "text-danger", "text-info"];

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      let count = +counter.innerText;

      const increment = target / 100; // speed control

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        
        // Random Bootstrap text color effect
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        counter.className = "stat-number " + randomColor;

        setTimeout(updateCount, 50); // adjust speed
      } else {
        counter.innerText = target + (target >= 50 ? "+" : ""); // Add "+" for large numbers
      }
    };

    updateCount();
  });
});

console.log("[v0] Portfolio website initialized successfully")
