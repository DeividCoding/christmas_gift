document.addEventListener('DOMContentLoaded', function() {

fetch('/get-recipient-info') // Cambia la ruta a la que corresponda en tu servidor
    .then(response => response.json())
    .then(data => {
        const recipientNameElement = document.getElementById('recipientName');
        const giftDateElement = document.getElementById('giftDate');
        
        recipientNameElement.textContent = data.recipientName;
        giftDateElement.textContent = data.giftDate;
    })
    .catch(error => console.error('Error:', error));
    

  // Obtener la fecha objetivo desde el servidor
  fetch('/target-date')
      .then(response => response.json())
      .then(data => {
          const targetTime = new Date(data.targetDate).getTime();
          const countdownElement = document.getElementById('countdown');
          const giftButton = document.getElementById('giftButton');

          const updateCountdown = () => {
              const currentTime = new Date().getTime();
              const difference = targetTime - currentTime;

              if (difference > 0) {
                  // Actualiza la cuenta regresiva
                  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                  countdownElement.innerText = `${hours}h ${minutes}m ${seconds}s`;
              } else {
                  // Detener la cuenta regresiva y habilitar el botón
                  clearInterval(interval);
                  countdownElement.innerText = "¡Es hora de abrir el regalo!";
                  giftButton.disabled = false;
              }
          };

          const interval = setInterval(updateCountdown, 1000);
          updateCountdown();
      })
      .catch(error => console.error('Error:', error));

  // Manejar el clic en el botón
  const giftButton = document.getElementById('giftButton');
  giftButton.addEventListener('click', function() {
      fetch('/send-email', { method: 'POST' })
          .then(response => response.text())
          .then(data => alert(data)) // Muestra una alerta con la respuesta del servidor
          .catch(error => {
              console.error('Error:', error);
              alert('Error al enviar el correo');
          });
  });
});