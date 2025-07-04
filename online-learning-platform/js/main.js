// Sample course data
const coursesData = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    category: "web-development",
    rating: 4.8,
    students: 15420,
    price: 89.99,
    image: "💻",
    description: "Learn HTML, CSS, JavaScript, Node.js, React, and more!",
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Jose Portilla",
    category: "data-science",
    rating: 4.7,
    students: 12350,
    price: 94.99,
    image: "📊",
    description: "Master Python, Pandas, NumPy, Matplotlib, and Scikit-Learn",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Daniel Schifano",
    category: "design",
    rating: 4.9,
    students: 8920,
    price: 79.99,
    image: "🎨",
    description: "Learn design principles, Figma, Adobe XD, and user research",
  },
  {
    id: 4,
    title: "Digital Marketing Complete Course",
    instructor: "Phil Ebiner",
    category: "business",
    rating: 4.6,
    students: 18750,
    price: 69.99,
    image: "📈",
    description: "SEO, Social Media Marketing, Google Ads, and Analytics",
  },
  {
    id: 5,
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    category: "web-development",
    rating: 4.8,
    students: 22100,
    price: 84.99,
    image: "⚛️",
    description: "Hooks, Redux, Next.js, Testing, and TypeScript",
  },
  {
    id: 6,
    title: "Python for Data Analysis",
    instructor: "Wes McKinney",
    category: "data-science",
    rating: 4.7,
    students: 9840,
    price: 74.99,
    image: "🐍",
    description: "Pandas, NumPy, Jupyter, and data visualization",
  },
]

// DOM Elements
const coursesGrid = document.getElementById("coursesGrid")
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadPopularCourses()
  initializeCounters()
  initializeNavigation()
  initializeScrollAnimations()
  initializeAboutAnimations() // Add this line
  initializeContactLinks() // Add this line
  initializeContactForm() // Add this line
  initializeContactMethods() // Add this line
})

// Load popular courses
function loadPopularCourses() {
  if (!coursesGrid) return

  const popularCourses = coursesData.slice(0, 3)
  coursesGrid.innerHTML = ""

  popularCourses.forEach((course) => {
    const courseCard = createCourseCard(course)
    coursesGrid.appendChild(courseCard)
  })
}

// Create course card element
function createCourseCard(course) {
  const card = document.createElement("div")
  card.className = "course-card"
  card.onclick = () => showCourseDetails(course)

  card.innerHTML = `
        <div class="course-image">
            <span>${course.image}</span>
        </div>
        <div class="course-content">
            <div class="course-meta">
                <span class="course-category">${formatCategory(course.category)}</span>
                <div class="course-rating">
                    <i class="fas fa-star"></i>
                    <span>${course.rating}</span>
                </div>
            </div>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">by ${course.instructor}</p>
            <div class="course-footer">
                <span class="course-price">$${course.price}</span>
                <span class="course-students">${formatNumber(course.students)} students</span>
            </div>
        </div>
    `

  return card
}

// Format category name
function formatCategory(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString()
}

// Show course details (placeholder)
function showCourseDetails(course) {
  showNotification(`Opening ${course.title}...`, "info")
  // In a real application, this would navigate to course details page
  setTimeout(() => {
    window.location.href = `course.html?id=${course.id}`
  }, 1000)
}

// Initialize counters animation
function initializeCounters() {
  const counters = document.querySelectorAll(".counter")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

// Animate counter
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      element.textContent = target.toLocaleString()
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current).toLocaleString()
    }
  }, 16)
}

// Initialize navigation
function initializeNavigation() {
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize scroll animations
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(".feature-card, .course-card, .stat-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((element) => observer.observe(element))
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification") || createNotificationElement()

  notification.textContent = message
  notification.className = `notification ${type}`
  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Create notification element if it doesn't exist
function createNotificationElement() {
  const notification = document.createElement("div")
  notification.id = "notification"
  notification.className = "notification"
  document.body.appendChild(notification)
  return notification
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Initialize About section animations
function initializeAboutAnimations() {
  const teamMembers = document.querySelectorAll(".team-member")
  const teamStats = document.querySelectorAll(".team-stats .stat-item")

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("fade-in-up")
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  teamMembers.forEach((member) => observer.observe(member))
  teamStats.forEach((stat) => observer.observe(stat))
}

// Add click-to-call and email functionality
function initializeContactLinks() {
  const contactItems = document.querySelectorAll(".contact-item")

  contactItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        // Let the default behavior handle the action
        showNotification("Opening contact method...", "info")
      }
    })
  })
}

// Export functions for use in other scripts
window.coursesData = coursesData
window.showNotification = showNotification
window.formatCategory = formatCategory
window.formatNumber = formatNumber

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmission)
  }
}

// Handle contact form submission
async function handleContactSubmission(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  try {
    // Simulate form submission
    await simulateContactSubmission(contactData)

    showNotification("Message sent successfully! We'll get back to you soon.", "success")
    e.target.reset()
  } catch (error) {
    showNotification("Failed to send message. Please try again.", "error")
  } finally {
    // Restore button state
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }
}

// Simulate contact form submission
async function simulateContactSubmission(data) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Store contact submission (in real app, this would go to a server)
  const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
  submissions.push({
    ...data,
    timestamp: new Date().toISOString(),
    id: Date.now(),
  })
  localStorage.setItem("contactSubmissions", JSON.stringify(submissions))

  return { success: true }
}

// Add click-to-call and email functionality for contact methods
function initializeContactMethods() {
  const contactMethods = document.querySelectorAll(".contact-method")

  contactMethods.forEach((method) => {
    method.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        showNotification("Opening contact method...", "info")
      }
    })
  })
}
