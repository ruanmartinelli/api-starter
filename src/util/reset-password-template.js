module.exports = ({ appName, userEmail, redirectPasswordChanged = '/' }) => `<html>

  <head>
    <meta charset="UTF-8">
  </head>
  <body>

    <h1>${appName}</h1>
    <h2>Reset Password for ${userEmail}</h2>

    <p><strong>Old Password</strong></p>
    <input id="oldpwd" name="oldpwd" type="password" placeholder="Old password" />
    <br>
    <p><strong>New Password</strong></p>
    <input id="pwd" name="pwd" type="password" placeholder="New password" />
    <br>
    <p><strong>Repeat</strong></p>
    <input id="pwd2" name="pwd2" type="password" placeholder="Repeat new password" />
    <br><br>
    <button id="submit" type="button">Reset</button>

    <p id="message">
    </p>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.2/axios.min.js"></script>
    <script>
      var submitBtn = document.querySelector('#submit')
      var oldPasswordInput = document.querySelector('#oldpwd')
      var passwordInput = document.querySelector('#pwd')
      var password2Input = document.querySelector('#pwd2')
      var messageText = document.querySelector('#message')
      var params = (new URL(document.location)).searchParams;

      function resetPassword(){
        console.log(oldPasswordInput.value)
        console.log(passwordInput.value)
        console.log(password2Input.value)

        axios.post('/reset', {
          oldpwd: oldPasswordInput.value,
          pwd: passwordInput.value,
          pwd2: password2Input.value,
          t: params.get("t")
        })
        .then(() => {
          window.location.replace('${redirectPasswordChanged}')
        }).catch(err => {
          if(err.response.data.message){
            messageText.textContent = err.response.data.message
            messageText.style.color = 'red'
          }
        })
      }

      submitBtn.addEventListener('click', resetPassword)

    </script>

  </body>
  <style>
    body{font-family: monospace}
  </style>
</html>`
