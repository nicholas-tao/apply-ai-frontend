var uid; //global variable for userid

function sendEmail() {
  let email = document.getElementById("exampleInputEmail1").value;
  console.log("email: " + email);
  if (validateEmail(email)) {
    //document.getElementById("email-error").style.visibility = "hidden";
    document.getElementById("email-error").style.color = "Green";
    document.getElementById("email-error").innerText =
      "Confirmation email sent!";
    document.getElementById("verification-div").style.visibility = "visible";
    let formData = new FormData();
    formData.append("email", email);

    let fetchURL = "https://api.apply-ai.online/start?email=" + email;
    console.log("Fetchurl " + fetchURL);
    (async () => {
      const rawResponse = await fetch(fetchURL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
  } else {
    //document.getElementById("email-error").style.visibility = "visible";
    document.getElementById("email-error").style.color = "Red";
    document.getElementById("email-error").innerText =
      "Invalid email. Please try again";
  }
}

function sendCode() {
  let verificationCode = document.getElementById("verification-field").value;
  let email = document.getElementById("exampleInputEmail1").value;
  let formData = new FormData();
  formData.append("email", email);
  formData.append("pin", verificationCode);

  (async () => {
    const rawResponse = await fetch("https://api.apply-ai.online/start", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    });
    const content = await rawResponse.json();

    console.log(content);
    if (content.body.success) {
      uid = content.body.uid;
      window.location.href = "/uploadresume.html";
    } else {
      document.getElementById("verification-error").style.visibility =
        "visible";
      document.getElementById("email-error").style.color = "Red";
      document.getElementById("email-error").innerText =
        "Invalid code. Please try again";
    }
  })();
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function uploadResume() {
  var input = document.querySelector('input[type="file"]');

  var formData = new FormData();
  formData.append("file", input.files[0]);
  formData.append("uid", uid);

  async () => {
    const rawResponse = await fetch("https://api.apply-ai.online/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    });
    const content = await rawResponse.json();

    console.log("content: " + content);

    if (content.body.success) {
      window.location.href = "/editresume.html";
      console.log("ade it");
      //CHANGE THIS VARIABLE TO parsedResumeData after!!!
      let parsedResumeData2 = content.body.data; //json of parsed resume data

      //this is a testing object representing the response i get from backend
      let parsedResumeData = {
        name: "zaina qasim",
        phone_number: "(513) 739 4757",
        email: "qasimza@mail.uc.edu",
        degree: "bs",
        locations: ["cincinnati", "matlab", "india"],
        skills: [
          "java, python, c++",
          "adobe indesign",
          "adobe illustrator",
          "adobe dreamweaver",
          "microsoft",
          "coursera",
          "university of cincinnati",
          "ieee@uc",
          "indian council of secondary education",
          "infinera corporation",
        ],
        socials: {
          linkedin: "linkedin.com/in/zaina-qasim-87706a17b",
          github: "https://github.com/qasimza",
        },
      };

      populateResumeFields(parsedResumeData); //populate resume data textfields with data from parsedResumeData HERE!!!
    } else {
      console.log("not successful upload of resume");
    }
  };
}

//this is a testing object representing the response i get from backend
let parsedResumeData = {
  name: "zaina qasim",
  phone_number: "(513) 739 4757",
  email: "qasimza@mail.uc.edu",
  degree: "bs",
  locations: ["cincinnati", "matlab", "india"],
  skills: [
    "java, python, c++",
    "adobe indesign",
    "adobe illustrator",
    "adobe dreamweaver",
    "microsoft",
    "coursera",
    "university of cincinnati",
    "ieee@uc",
    "indian council of secondary education",
    "infinera corporation",
  ],
  socials: {
    linkedin: "linkedin.com/in/zaina-qasim-87706a17b",
    github: "https://github.com/qasimza",
  },
};

populateResumeFields(parsedResumeData); //populate resume data textfields with data from parsedResumeData HERE!!!

function populateResumeFields(parsedResumeData) {
  console.log("called");
  document.getElementById("full-name").value = parsedResumeData.name;
  document.getElementById("email").value = parsedResumeData.email;
  document.getElementById("phone").value = parsedResumeData.phone_number;
  document.getElementById("linkedin").value = parsedResumeData.socials.linkedin;
  document.getElementById("skills").value = parsedResumeData.skills;
  document.getElementById("school").value = "University of Waterloo";
  document.getElementById("school-info").value =
    parsedResumeData.degree.toUpperCase() + ", Computer Science";
  document.getElementById("grad-year").value = "2022";
  document.getElementById("company1").value = "Facebook";
  document.getElementById("title1").value = "Software Engineer Intern";
  document.getElementById("dates1").value = "May 2020-Aug 2020";
  document.getElementById("description1").value =
    "Built modern applications with JAVA, Spring, Spring Boot, SQL Server, No SQL.\n\nDeveloped microservices and Web Services (incl. REST/SOAP/WSDL/XML/SOA).\n\nBuilt on Pivotal Cloud Foundry Platform (Gradle, GitHub).\n\nContinuously integrated and deployed developed software. Updated the continuous integration/deployment scripts as necessary to improve continuous integration practices.";

  document.getElementById("company2").value = "Google";
  document.getElementById("title2").value = "Software Engineer Intern";
  document.getElementById("dates2").value = "May 2019-Aug 2019";
  document.getElementById("description2").value =
    "Composed an app to allow voice control of lights, garage door, and home thermostat, using an Amazon Echo and Raspberry Pi.\n\nBuilt a real-time stock picking app that compares the current price to Uniform Adjusted Financial Reporting Standards data to identify buy-now opportunities.\n\nBuilt new search functionality into the next generation StratoDB scalable database management system.";

  document.getElementById("company3").value = "Amazon";
  document.getElementById("title3").value =
    "Software Development Engineer Intern";
  document.getElementById("dates3").value = "May 2018-Aug 2018";
  document.getElementById("description3").value =
    "Structure several internal systems comprising order entry/management tools, conversion/revenue reporting, and production workflow tracking, as well as designed custom REST APIs built in Python, Laravel PHP, and NodeJS.\n\nSuccessfully installed Linux servers and virtualized environments using Docker, Hyper-V, and Amazon Web Services.\n\nDesigned and implemented PHP web application, streamlining high-server traffic resource configuration and allocation.";
}

function sendResumeUpdated() {
  let data = {
    name: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    phone_number: document.getElementById("phone").value,
    socials: {
      linkedin: document.getElementById("linkedin").value,
    },
    skills: document.getElementById("skills").value,
    school: document.getElementById("school").value,
    school_info: document.getElementById("school-info").value,
    grad_year: document.getElementById("grad-year").value,
    jobs: {
      [0]: {
        company: document.getElementById("company1").value,
        title: document.getElementById("title1").value,
        dates: document.getElementById("dates1").value,
        description: document.getElementById("description1").value,
      },
      [1]: {
        company: document.getElementById("company2").value,
        title: document.getElementById("title2").value,
        dates: document.getElementById("dates2").value,
        description: document.getElementById("description2").value,
      },
      [2]: {
        company: document.getElementById("company3").value,
        title: document.getElementById("title3").value,
        dates: document.getElementById("dates3").value,
        description: document.getElementById("description3").value,
      },
    },
  }; //data is the updated resume data json

  var formData = new FormData();
  formData.append("data", data); //data is the updated resume data json
  formData.append("uid", uid);
  console.log("clickd");
  async () => {
    const rawResponse = await fetch("https://api.apply-ai.online/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    });
    const content = await rawResponse.json();

    console.log("content: " + content);
    if (content.body.success) {
      window.location.href = "/viewjobs.html";
    } else {
      console.log("not successful update");
    }
  };
}

!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 15;
  $(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function (
    e
  ) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == "#header") {
          scrollto = 0;
        }

        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, #mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      900: {
        items: 2,
      },
    },
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);
