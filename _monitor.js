const TITLE = 'My Monitor'
const REFRESH_RATE = 1000 //ms
const WIDTH = 500 //px
const HEIGHT = WIDTH/16*9 //px

/** @param {NS} ns */
export async function main(ns) {
  ns.tail()
  ns.setTitle(TITLE)
  ns.moveTail(0, 0)
  ns.resizeTail(WIDTH, HEIGHT)
  ns.disableLog('ALL')

  while(true) {
    ns.clearLog()
    ns.print(`INFO monitor ${new Date()}`)
    await ns.asleep(REFRESH_RATE)
  }
}
