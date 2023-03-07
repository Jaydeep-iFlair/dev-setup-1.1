// *******************************************************************************
// Banner Slider
// *******************************************************************************

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// *******************************************************************************
// Hamburger Click
// *******************************************************************************

const hamburgerBtnEle = document.querySelector(".hamburger");

hamburgerBtnEle
  ? hamburgerBtnEle.addEventListener("click", () =>
      document.body.classList.toggle("is-menu-open")
    )
  : "";

// *******************************************************************************
// Dropdown
// *******************************************************************************

// *******************************************************************************
// 1.0 - Open dropdown
// *******************************************************************************

const dropdownElement = document.querySelectorAll(".dropdown");
const dropdownPlaceholderElement = document.querySelectorAll(
  ".dropdown__placeholder"
);

dropdownPlaceholderElement.forEach((el) => {
  el.addEventListener("click", () => {
    const dropdownParent = el.closest(".dropdown");

    dropdownElement.forEach((elem) => {
      if (elem === dropdownParent) {
        // Is this the dropdown we clicked on? Just toggle the class
        elem.classList.toggle("is-open");
      } else {
        // Remove class from all other dropdowns on page
        elem.classList.remove("is-open");
      }
    });
  });
});

// *******************************************************************************
// 2.0 - Click on dropdown option
// *******************************************************************************

const dropdownOptionElement = document.querySelectorAll(
  ".dropdown__list-option"
);
const getHash = () => window.location.hash.replace(/^#/, "");

function changeDropdownValue(
  dropdownParent,
  optionParent,
  dropdownPlaceholderText
) {
  if (!dropdownParent.classList.contains("dropdown--multislect")) {
    dropdownParent.classList.add("dropdown--selected");
    // Change text
    const dropdownOptionText = optionParent.querySelector(
      ".dropdown__list-option"
    ).innerHTML;
    // eslint-disable-next-line no-param-reassign
    dropdownPlaceholderText.innerHTML = dropdownOptionText;
  }

  // Close the dropdown
  dropdownParent.classList.remove("is-open");
  dropdownParent.classList.add("is-selected");
}

dropdownOptionElement.forEach((el) => {
  const dropdownParent = el.closest(".dropdown");
  const optionParent = el.closest(".dropdown__list-item");
  const optionInput = optionParent.querySelector("input");
  const dropdownPlaceholderText = dropdownParent.querySelector(
    ".dropdown__placeholder-text"
  );

  optionInput.addEventListener("change", () => {
    changeDropdownValue(dropdownParent, optionParent, dropdownPlaceholderText);
  });

  el.addEventListener("click", () => {
    changeDropdownValue(dropdownParent, optionParent, dropdownPlaceholderText);
  });

  // Get text if any option selected by default
  if (optionInput.checked) {
    dropdownPlaceholderText.innerHTML = el.innerHTML;
    dropdownParent.classList.remove("is-open");
    dropdownParent.classList.add("is-selected");
  }
});

// *******************************************************************************
// 3.0 - Open a specific dropdown based on has in url
// *******************************************************************************

document.addEventListener("DOMContentLoaded", () => {
  const locationHash = getHash();

  if (locationHash) {
    const selectedElem = document.querySelectorAll(`#${locationHash}`);

    // Loop throught elements to avoid errors if there is no element to be found
    selectedElem.forEach((el) => {
      // Set active selection
      el.setAttribute("checked", "true");

      // Change text
      const dropdownParent = el.closest(".dropdown");
      const optionLabel = el.parentElement.querySelector(
        ".dropdown__list-option"
      );
      const dropdownPlaceholder = dropdownParent.querySelector(
        ".dropdown__placeholder"
      );
      const dropdownOptionText = optionLabel.innerHTML;
      dropdownPlaceholder.innerHTML = dropdownOptionText;
    });
  }
});

document.addEventListener("click", (evt) => {
  const dropdownElemOpened = document.querySelector(".dropdown.is-open");
  let targetElement = evt.target; // clicked element

  do {
    if (targetElement === dropdownElemOpened) {
      return;
    }
    targetElement = targetElement.parentNode;
  } while (targetElement);

  dropdownElement.forEach((el) => {
    const dropdownParent = el.closest(".dropdown");
    dropdownParent.classList.remove("is-open");
  });
});

// *******************************************************************************
// 4.0 - Close dropdown for mobile
// *******************************************************************************

document.querySelector(".dropdown__close").addEventListener("click", (ev) => {
  const dropdownParent = ev.target.closest(".dropdown");
  dropdownParent.classList.remove("is-open");
});
