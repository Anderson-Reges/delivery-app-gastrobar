const minSizePass = 6;
function validateEmail(email) {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

export default function validateLogin(username, password) {
  if (username === '' || password === '') {
    return ('Digite seu email ou senha');
  }
  if (password.length < minSizePass) {
    return ('Senha com menos de seis digitos');
  }
  if (!validateEmail(username)) {
    return ('Formato de email inválido');
  }
}
