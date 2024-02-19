document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("submit");
  const closeModalButton = document.getElementById("closeModal");
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  openModalButton.addEventListener("click", function () {
    modal.style.display = "block";
    overlay.style.display = "block";
  });

  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  });
});
