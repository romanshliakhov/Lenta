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

document.querySelectorAll('a.header__nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    const topOffset = 50;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offetPostion = elementPosition - topOffset;

    window.scrollBy({
      top: offetPostion,
      behavior: "smooth"
    });
  });
});

// burger
let menuBtn = document.querySelector('.burger-menu');
let menu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
});


// select
let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerText,
        select = this.closest('.select'),
        currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');
  }
};

select();

// modals
class Modal {
  constructor (options) {
      let defaultOptions = {
          onOpen: () => {},
          onClose: () => {},
      };
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = false;
      this.animation = false;
      this.isOpen = false;
      this.modalContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
          'a[href]',
          'input',
          'button',
          'select',
          'textarea',
          '[tabindex]'
      ];
      this.events();
  }

  events() {
      if (this.modal) {
          document.addEventListener('click', function (e) {
              const clickedElement = e.target.closest('[data-path]');
              if (clickedElement) {
                  if (this.isOpen) {
                    this.close();
                  }
                  let target = clickedElement.dataset.path;
                  let animation = clickedElement.dataset.animation;
                  let speed = clickedElement.dataset.speed;
                  this.animation = animation ? animation : 'fade';
                  this.speed = speed ? parseInt(speed) : 300;
                  this.modalContainer = document.querySelector(`[data-target="${target}"]`);
                  this.open();
                  return;
              }

              if (e.target.closest('.modal-close')) {
                  this.close();
                  return;
              }
          }.bind(this));

          window.addEventListener('keydown', function (e) {
              if (e.keyCode == 27) {
                  if (this.isOpen) {
                      this.close();
                  }
              }
          }.bind(this));

          this.modal.addEventListener('click', function (e) {
              if (!e.target.classList.contains('.modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
              this.close();
              }
          }.bind(this));
      }
  }

  open() {
      this.previousActiveElement = document.activeElement;

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('is-open');
      this.disableScroll();

      this.modalContainer.classList.add('modal-open');
      this.modalContainer.classList.add(this.animation);

      setTimeout(() => {
          this.modalContainer.classList.add('animate-open');
          this.options.onOpen(this);
          this.isOpen = true;
      }, this.speed);
  }

  close() {
      if (this.modalContainer) {
          this.modalContainer.classList.remove('animate-open');
          this.modalContainer.classList.remove(this.animation);
          this.modal.classList.remove('is-open');
          this.modalContainer.classList.remove('modal-open');

          this.enableScroll();
          this.options.onClose(this);
          this.isOpen = false;
      }
  }

  focusCatch(e) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
  }

  focusTrap() {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
          focusable[0].focus();
      } else {
      }
  }

  disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding () {
    this.fixBlocks.forEach((el) => {
    el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}

const modal = new Modal({
  onOpen: (modal) => {

  },
  onClose: () => {

  },
});

// imput Mask
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+9 (999) 999-99-99');
im.mask(selector);

// input validate
let selector2 = document.querySelector('input[type="tel"]');

let validateForms = function(selector, rules, successModal, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
		submitHandler: function(form) {
			let formData = new FormData(form);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Отправлено');
					}
				}
			};

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			form.reset();
		}
	});
};

validateForms('.form', { email: {required: true, email: true}, tel: {required: true}, surname: {required: true}, instagram: {required: true}, country: {required: true}, radio: {required: true} }, '.thanks-popup', 'send goal');

// upload validation

const formUpload = document.getElementById('upload');
const formPreview = document.getElementById('formPreview');

formUpload.addEventListener('change', () => {
  uploadFile(formUpload.files[0]);

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'application/pdf', 'application/powerpoint', 'application/msword', 'application/vnd.ms-excel' ].includes(file.type)) {
      alert('Разрешены только .jpeg, .png, .pdf, .ppt, .doc, .xls');
      formUpload.value = '';
      return;
    }

    if (file.size > 15 * 1024 * 1024 ) {
      alert('Файлы не более 30мб');
      return;
    }

    if (file.length > 2) {
      alert(`Only 20 files are allowed to upload.`);
      return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
    };
    reader.onerror = function (e) {
      alert('Error');
    };
    reader.readAsDataURL(file);
  }
});

