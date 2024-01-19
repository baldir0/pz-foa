import Log4js from 'log4js';

Log4js.configure({
  appenders: { out: { type: 'stdout' } },
  categories: {
    default: { appenders: ['out'], level: 'all' },
  },
});

export default Log4js;
