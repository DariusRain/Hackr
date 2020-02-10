
const input = document.getElementsByTagName("input");
// const form_login = document.getElementById('form_login');
input[input.length - 1].style.display = "none";
input[
  input.length - 1
].previousElementSibling.previousElementSibling.style.display = "none";

////////////////////Login~sign-up//////////////////////
const form_signup = document.getElementById("form_signup"),
  form_login = document.getElementById("form_login");

const button_signup = document.getElementById("signup"),
  button_login = document.getElementById("login");

input.password1_signup.addEventListener("keypress", password_again);
form_signup.addEventListener("submit", signUp);
form_login.addEventListener("submit", login);

////////////////Functions///////////////////
async function gitCheck(user) {
  const response = await fetch(`https://api.github.com/users/${user}`)
    .then(result => result.json())
    .then(result => {
      if (!result.message) {
        return result;
      } else {
        alert("Must include github");
        return false;
      }
    });
  console.log(response);
  return response;
}

async function signUp() {
  event.preventDefault();
  const gitStatus = await gitCheck(input.github_signup.value).then(result => {
    return result;
  })
  if (input.password1_signup.value === input.password2_signup.value) {
    console.log(1, gitStatus);
    if (gitStatus) {
      await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: input.github_signup.value.toString(),
          password: input.password1_signup.value.toString(),
          data: gitStatus
        })
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }else {
      alert("Passwords dont match!")
    }
  }
}

async function login() {
  event.preventDefault();
//   (async () => {
//     try {
//       const rawResponse = await fetch("http://localhost:5000/user/login", {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username: input.github_username.value.toString(),
//           password: input.login_password.value.toString()
//         })
//       });

//       const content = await rawResponse.json();
//       if (content.message) {
//         alert(content.message);
//         return;
//       }
//       console.log(content);
//     } catch (err) {
    
//     }
//   })();

    const status = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: input.github_username.value.toString(),
            password: input.login_password.value.toString()
        })
    }).then(result => {
        
        return result;
    })
    .catch(err => {
      return err
    })
    const end = await status.json()
    console.log(end)
    console.log(end.id)
 if(end.id){   
window.location = `http://localhost:5000/user/profile/${end.id}`
 }
 else {
   alert("Invalid login credentials!")
   window.location.reload()
 }
}

function password_again() {
  input[input.length - 1].style.display = "block";
  input[
    input.length - 1
  ].previousElementSibling.previousElementSibling.style.display = "inline";
  button_signup.style.display = "block";
}
