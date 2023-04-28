function registerUser(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    regValidation(name,email,phone)
    postUser(name,email,phone)
    console.log(name , email, phone);
}

function regValidation(name,email,phone){
    if(name.length < 5){alert('name must be at least 2 character')}
    if(phone.length != 11){alert('phone must be at least 11 character')}
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
        alert("invalid email address!");
    }
}


function postUser(name,email,phone){
        const config = {
          headers:{
          'cache-control': 'no-cache',
          'content-type': 'application/json' 
          }
        };
        const url = "http://localhost:3000/api/users";
        
        const data ={
          name: name,
          email: email,
          phone: phone
        }
        axios.post(url, data, config)
          .then(res => console.log(res))
          .catch(err => console.log(err))
}