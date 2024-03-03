// Utility ------------------------------------------

function getValueById(id) {
  return document.getElementById(id).innerText;
}

function setValueById(id, value) {
  document.getElementById(id).innerText = value;
}

function calculateTotalPrice(seatCount, seatPrice) {
  return (seatCount * parseFloat(seatPrice)).toFixed(2);
}

function calculateGrandTotalPrice() {
  const totalPrice = parseFloat(getValueById("total-price")) || 0;
  setValueById("grand-total", totalPrice.toFixed(2));
}

function getCouponValue(couponValue) {
  const input = document.getElementById(couponValue);
  const inputValue = input.value;
  return inputValue;
}

// Main Script --------------------------------------

const allSeat = document.querySelectorAll("#seat");
for (const addSeat of allSeat) {
  addSeat.addEventListener("click", seatSelection);
}

function seatSelection(ss) {
  const selectedSeat = parseInt(getValueById("selected-seat")) || 0;
  const availableSeat = parseInt(getValueById("available-seat")) || 40;

  if (selectedSeat <= 3) {
    setValueById("selected-seat", selectedSeat + 1);
    setValueById("available-seat", availableSeat - 1);

    const selectedArea = ss.target.innerText;
    const price = getValueById("seat-fare");
    const selectedContainer = document.getElementById("seat-list");

    const div = document.createElement("div");
    div.className = "flex justify-between w-full text-left mb-2";

    const title1 = document.createElement("h4");
    title1.innerText = selectedArea;

    const title2 = document.createElement("h4");
    title2.innerText = "Economy";

    const title3 = document.createElement("h4");
    title3.innerText = price;

    div.appendChild(title1);
    div.appendChild(title2);
    div.appendChild(title3);

    selectedContainer.appendChild(div);

    ss.target.classList.add(
      "text-white",
      "bg-green-500",
      "pointer-events-none"
    );

    const newTotalPrice = calculateTotalPrice(selectedSeat + 1, price);
    setValueById("total-price", newTotalPrice);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You can't select more than 4 seats.",
    });
  }

  calculateGrandTotalPrice();

  const busSeat = parseInt(getValueById("selected-seat")) || 0;

  const applyButton = document.getElementById("apply");
  applyButton.disabled = busSeat <= 3;

  const phoneNumber = document.getElementById("phone-number");
  phoneNumber.addEventListener("keyup", function (event) {
    const phoneNumberLength = event.target.value.toString().length;
    const button = document.getElementById("submit");
    button.disabled = !(phoneNumberLength > 0 && busSeat > 0);
  });
}

const button = document.getElementById("apply");
button.addEventListener("click", function () {
  const inputCoupon = getCouponValue("coupon");
  const grandTotalElement = document.getElementById("total-price");
  const grandTotal = parseInt(grandTotalElement.innerText);

  if (inputCoupon === "NEW15" || inputCoupon === "Couple 20") {
    const discountPercentage = inputCoupon === "NEW15" ? 0.15 : 0.2;
    const discount = grandTotal * discountPercentage;
    const discountedTotal = grandTotal - discount;

    setValueById("discount", discount.toFixed(2));
    setValueById("grand-total", discountedTotal.toFixed(2));

    document.getElementById("coupon-section").className = "hidden";
    document.getElementById("discount-section").classList.remove("hidden");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Coupon",
    });
  }
});
