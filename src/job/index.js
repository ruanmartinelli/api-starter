import schedule from 'node-schedule'

function init() {
  remindToDrinkWater()
}

/**
 * Example job
 */
function remindToDrinkWater() {
  schedule.scheduleJob('* */2 * * *', () => {
    console.log('\n Reminder: go get a cup of water 💧\n')
  })
}

export default { init }
