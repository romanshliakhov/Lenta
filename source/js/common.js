// scroll to section
const getId = (link) => link.getAttribute('href').replace('#','');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.header__nav-link').forEach((link) => {
        link.classList.toggle('header__nav-link--active',
          getId(link)  === entry.target.id
        );
      });
    }
  });
}, {
  threshold: 0.7,
});

document.querySelectorAll('.section').forEach(
  (section) => observer.observe(section),
);

document.querySelector('.header__nav-menu').addEventListener('click', (event) => {
  if (event.target.classList.contains('.header__nav-link')) {
      event.preventDefault();

    window.scrollTo({
      top: document.getElementById(getId(event.target)).offsetTop,
      behavior: "smooth",
    });
  }
});


// document.querySelectorAll('a.header__nav-link').forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();

//     const href = this.getAttribute('href').substring(1);

//     const scrollTarget = document.getElementById(href);

//     const topOffset = 50;
//     const elementPosition = scrollTarget.getBoundingClientRect().top;
//     const offetPostion = elementPosition - topOffset;

//     window.scrollBy({
//       top: offetPostion,
//       behavior: "smooth"
//     });
//   });
// });


// upload validation
const fileTypes = [
  '.pdf',
  '.jpg',
  '.png',
  '.ptt',
  '.doc',
  '.xls'
];

function validFileType(file) {
  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}

// imput Mask
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});
