const shell = require('shelljs');

shell.rm('-rf', './out');

if (process.platform === 'darwin') {
  shell.exec('run-s make:mac:**');
} else if (process.platform === 'win32') {
  shell.exec('run-s make:win:**');
}
