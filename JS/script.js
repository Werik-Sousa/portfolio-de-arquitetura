var typed = new Typed(".input", {
    strings: ["Arquitetura.", "Desing.", "Consultoria."],
    typeSpeed:130,
    backSpeed:80,
    loop:true
});

let menu = document.querySelector('#menu-icon');
let menuLista = document.querySelector('.menuLista');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    menuLista.classList.toggle('open');
};
window.onscroll = () => {
    menu.classList.remove('bx-x');
    menuLista.classList.remove('open');
};


const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", this.window.scrollY > 120);
});

// Obter o elemento modal
var modal = document.getElementById("portfolioModal");

// Obter o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Obter todos os itens do portfólio
var portfolioItems = document.querySelectorAll('.portfolio .row');

// Índice do slide atual
var slideIndex = 0;

// Abrir o modal e mostrar o primeiro slide
portfolioItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
        modal.style.display = "block";
        var dataIndex = item.getAttribute('data-index');
        showSlide(dataIndex, 0);
    });
});

// Fechar o modal quando o usuário clicar no <span> (x)
span.onclick = function () {
    modal.style.display = "none";
    hideAllSlides();
}

// Fechar o modal quando o usuário clicar fora do modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        hideAllSlides();
    }
}

// Mostrar slides para o item do portfólio selecionado
function showSlide(dataIndex, index) {
    var sliders = document.getElementsByClassName("slider-content");
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].style.display = "none";
    }
    var selectedSlider = document.querySelector('.slider-content[data-index="' + dataIndex + '"]');
    selectedSlider.style.display = "block";

    var slides = selectedSlider.getElementsByClassName("slide-image");
    var videos = selectedSlider.getElementsByClassName("slide-video");

    // Esconder todas as imagens e vídeos
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (var j = 0; j < videos.length; j++) {
        videos[j].classList.remove('active');
    }

    // Mostrar a imagem ou vídeo selecionado
    if (index < slides.length) {
        slides[index].classList.add('active');
    } else {
        videos[index - slides.length].classList.add('active');
        videos[index - slides.length].currentTime = 0; // Reiniciar o vídeo
        videos[index - slides.length].play(); // Reproduzir o vídeo
    }

    slideIndex = index;
}

// Controles de próximo/anterior
function changeSlide(n) {
    var currentSlider = document.querySelector('.slider-content:not([style*="display: none"])');
    var slides = currentSlider.getElementsByClassName("slide-image");
    var videos = currentSlider.getElementsByClassName("slide-video");
    var totalItems = slides.length + videos.length;

    slideIndex += n;

    if (slideIndex >= totalItems) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalItems - 1;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (var j = 0; j < videos.length; j++) {
        videos[j].classList.remove('active');
        videos[j].pause(); // Pausar vídeos que não estão ativos
    }

    if (slideIndex < slides.length) {
        slides[slideIndex].classList.add('active');
    } else {
        var videoIndex = slideIndex - slides.length;
        videos[videoIndex].classList.add('active');
        videos[videoIndex].currentTime = 0; // Reiniciar o vídeo
        videos[videoIndex].play(); // Reproduzir o vídeo
    }
}

// Esconder todos os slides ao fechar o modal
function hideAllSlides() {
    var sliders = document.getElementsByClassName("slider-content");
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].style.display = "none";
    }
    var videos = document.getElementsByClassName("slide-video");
    for (var j = 0; j < videos.length; j++) {
        videos[j].pause(); // Pausar todos os vídeos ao fechar o modal
    }
}
