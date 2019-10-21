function startBot() {

  var bot = new RiveScript()
  bot.loadFile("brain.rive").then(loading_done).catch(loading_error)

  function loading_done() {
    console.log("Bot has finished loading!")
    bot.sortReplies()
  }

  let username = "local-user"

  function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error)
}

  let button = document.getElementById('submit')
  let user_input = document.getElementById('user_input')
  let output = document.getElementById('output')

  button.addEventListener("click", chat)

  function chat() {
    let input = user_input.value

    var messageArea = document.getElementById('messages')

    var userMessage = document.createElement('p')
    userMessage.setAttribute('class', 'user-chat')
    userMessage.innerHTML = input
    messageArea.appendChild(userMessage)

    setTimeout(function() { bot.reply("local-user", input).then(function(response) {
    var botMessage = document.createElement('p')
    botMessage.setAttribute('class', 'bot-chat')
    botMessage.innerHTML = response
    messageArea.appendChild(botMessage)

      fetch('https://marketplace.e-rob.nl/api/collections/save/conversations?token=account-311b5b245eceac5ab10804a2c0417d', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { input, response }
        })
      })
    })
  }, 1000)
      window.scrollTo(0,document.querySelector("#messages").scrollHeight);
      user_input.value = "";

}
}
