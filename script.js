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

console.log("[v0] Portfolio website initialized successfully")
