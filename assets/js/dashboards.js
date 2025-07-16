
// **************** Toggle bar / sidebar ****************

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebarMenu');
  const toggleBtn = document.getElementById('sidebarToggle');

  // Toggle sidebar on button click
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  // Close sidebar when any link is clicked (mobile/tablet only)
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991.98) {
        sidebar.classList.remove('show');
      }
    });
  });
});


// **************** Donor Dashboard Sidebar Navigation ****************

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll(".dashboard-section");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove 'active' class from all links
      links.forEach(l => l.classList.remove("active"));

      // Add 'active' to clicked one
      this.classList.add("active");

      // Hide all sections
      sections.forEach(section => section.classList.add("d-none"));

      // Show selected section
      const sectionId = this.getAttribute("data-section");
      const target = document.getElementById(sectionId);
      if (target) {
        target.classList.remove("d-none");
      }
    });
  });
});



// **************** Recipient Dashboard Dynamic Profiles ****************

document.addEventListener("DOMContentLoaded", function () {
  const profileSection = document.getElementById("receipts-profile");

  document.querySelectorAll(".view-profile-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Show the profile section
      profileSection.classList.remove("d-none");

      // Update profile info
      document.getElementById("profileImage").src = btn.dataset.image || "default.jpg";
      document.getElementById("profileName").textContent = btn.dataset.name || "Unknown";
      document.getElementById("profileLocation").innerHTML =
        '<i class="fas fa-map-marker-alt text_success mt-1"></i> ' +
        (btn.dataset.location || "Unknown");
      document.getElementById("profileReason").textContent = btn.dataset.reason || "Not specified";
      document.getElementById("profileMatch").textContent = (btn.dataset.match || "--") + "%";

      // Donation section
      const requested = parseInt(btn.dataset.requested) || 0;
      const collected = parseInt(btn.dataset.collected) || 0;
      const remaining = Math.max(requested - collected, 0);
      const progress = requested > 0 ? (collected / requested) * 100 : 0;

      document.getElementById("helpNeeded").textContent = btn.dataset.help || "--";
      document.getElementById("amountRequested").textContent = "Rs. " + requested;
      document.getElementById("amountCollected").textContent = "Rs. " + collected;
      document.getElementById("amountRemaining").textContent = "Rs. " + remaining;
      document.getElementById("progressBar").style.width = progress + "%";
      document.getElementById("progressBar").textContent = Math.round(progress) + "%";
      document.getElementById("progressText").textContent = "Progress: " + Math.round(progress) + "%";
    });
  });
});





// **************** Recipient Dynamic Profiles ****************
const viewProfileButtons = document.querySelectorAll('.view-profile-btn');

viewProfileButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();

    // Extract data attributes
    const name = this.getAttribute('data-name');
    const email = this.getAttribute('data-email');
    const location = this.getAttribute('data-location');
    const image = this.getAttribute('data-image');

    // Update the profile section
    document.getElementById('donorName').textContent = name;
    document.getElementById('donorEmail').innerHTML = `<i class="bi bi-envelope-fill me-1"></i>${email}`;
    document.getElementById('donorLocation').innerHTML = `<i class="bi bi-geo-alt-fill me-1"></i>${location}`;
    document.getElementById('donorImage').src = image;

    // Show the donor profile section
    const profileSection = document.getElementById('donor-profile');
    profileSection.classList.remove('d-none');

    // Optional: Scroll to profile section
    profileSection.scrollIntoView({ behavior: 'smooth' });
  });
});







// **************** Donor Dashboard Filters ****************

const categoryFilter = document.getElementById("categoryFilter");
const urgencyFilter = document.getElementById("urgencyFilter");
const timeFilter = document.getElementById("timeFilter");

const filterCards = () => {
  const selectedCategory = categoryFilter.value.toLowerCase();
  const selectedUrgency = urgencyFilter.value.toLowerCase();
  const selectedDays = parseInt(timeFilter.value || "7");

  const cards = document.querySelectorAll(".recipient-card");

  cards.forEach(card => {
    const parentCol = card.closest('[data-category]');
    const cardCategory = parentCol.getAttribute("data-category").toLowerCase();
    const cardUrgency = parentCol.getAttribute("data-urgency").toLowerCase();
    const cardDays = parseInt(parentCol.getAttribute("data-days"));

    const matchCategory = !selectedCategory || cardCategory === selectedCategory;
    const matchUrgency = !selectedUrgency || cardUrgency === selectedUrgency;
    const matchDays = cardDays <= selectedDays;

    if (matchCategory && matchUrgency && matchDays) {
      parentCol.style.display = "block";
    } else {
      parentCol.style.display = "none";
    }
  });
};

categoryFilter.addEventListener("change", filterCards);
urgencyFilter.addEventListener("change", filterCards);
timeFilter.addEventListener("change", filterCards);



// ****************Chat Box****************

// Show the chat box
function openChatBox() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = "block";
  scrollToBottom();
}

// Close the chat box
function closeChatBox() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = "none";
}

// Send message
function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  const chatMessages = document.getElementById("chatMessages");

  if (message !== "") {
    // Create message element
    const msgElem = document.createElement("div");
    msgElem.className = "mb-2 text-end"; // aligns right
    msgElem.innerHTML = `<span class="badge bg-success text-white">${message}</span>`;
    chatMessages.appendChild(msgElem);

    input.value = "";
    scrollToBottom();
  }
}

// Handle Enter key press
function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

// Scroll chat to bottom
function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}







