const minSizePass = 6;
function validateEmail(email) {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

export default function validateLogin(username, password) {
  if (username === '' || password === '') {
    return true;
  }
  if (password.length < minSizePass) {
    return true;
  }
  if (!validateEmail(username)) {
    return true;
  }
}
