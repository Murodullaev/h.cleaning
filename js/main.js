
// Scroll Animation on navigations 
(function($) {
  $(window).on("load", function() {
    $("a[rel='m_PageScroll2id']").mPageScroll2id({
      scrollSpeed: 1500,
     scrollingEasing: "easeInOutQuint"
     });  
  });
})(jQuery);

(function($) {
  $(window).on("load", function() {
    $("a[rel='m_PageScroll3id']").m_PageScroll3id({
      scrollSpeed: 1500,
       scrollingEasing: "easeInOutQuint"
     });  
  });
})(jQuery);
// Slider carousel 

$('#recipeCarousel').carousel({
    interval: 10000
  })
  
  $('.carousel .carousel-item').each(function(){
      var minPerSlide = 3;
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
              next = $(this).siblings(':first');
            }
          
          next.children(':first-child').clone().appendTo($(this));
        }
  });
  

  // Filter Content code in here 
  function app() {
    const buttons = document.querySelectorAll('.btn_filter')
    const cards = document.querySelectorAll('.filtercard')
  
    function filter (category, items) {
      items.forEach((item) => {
        const isItemFiltered = !item.classList.contains(category)
        const isShowAll = category.toLowerCase() === 'all'
        if (isItemFiltered && !isShowAll) {
          item.classList.add('anime')
        } else {
          item.classList.remove('hide')
          item.classList.remove('anime')
        }
      })
    }
  
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const currentCategory = button.dataset.filter
        filter(currentCategory, cards)
      })
    })
  
    cards.forEach((card) => {
      card.ontransitionend = function () {
        if (card.classList.contains('anime')) {
          card.classList.add('hide')
        }
      }
    })
  }
  
  app();


  
  //  Send Email Form
  
  // Shpagin Kirill 

// Объявления

var msg = document.querySelector(".msg");
var gsapMsg = gsap.to(".msg", 0.25, {autoAlpha: 1,y: -40,ease: Expo.inOut, paused: true});
var arrInput = document.querySelectorAll('.aInput');

// Функция отправки сообщения
function send(event, php) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].classList.remove("errorInput");
  }
  event.target.querySelector("button").disabled = true;
  showMsg("Подождите. Идёт отправка сообщения", "#b1b1b1");
  var req = new XMLHttpRequest();
  req.open('POST', php, true);
  req.onload = function() {
    event.target.querySelector("button").disabled = false;
    if (req.status >= 200 && req.status < 400) {
      json = JSON.parse(this.response); // Ебанный internet explorer 11
      console.log(json);

      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        // если сообщение отправлено
        showMsg("Сообщение успешно отправлено", "#36AE46");
        console.log("Сообщение отправлено");
        event.target.reset();
      } else if (json.result == "email") {
        // Если указан неверный email
        showMsg("Ошибка. Неверно указан Email", "#DC352F");
        console.log("Ошибка. Неверно указан Email");
        document.querySelector("#email").classList.add("inputerror");
      } else {
        // Если произошла ошибка
        showMsg("Ошибка. Сообщение не отправлено", "#DC352F");
        console.log("Ошибка. Сообщение не отправлено");
      }

      // Если не удалось связаться с php файлом
    } else {
      showMsg("Ошибка сервера. Номер: " + req.status, "#DC352F");
    }
  };

  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function() {
    showMsg("Ошибка отправки запроса", "#DC352F");
  };
  req.send(new FormData(event.target));
}

// Функция появления статуса отправки сообщения
function showMsg(message, color) {
  msg.innerText = message;
  msg.style.background = color;
  gsapMsg.restart();
}

// Оформление input file
function inputFile(e) {
  el = e.target.parentNode.querySelector(".count");
  if (e.target.value != '') el.innerHTML = "Выбрано файлов: " + e.target.files.length;
  else el.innerHTML = 'Прикрепить файлы';
}

// Анимация input text
for (var i = 0, count = arrInput.length; i < count; i++) {
  arrInput[i].addEventListener("focus", function() {
    this.nextElementSibling.classList.add("active");
  });
  arrInput[i].addEventListener("blur", function() {
    if (this.value == false)
      this.nextElementSibling.classList.remove("active");
  });
}

// Анимация появления блоков
window.onload = function() {
  var loadPage = gsap.timeline();
  loadPage.to("#form", 0.7, {
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  });
  loadPage.to(".link", 0.7, {
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  }, 0);
  loadPage.to(".input-wrap", 0.5, {
    stagger: 0.15,
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  }, 0.35);
  loadPage.to(".file-wrap, .button", 0.5, {
    stagger: 0.15,
    autoAlpha: 1,
    x: 0,
    ease: Expo.inOut
  }, 0.6);
}


// Отправка данных на сервер
function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
  if (req.status >= 200 && req.status < 400) {
  json = JSON.parse(this.response); // Ебанный internet explorer 11
      console.log(json);
        
      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        // Если сообщение отправлено
        alert("Сообщение отправлено");
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
      }
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса");};
req.send(new FormData(event.target));
}

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
  var height = $(window).scrollTop();
  if (height > 100) {
      $('#back2Top').fadeIn();
  } else {
      $('#back2Top').fadeOut();
  }
});
$(document).ready(function() {
  $("#back2Top").click(function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
  });

});
/*Scroll to top when arrow up clicked END*/