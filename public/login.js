
async function validateLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('api/fazlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Erro na requisição:', response.statusText);
        alert('Usuário ou senha incorretos. Tente novamente.');
      } else {
        console.error('Erro na requisição:', response.statusText);
        throw new Error('Erro na requisição');
      }
    }

    const userResponse = await response.json();

    console.log("userResponse loginuser", userResponse);

    if (response.ok) {
      console.log('Login successful.');
      localStorage.setItem('token', userResponse.token);
      enviatoken(); 
    }

  } catch (error) {
    console.error('Error making login request:', error);
  } finally {
    console.log('Redirecionando para /cadastroproprietario...');
    window.location.href = '/cadastroproprietario';
  }
}


async function enviatoken(){

const token = localStorage.getItem('token');

  fetch('/enviar-token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Token enviado com sucesso para o servidor');
  })
  .catch(error => console.error('Erro ao enviar o token:', error));
    window.location.href = '/login'; 

}
