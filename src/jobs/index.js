const schedule = require('node-schedule')

function init () {
  remindToDrinkWater()
}

function remindToDrinkWater () {
  schedule.scheduleJob('0 */2 * * *', () => {
    console.log('\n Reminder: go get a cup of water 💧\n')
  })
}

module.exports = { init }
