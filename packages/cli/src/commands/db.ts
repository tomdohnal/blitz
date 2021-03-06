import {spawn} from 'child_process'
import {Command} from '@oclif/command'

export default class Db extends Command {
  static description = 'Run project tests'

  static args = [
    {
      name: 'command',
      description: 'Run specific db command',
      required: true,
    },
  ]

  async run() {
    const {args} = this.parse(Db)
    const command = args['command']
    if (command === 'migrate' || command === 'm') {
      const cp = spawn('prisma2', ['migrate', 'save', '--experimental'], {stdio: 'inherit'})
      cp.on('exit', (code: number) => {
        if (code == 0) spawn('prisma2', ['migrate', 'up', '--experimental'], {stdio: 'inherit'})
      })
    } else if (command === 'init' || command === 'i') {
      spawn('prisma2', ['init'], {stdio: 'inherit'})
    } else {
      this.log('Missing command')
    }
  }
}
