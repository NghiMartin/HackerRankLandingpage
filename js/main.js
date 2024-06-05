document.addEventListener("DOMContentLoaded", function () {
  // Lấy phần tử cần tính khoảng cách
  var header = document.querySelector(".header"); // Thay 'yourElementId' bằng ID của phần tử thực tế
  var home = document.getElementById("Home");
  const counters = document.querySelectorAll(".counter");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".header_nav");
  window.addEventListener("scroll", function () {
    var distanceToTop = home.getBoundingClientRect().top;

    // Kiểm tra nếu khoảng cách lớn hơn 1, thêm lớp có box shadow
    if (distanceToTop < 0) {
      header.classList.add("header-with-box-shadow");
    } else {
      // Nếu không, loại bỏ lớp
      header.classList.remove("header-with-box-shadow");
    }
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect(); // trả về object có kích thước và vị trí của phần tử trong trang web.
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
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
  const navLinks = document.querySelectorAll(".header_nav-link");

  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      navMenu.classList.toggle("show");
      hamburgerMenu.classList.toggle('open');
      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop - 100, 1000); // 1000 milliseconds (1 second) for smooth scroll
      }
    });
  });
  // Function for smooth scroll
  function smoothScrollTo(targetPosition, duration) {
    const startPosition =
      window.pageYOffset || document.documentElement.scrollTop; //Lấy vị trí cuộn của trang web.
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

  // HEADER

  // hamburgerMenu.addEventListener("click", function () {
  //   navMenu.classList.toggle("show");
  // });
  hamburgerMenu.addEventListener('click', function() {
      this.classList.toggle('open');
    navMenu.classList.toggle("show");
  });
});

// DISTINATIONS
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".distination_item");
  const windowHeight = window.innerHeight;
  const listItems = document.querySelectorAll(".custom-list li");

  const inView = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const checkItemsInView = () => {
    listItems.forEach((item) => {
      if (inView(item)) {
        item.classList.add("in-view");
      }
    });
  };

  // Kiểm tra khi tải trang
  checkItemsInView();

  function checkVisible() {
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      top < windowHeight * 0.5
        ? section.classList.add("show")
        : section.classList.remove("show");
    });
    checkItemsInView();
  }

  window.addEventListener("scroll", checkVisible);
  window.addEventListener("resize", checkItemsInView);
});

let slider = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slider .dots li");
let cards = document.querySelectorAll(".card-items");
let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};
let refreshInterval = setInterval(() => {
  next.click();
}, 3000);
function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  //
  let last_active_dot = document.querySelector(".slider .dots li.active");
  let last_active_card = document.querySelector(".card-items.active");
  last_active_dot.classList.remove("active");
  last_active_card.classList.remove("active");
  dots[active].classList.add("active");
  cards[active].classList.add("active");
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
window.onresize = function (event) {
  reloadSlider();
};

