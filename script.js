// ===============================
// 카테고리 버튼 클릭 시 슬라이드 표시
// ===============================
const buttons = document.querySelectorAll(".filter-btn");
const galleries = document.querySelectorAll(".gallery");
const gallerySection = document.getElementById("gallery-section");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // 버튼 스타일 변경
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    gallerySection.style.display = "block";

    galleries.forEach(gallery => {
      if (gallery.dataset.category === filter) {
        gallery.style.display = "block";
      } else {
        gallery.style.display = "none";
      }
    });
  });
});

// ===============================
// 드래그 / 터치 슬라이드 기능
// ===============================
const allSlides = document.querySelectorAll(".slide-container");

allSlides.forEach(container => {
  const slides = container.querySelector(".slides");
  const images = slides.querySelectorAll("img");
  let index = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let dragging = false;

  function updateSlidePosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
  }

  slides.addEventListener("mousedown", startDrag);
  slides.addEventListener("touchstart", startDrag);
  slides.addEventListener("mousemove", moveDrag);
  slides.addEventListener("touchmove", moveDrag);
  slides.addEventListener("mouseup", endDrag);
  slides.addEventListener("mouseleave", endDrag);
  slides.addEventListener("touchend", endDrag);

  function startDrag(e) {
    dragging = true;
    startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    slides.style.transition = "none";
  }

  function moveDrag(e) {
    if (!dragging) return;
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    const delta = x - startX;
    currentTranslate = prevTranslate + delta;
    updateSlidePosition();
  }

  function endDrag(e) {
    dragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && index < images.length - 1) index++;
    if (movedBy > 100 && index > 0) index--;

    currentTranslate = -index * container.clientWidth;
    prevTranslate = currentTranslate;
    slides.style.transition = "transform 0.5s ease";
    updateSlidePosition();
  }

  window.addEventListener("resize", () => {
    currentTranslate = -index * container.clientWidth;
    prevTranslate = currentTranslate;
    updateSlidePosition();
  });
});
