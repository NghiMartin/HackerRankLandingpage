document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử cần tính khoảng cách
var header = document.querySelector('.header'); // Thay 'yourElementId' bằng ID của phần tử thực tế
var home = document.getElementById('Home');
    const counters = document.querySelectorAll(".counter");
  
    window.addEventListener("scroll", function () {
        var distanceToTop = home.getBoundingClientRect().top;

      // Kiểm tra nếu khoảng cách lớn hơn 1, thêm lớp có box shadow
      if (distanceToTop < 0) {
        header.classList.add('header-with-box-shadow');
      } else {
        // Nếu không, loại bỏ lớp
        header.classList.remove('header-with-box-shadow');
      }
        counters.forEach((counter) => {
            const rect = counter.getBoundingClientRect(); // trả về object có kích thước và vị trí của phần tử trong trang web.
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                // Nếu counter hiển thị trên màn hình (ít nhất một phần)
  
                animateCounter(counter, counter.id);
            }
        });
        // Effect nhảy số
        function animateCounter(counter, targetValue) {
          counter.textContent = 0;
          let currentValue = 0;
          const increment = Math.ceil(targetValue / 100); // Chia targetValue thành 100 phần
          const animationSpeed = 10; // Tốc độ animation
    
          const updateCounter = () => {
              currentValue += increment;
              if (currentValue >= targetValue) {
                  currentValue = targetValue;
                  clearInterval(interval);
              }
              counter.textContent = currentValue;
          };   
          const interval = setInterval(updateCounter, animationSpeed);
          counter.classList.add("show"); // Hiển thị counter bằng cách thêm class "show"
      }
    
    });
    const navLinks = document.querySelectorAll('.header_nav-link');
  
    navLinks.forEach(function(navLink) {
      navLink.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          smoothScrollTo(targetSection.offsetTop-100, 1000); // 1000 milliseconds (1 second) for smooth scroll
        }
      });
    });
   // Function for smooth scroll
   function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset || document.documentElement.scrollTop; //Lấy vị trí cuộn của trang web.
    const distance = targetPosition - startPosition; //  Khoảng cách cần phải cuộn để đến vị trí đích đến.
    const startTime = performance.now(); // Thời điểm bắt đầu thực hiện smooth scroll.
  
    function scrollAnimation(currentTime) {
      const timeElapsed = currentTime - startTime; //  Thời gian đã trôi qua kể từ khi bắt đầu cuộn.
      const progress = Math.min(timeElapsed / duration, 1); // giá trị nằm trong khoảng từ 0 đến 1, biểu thị phần trăm cuộc cuộn đã hoàn thành.
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress)); 
  
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation); // Kích hoạt hàm scrollAnimation mỗi khi trình duyệt sẵn sàng để vẽ một khung hình mới.
      }
    }
  
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  
    requestAnimationFrame(scrollAnimation);
  }
  });
  
  // HEADER 
  document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.header_nav');
    hamburgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show');
    });
  });
  
  // DISTINATIONS 
  document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".distination_item");
    const windowHeight = window.innerHeight;
    const listItems = document.querySelectorAll('.custom-list li');

    const inView = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const checkItemsInView = () => {
        listItems.forEach((item) => {
            if (inView(item)) {
                item.classList.add('in-view');
            }
        });
    };


    // Kiểm tra khi tải trang
    checkItemsInView();
    
    function checkVisible() {
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            top < windowHeight * 0.5 ? section.classList.add("show") :  section.classList.remove("show");
        });
        checkItemsInView();
    }

    window.addEventListener("scroll", checkVisible);
    window.addEventListener('resize', checkItemsInView);

});




let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');
let cards = document.querySelectorAll('.card-items');
let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    let last_active_card = document.querySelector('.card-items.active');
    last_active_dot.classList.remove('active');
    last_active_card.classList.remove('active');
    dots[active].classList.add('active');
    cards[active].classList.add('active');
    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

