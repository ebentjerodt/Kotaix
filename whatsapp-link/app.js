function generate() {
  const country = document.getElementById('country').value;
  const phone = document.getElementById('phone').value.replace(/\D/g, '');
  const message = document.getElementById('message').value.trim();

  if (!phone) {
    alert('Por favor ingresa un número de teléfono.');
    return;
  }

  const fullNumber = country + phone;
  const encodedMessage = encodeURIComponent(message);
  const url = message
    ? `https://wa.me/${fullNumber}?text=${encodedMessage}`
    : `https://wa.me/${fullNumber}`;

  document.getElementById('generated-link').textContent = url;
  document.getElementById('test-link').href = url;
  document.getElementById('result').style.display = 'block';
}

function copyLink() {
  const link = document.getElementById('generated-link').textContent;
  navigator.clipboard.writeText(link).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = '¡Copiado!';
    setTimeout(() => btn.textContent = 'Copiar', 2000);
  });
}
