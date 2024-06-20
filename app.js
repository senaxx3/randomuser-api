const yeniKullaniciButton = document.getElementById('yeni-kullanici');
const userInfoContainer = document.getElementById('user-info');

yeniKullaniciButton.addEventListener('click', async () => { 
  try {
    const apiKey = '9US4-184P-EJ7O-8KYE'; 
    const apiUrl = `https://randomuser.me/api/?key=${apiKey}`;

    const response = await fetch(apiUrl); 

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const kullanici = data.results[0];

    const userInfoHTML = `
      <img src="${kullanici.picture.large}" alt="${kullanici.name.first} ${kullanici.name.last}">
      <h2>${kullanici.name.title} ${kullanici.name.first} ${kullanici.name.last}</h2>
      <p>E-posta: ${kullanici.email}</p>
      <p>Telefon: ${kullanici.phone}</p>
      <p>Adres: ${kullanici.location.street.name} ${kullanici.location.street.number}, ${kullanici.location.city}, ${kullanici.location.state}, ${kullanici.location.country}</p>
    `;

    userInfoContainer.innerHTML = userInfoHTML;
  } catch (error) {
    console.error('API error:', error);
    // Optionally display an error message to the user
  }
});

