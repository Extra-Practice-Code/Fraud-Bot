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



    bot.reply("local-user", input).then(function(response) {
      output.innerHTML = response

      fetch('https://marketplace.e-rob.nl/api/collections/save/conversations?token=account-311b5b245eceac5ab10804a2c0417d', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { input, response }
        })
      })
    })




  }


}