//ABOUT US
function showReview(reviewId, event) {
  const reviews = {
    review1: {
      text: '"Cù Duy Đức là trưởng nhóm tài năng, luôn mang đến tầm nhìn và sự chỉ đạo chiến lược cho nhóm. Với khả năng quản lý dự án và giao tiếp hiệu quả, Văn H đã dẫn dắt nhóm vượt qua nhiều thách thức và đạt được kết quả ấn tượng."',
      name: "Cu Duy Duc",
      position: "Leader",
      image: "img/duy_duc_avt.jpg",
    },
    review2: {
      text: '"Nguyễn Bá Nghị, lập trình viên front-end đầy sáng tạo, chịu trách nhiệm thiết kế và phát triển giao diện người dùng. Với kỹ năng mạnh mẽ trong HTML, CSS, và JavaScript, Nghị đã mang đến cho sản phẩm một giao diện thân thiện và hiện đại."',
      name: "Nguyen Ba Nghi",
      position: "Front End Developer",
      image: "img/ba_nghi_avt.jpg",
    },
    review3: {
      text: '"Nguyễn Tiến Phước là lập trình viên back-end của nhóm, chuyên xử lý logic và quản lý cơ sở dữ liệu. Phước với kiến thức sâu rộng về Python và Java, luôn đảm bảo rằng hệ thống hoạt động một cách trơn tru và bảo mật, đáp ứng tốt các yêu cầu của dự án."',
      name: "Nguyen Tien Phuoc",
      position: "Back End Developer",
      image: "img/tien_phuoc_avt.jpg",
    },
    review4: {
      text: '"Nguyễn Hùng Vĩ là kiểm thử viên đầy nhiệt huyết, tập trung vào kiểm thử chức năng và hiệu suất của sản phẩm. Vĩ sử dụng các kịch bản kiểm thử chi tiết để phát hiện và báo cáo lỗi, đảm bảo chất lượng sản phẩm trước khi phát hành."',
      name: "Nguyen Hung Vi",
      position: "Tester",
      image: "img/hung_vi_avt.jpg",
    },
    review5: {
      text: '"Lê Xuân Thảo là kiểm thử viên với sự chuyên sâu trong kiểm thử tự động. Thảo sử dụng các công cụ kiểm thử hiện đại để đảm bảo rằng các chức năng của sản phẩm được kiểm tra một cách nhanh chóng và chính xác, giảm thiểu sai sót và nâng cao hiệu quả làm việc của nhóm."',
      name: "Le Xuan Thao",
      position: "Tester",
      image: "img/xuan_thao_avt.jpg",
    },
  };

  // Cập nhật hiệu ứng avatar
  document.querySelectorAll(".avatar").forEach((avatar) => {
    avatar.classList.remove("active");
  });
  event.target.classList.add("active");

  // Thêm lớp fade-out trước khi thay đổi nội dung
  const reviewText = document.querySelector(".review-text");
  const reviewImage = document.querySelector(".review-image");
  reviewText.classList.add("fade-out");
  reviewImage.classList.add("fade-out");

  // Chờ cho hiệu ứng fade-out hoàn thành, sau đó thay đổi nội dung và thêm lớp fade-in
  setTimeout(() => {
    reviewText.querySelector("p").innerText = reviews[reviewId].text;
    reviewText.querySelector(
      ".info"
    ).innerHTML = `${reviews[reviewId].name}<br><span>${reviews[reviewId].position}</span>`;

    // Thay đổi ảnh đại diện
    reviewImage.src = reviews[reviewId].image;

    // Loại bỏ lớp fade-out và thêm lớp fade-in
    reviewText.classList.remove("fade-out");
    reviewText.classList.add("fade-in");
    reviewImage.classList.remove("fade-out");
    reviewImage.classList.add("fade-in");

    // Loại bỏ lớp fade-in sau một khoảng thời gian để chuẩn bị cho lần thay đổi tiếp theo
    setTimeout(() => {
      reviewText.classList.remove("fade-in");
      reviewImage.classList.remove("fade-in");
    }, 500);
  }, 500);
}

