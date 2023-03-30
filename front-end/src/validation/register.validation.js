const minSizePass = 6;
const minSizeName = 12;
function validateEmail(email) {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

export default function validateRegister(name, password, email) {
  if (email === '' || password === '') {
    return ('Digite seu email ou senha');
  }
  if (password.length < minSizePass) {
    return ('Senha com menos de seis digitos');
  }
  if (!validateEmail(email)) {
    return ('Formato de email inválido');
  }
  if (name.length < minSizeName) {
    return ('Nome com menos de doze digitos');
  }
}
