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