//ABOUT US
function showReview(reviewId, event) {
  const reviews = {
    review1: {
      text: 'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!',
      name: 'Ali Tufan',
      position: 'Product Manager, Apple Inc.'
    },
    review2: {
      text: 'Amazing experience! The tours were well organized and the guides were very knowledgeable.',
      name: 'John Doe',
      position: 'Software Engineer, Google Inc.'
    },
    review3: {
      text: 'A delightful trip with excellent service. Highly recommended!',
      name: 'Jane Smith',
      position: 'UX Designer, Facebook'
    },
    review4: {
      text: 'Great tours and fantastic customer service. Will definitely use again!',
      name: 'Mike Johnson',
      position: 'Project Manager, Amazon'
    },
    review5: {
      text: 'An unforgettable experience! The team took care of everything.',
      name: 'Emily Davis',
      position: 'Data Scientist, Microsoft'
    }
  };

  // Cập nhật hiệu ứng avatar
  document.querySelectorAll('.avatar').forEach(avatar => {
    avatar.classList.remove('active');
  });
  event.target.classList.add('active');

  // Thêm lớp fade-out trước khi thay đổi nội dung
  const reviewText = document.querySelector('.review-text');
  reviewText.classList.add('fade-out');

  // Chờ cho hiệu ứng fade-out hoàn thành, sau đó thay đổi nội dung và thêm lớp fade-in
  setTimeout(() => {
    reviewText.querySelector('p').innerText = reviews[reviewId].text;
    reviewText.querySelector('footer').innerHTML = `${reviews[reviewId].name}<br><span>${reviews[reviewId].position}</span>`;

    // Loại bỏ lớp fade-out và thêm lớp fade-in
    reviewText.classList.remove('fade-out');
    reviewText.classList.add('fade-in');
    
    // Loại bỏ lớp fade-in sau một khoảng thời gian để chuẩn bị cho lần thay đổi tiếp theo
    setTimeout(() => {
      reviewText.classList.remove('fade-in');
    }, 500);
  }, 500);
}


// DISTINATIONS 
// Lặp qua tất cả các phần tử .distination_item
document.querySelectorAll('.distination_item').forEach(item => {

  // Lấy chiều cao của phần tử .content bên trong mỗi .distination_item
  var contentHeightContent = item.querySelector('.content').getBoundingClientRect().height;
  
  // Đặt chiều cao của dashed line bằng với chiều cao của nội dung
  item.querySelector('.dashed-line').style.marginTop = 0+ 'px';
  item.querySelector('.dashed-line').style.height = contentHeightContent - 30 +  'px';
  
  var contentHeightLine = item.querySelector('.dashed-line').getBoundingClientRect().height;

  console.log({contentHeightLine});
});


  document.addEventListener('DOMContentLoaded', function() {
    // Get the popup
    var popup = document.getElementById('popup');

    // Get the <span> element that closes the popup
    var closeBtn = document.getElementsByClassName('close_btn')[0];

    // Function to open the popup with specific content
    function openPopup(imgSrc, title, location, phone, email, fbLink) {
      document.getElementById('popup_img').src = imgSrc;
      document.getElementById('popup_title').innerText = title;
      document.getElementById('popup_location').innerText = location;
      document.getElementById('popup_phone').innerText = phone;
      document.getElementById('popup_email').innerText = email;
      document.getElementById('popup_fb').href = fbLink;
      popup.style.display = 'block';
    }

    // Close the popup when the user clicks on <span> (x)
    closeBtn.onclick = function() {
      popup.style.display = 'none';
    }

    // Close the popup when the user clicks anywhere outside of the popup
    window.onclick = function(event) {
      if (event.target == popup) {
        popup.style.display = 'none';
      }
    }

    // Add event listeners to all "View More" buttons
    var viewMoreButtons = document.querySelectorAll('.btn_view_more');
    viewMoreButtons.forEach(function(button, index) {
      button.addEventListener('click', function() {
        // Example data for each card (you should replace this with your actual data)
        var data = [
          {
            imgSrc: 'img/cho-dem-helio-1.jpg',
            title: 'Chợ đêm Helio',
            location: 'Đường 2/9, Bình Hiên, Quận Hải Châu, Thành Phố Đà Nẵng',
            phone: '0123456789',
            email: 'contact@helio.com',
            fbLink: 'https://www.facebook.com/helio'
          },
          {
            imgSrc: 'img/goi-ca-nam-o.jpg',
            title: 'Gỏi cá Nam Ô',
            location: '972 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành Phố Đà Nẵng',
            phone: '0987654321',
            email: 'contact@namo.com',
            fbLink: 'https://www.facebook.com/namo'
          },
          {
            imgSrc: 'img/dacsantran.jpg',
            title: 'Quán Đặc Sản Trần',
            location: '11 Nguyễn Văn Linh, Quận Hải Châu, Thành Phố Đà Nẵng',
            phone: '0345678912',
            email: 'contact@tran.com',
            fbLink: 'https://www.facebook.com/tran'
          },
          {
            imgSrc: 'img/nha-hang-lao-dai-seafood-da-nang.jpg',
            title: 'Hải Sản Lão Đại',
            location: 'Số 50 Đường 3/2, Quận Hải Châu, Thành Phố Đà Nẵng',
            phone: '0567891234',
            email: 'contact@laodai.com',
            fbLink: 'https://www.facebook.com/laodai'
          }
        ];

        // Open the popup with the data corresponding to the clicked button
        openPopup(
          data[index].imgSrc,
          data[index].title,
          data[index].location,
          data[index].phone,
          data[index].email,
          data[index].fbLink
        );
      });
    });
  });
