var colors = require('colors');
var logger = require('tracer').colorConsole({
  methods: ['log', 'info', 'warn', 'error', 'debug', 'socket_info', 'keepalive', 'route_info'],
  filters: {
    log : colors.yellow,
    info : colors.green,
    warn : colors.magenta,
    error : [colors.red, colors.bold],
    debug : colors.cyan,
    socket_info : colors.blue,
    keepalive : colors.grey,
    route_info : colors.cyan
  },
  format: [
    "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
    {
      error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}",
      keepalive: "{{timestamp}} {{message}}"
    }
  ],
  dateformat: "yyyy-mm-dd HH:MM:ss.L"
});

module.exports = logger;
