function openNav() {
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.style.width = "80%";
    } else {
      sidebar.style.width = "400px";
    }
    overlay.style.display = "flex";
    overlay.addEventListener("click", function() {
      closeNav();
    })
  }
  
  function closeNav() {
    document.getElementById("sidebar").style.width = "0px";
    overlay.style.display = "none";
  }