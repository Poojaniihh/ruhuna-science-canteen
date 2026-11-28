// Switch between pages 3, 4 and 5
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageName).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.page === pageName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', () => showPage(button.dataset.page));
});

// Meal customization
const basePrice = 220;
let quantity = 1;
const quantityText = document.getElementById('quantity');
const addButton = document.getElementById('addOrder');

function calculateTotal() {
  let extras = 0;
  document.querySelectorAll('.addon:checked').forEach(item => {
    extras += Number(item.value);
  });
  const total = (basePrice + extras) * quantity;
  addButton.textContent = `Add to Pre-Order • Rs. ${total.toFixed(2)}`;
}

document.getElementById('plus').addEventListener('click', () => {
  quantity++;
  quantityText.textContent = quantity;
  calculateTotal();
});

document.getElementById('minus').addEventListener('click', () => {
  if (quantity > 1) quantity--;
  quantityText.textContent = quantity;
  calculateTotal();
});

document.querySelectorAll('.addon').forEach(item => {
  item.addEventListener('change', calculateTotal);
});

// Small notification message
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

addButton.addEventListener('click', () => {
  showToast(`${quantity} meal(s) added to your pre-order`);
  showPage('token');
});

document.getElementById('receiptBtn').addEventListener('click', () => {
  const receipt = 'Ruhuna Science Canteen\nToken: RSC-104\nStudent: SC/2023/13482\nTotal: Rs. 570.00';
  const file = new Blob([receipt], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = 'canteen-receipt.txt';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Receipt downloaded');
});

document.querySelectorAll('[data-reorder]').forEach(button => {
  button.addEventListener('click', () => {
    showToast('Previous meal added to your pre-order');
    showPage('customize');
  });
});

calculateTotal();
