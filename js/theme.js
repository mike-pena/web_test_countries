const toggleBtn = document.querySelector(".theme-toggle");
const page = document.querySelector(".page");
const icon = document.querySelector(".theme-toggle__icon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    page.setAttribute("theme", savedTheme);
    changeIcon(savedTheme);
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = page.getAttribute("theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  page.setAttribute("theme", nextTheme);
  changeIcon(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

function changeIcon(theme) {
  if (theme === "dark") {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  }
}