// DISTINATIONS
// Lặp qua tất cả các phần tử .distination_item
document.querySelectorAll(".distination_item").forEach((item) => {
  // Lấy chiều cao của phần tử .content bên trong mỗi .distination_item
  var contentHeightContent = item
    .querySelector(".content")
    .getBoundingClientRect().height;

  // Đặt chiều cao của dashed line bằng với chiều cao của nội dung
  item.querySelector(".dashed-line").style.marginTop = 0 + "px";
  item.querySelector(".dashed-line").style.height =
    contentHeightContent - 30 + "px";

  var contentHeightLine = item
    .querySelector(".dashed-line")
    .getBoundingClientRect().height;

  console.log({ contentHeightLine });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the popup
  var popup = document.getElementById("popup");
  var popup_class = document.querySelector(".popup");

  // Get the <span> element that closes the popup
  var closeBtn = document.getElementsByClassName("close_btn")[0];

  // Function to open the popup with specific content
  function openPopup(imgSrc, title, location,timeOpen, phone, email, fbLink, description) {
    document.getElementById("popup_img").src = imgSrc;
    document.getElementById("popup_title").innerText = title;
    document.getElementById("popup_location").innerText = location;
    document.getElementById("popup_time_open").innerText = timeOpen;
    document.getElementById("popup_phone").innerText = phone;
    document.getElementById("popup_email").innerText = email;
    document.getElementById("popup_fb").innerText = fbLink;
    document.getElementById("popup_description").innerText = description;
    popup.style.display = "flex";
    popup_class.classList.toggle("show");

  }

  // Close the popup when the user clicks on <span> (x)
  closeBtn.onclick = function () {
    popup_class.classList.toggle("show");
    popup.style.display = "none";
  };

  // Close the popup when the user clicks anywhere outside of the popup
  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    popup_class.classList.toggle("show");
    }
  };

  // Add event listeners to all "View More" buttons
  var viewMoreButtons = document.querySelectorAll(".btn_view_more");
  viewMoreButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      // Example data for each card (you should replace this with your actual data)
      var data = [
        {
          imgSrc: "img/cho-dem-helio-1.jpg",
          title: "Chợ đêm Helio",
          location: "Đường 2/9, Bình Hiên, Quận Hải Châu, Thành Phố Đà Nẵng",
          timeOpen: "17:30 - 22:30",
          phone: "0905 335 358",
          email: "truyenthonghelio@gmail.com",
          fbLink: "https://www.facebook.com/Helionightmarket",
          description: `◉ Chợ đêm Helio nổi bật với không gian rộng rãi, được trang trí ánh sáng rực rỡ và phong cách thiết kế hiện đại. Những gian hàng được bày biện bắt mắt, kết hợp với âm nhạc sôi động, tạo nên một không khí vui tươi và náo nhiệt. Các sự kiện và chương trình biểu diễn thường xuyên được tổ chức tại đây, thu hút đông đảo người tham gia. 
          
          ◉ Ẩm thực là điểm nhấn chính của chợ đêm Helio, với hàng trăm gian hàng phục vụ đa dạng các món ăn từ truyền thống đến hiện đại. Một số loại ẩm thực nổi bật tại chợ đêm Helio: 
          ★	Món ăn truyền thống Việt Nam 
          ★	Đồ nướng và hải sản 
          ★	Đồ ăn vặt và thức uống 
          ★	Ẩm thực quốc tế.
          
          ◉ Chợ đêm Helio không chỉ là nơi để thưởng thức ẩm thực, mà còn là một điểm đến để khám phá văn hóa và phong cách sống của Đà Nẵng. Với sự kết hợp hài hòa giữa truyền thống và hiện đại, chợ đêm Helio đã và đang góp phần làm phong phú thêm trải nghiệm du lịch tại thành phố này.
          `
        },
        {
          imgSrc: "img/goi-ca-nam-o.jpg",
          title: "Gỏi cá Nam Ô",
          location: "972 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành Phố Đà Nẵng",
          timeOpen: "09:00 - 20:00",
          phone: "0987 654 321",
          email: "contact@namo.com",
          fbLink: "https://www.facebook.com/namo",
          description: `◉ Gỏi cá Nam Ô được chế biến từ những con cá tươi ngon, thường là cá trích hoặc cá mòi, được lọc bỏ xương và thái mỏng. Điểm đặc biệt của món gỏi cá này là sự kết hợp hài hòa giữa các loại rau sống, các loại gia vị và nước chấm đặc trưng.
          
          ◉ Món gỏi cá Nam Ô không chỉ ngon miệng mà còn hấp dẫn về mặt thị giác với màu sắc đa dạng từ các loại rau sống, thịt cá trắng ngần và nước chấm đậm đà. Khi ăn, gỏi cá Nam Ô mang đến hương vị tươi mát, giòn giòn của rau, vị ngọt của cá, vị bùi của đậu phộng và mè, cùng với hương vị đậm đà từ nước chấm.
          
          ◉ Gỏi cá Nam Ô không chỉ là một món ăn đặc sản của Đà Nẵng mà còn là một phần không thể thiếu trong văn hóa ẩm thực của người dân nơi đây. Vị trí địa lý, lịch sử hình thành và cách chế biến tinh tế đã tạo nên một món ăn đậm đà bản sắc, thể hiện sự kết hợp hoàn hảo giữa biển cả và đất liền.
          `

        },
        {
          imgSrc: "img/dacsantran.jpg",
          title: "Quán Đặc Sản Trần",
          timeOpen: "08:00 - 20:00",
          location: "11 Nguyễn Văn Linh, Quận Hải Châu, Thành Phố Đà Nẵng",
          phone: "0905 003 122",
          email: "tran@amthuctran.vn",
          fbLink: "https://www.facebook.com/amthuctran",
          description: `◉ Đặc sản Trần được thành lập vào những năm 2000 bởi bà Trần Thị Mai và nhanh chóng trở thành một thương hiệu nổi tiếng trong lĩnh vực ẩm thực Đà Nẵng. 
          
          ◉ Bà Mai, người sáng lập, đã có nhiều năm kinh nghiệm trong ngành ẩm thực và mong muốn mang đến cho thực khách những món ăn truyền thống, đậm đà hương vị miền Trung. 
          
          ◉ Đặc sản Trần không chỉ là nơi để thưởng thức những món ăn truyền thống của Đà Nẵng mà còn là nơi để cảm nhận sự tinh tế và tâm huyết trong từng món ăn. Vị trí thuận lợi, lịch sử hình thành đầy tâm huyết và vẻ đẹp của các món ăn tại Đặc sản Trần đã tạo nên một thương hiệu ẩm thực được nhiều người yêu thích. 
          `
        },
        {
          imgSrc: "img/nha-hang-lao-dai-seafood-da-nang.jpg",
          title: "Hải Sản Lão Đại",
          location: "Số 50 Đường 3/2, Quận Hải Châu, Thành Phố Đà Nẵng",
          timeOpen: "08:00 - 20:00",
          phone: "0966 666 895",
          email: "contact@laodai.com",
          fbLink: "https://www.facebook.com/LaoDaiDaNang",
          description: `◉ Kể từ khi thành lập, nhà hàng đã không ngừng phát triển và mở rộng, trở thành một trong những điểm đến ưa thích của những người yêu hải sản. Với đội ngũ đầu bếp chuyên nghiệp và giàu kinh nghiệm, Hải sản Lão Đại luôn đảm bảo chất lượng và hương vị tuyệt vời cho từng món ăn.
          
          ◉ Các món ăn tại Hải sản Lão Đại không chỉ ngon miệng mà còn được trình bày đẹp mắt, phản ánh sự tinh tế và công phu trong cách chế biến.Một số món ăn nổi bật bao gồm:
          ★	Tôm hùm nướng bơ tỏi           
          ★	Cua rang me
          ★	Mực nướng sa tế
          ★	Hàu nướng phô mai
          ◉ Hải sản Lão Đại không chỉ nổi bật với những món hải sản tươi ngon, đa dạng mà còn với cách trình bày đẹp mắt và hương vị tuyệt vời. Vị trí thuận lợi, lịch sử hình thành với tâm huyết và đam mê, cùng với vẻ đẹp của các món ăn đã giúp Hải sản Lão Đại trở thành một địa điểm ẩm thực được nhiều người yêu thích tại Đà Nẵng. 
          `
        },
      ];

      // Open the popup with the data corresponding to the clicked button
      openPopup(
        data[index].imgSrc,
        data[index].title,
        data[index].location,
        data[index].timeOpen,
        data[index].phone,
        data[index].email,
        data[index].fbLink,
        data[index].description,

      );
    });
  });
});
