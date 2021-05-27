export default function authHeader() {
    let user = localStorage.getItem('user_token');
  
    if (user) {
      return { Authorization: 'Bearer ' + user };
    } else {
      return {};
    }
  }
  