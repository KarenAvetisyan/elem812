document.addEventListener('DOMContentLoaded', function(){

        // BURGER 
        const burger = document.querySelector('.js-header-burger');
        const nav = document.querySelector('.header__nav');
        document.addEventListener('click', (e) => {
            const isBurger = e.target.closest('.js-header-burger');
            const closeBurger = e.target.closest('.js-close-burger');
            const isNav = e.target.closest('.header__nav');

            if (isBurger) {
                burger.classList.toggle('clicked');
                nav.classList.toggle('show');
                return; 
            }
            if (!isNav) {
                burger.classList.remove('clicked');
                nav.classList.remove('show');
            }
            if (closeBurger) {
                burger.classList.remove('clicked');
                nav.classList.remove('show');
            }
        });

        // INPUT SELECT
        document.querySelectorAll('.priceForm__item-select').forEach(select => {
                const togglePlaceholder = () => {
                        select.classList.toggle('has-value', select.value !== '');
                };

                togglePlaceholder(); // Initial state
                select.addEventListener('change', togglePlaceholder);
        
        });
        // INPUT FILE 
        document.querySelectorAll('.priceForm__item-input[type="file"]').forEach(input => {

                input.addEventListener('change', function () {

                const fileWrap = this.closest('.priceForm__file');
                const preview = fileWrap.querySelector('.priceForm__preview');

                preview.innerHTML = '';

                const files = [...this.files]
                        .filter(file => file.type.startsWith('image/'))
                        .slice(0, 6);

                fileWrap.classList.toggle('_has-file', files.length > 0);

                files.forEach(file => {
                        const img = document.createElement('img');

                        img.src = URL.createObjectURL(file);
                        img.alt = file.name;

                        img.onload = () => URL.revokeObjectURL(img.src);

                        preview.appendChild(img);
                });

                if (this.files.length > 6) {
                        alert('Вы можете загрузить максимум 6 изображений');
                }

                });

        });

        // modal 
        document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-show-modal]')) return;
        else{
                e.preventDefault();
                        var modal = document.querySelectorAll('#'+e.target.dataset.id);
                        Array.prototype.forEach.call(modal, function (el) {
                                el.classList.add('active');
                        });
                }
        });
        //mouse click for closing modal on modal dark background or close icon
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-close-modal]')) return;
                else{
                e.target.closest('.modal').classList.remove('active');
                }
        });

        // ACCORDION 
        function Accordion(el, multiple) {
                this.el = el || null;
                this.multiple = multiple || false;
                this.links = this.el.querySelectorAll('.faq__accordion-item__head');
                this.links.forEach(link => {
                        link.addEventListener('click', (e) => {
                                this.dropdown(e, link);
                        });
                });
        }
        Accordion.prototype.dropdown = function(e, link) {
                const next = link.nextElementSibling;
                if (next.style.maxHeight) {
                next.style.maxHeight = null;
                } else {
                next.style.maxHeight = next.scrollHeight + "px";
                }
                link.parentElement.classList.toggle('open');
                if (!this.multiple) {
                this.links.forEach(otherLink => {
                        const otherNext = otherLink.nextElementSibling;
                        if (otherNext !== next) {
                        otherNext.style.maxHeight = null;
                        otherLink.parentElement.classList.remove('open');
                        }
                });
                }
        };
        const accordionElement = document.getElementById('accordion');
        const accordion = new Accordion(accordionElement, false);

})
