import winston from 'winston';
import newrelicFormatter from '@newrelic/winston-enricher';
import time from 'moment-timezone';
import path from 'path';

import { TZ } from './constants';


const { createLogger, format, transports } = winston;
const newRelicForm = newrelicFormatter(winston);
const { combine, printf } = format;

const timezoned = () => time(new Date()).tz(TZ).format('YYYY-MM-DD HH:mm:SS');

const myFormat = printf(
  ({ level, message, timestamp }) =>
    `[${timestamp}] - [${level.padEnd(5, ' ')}] - ${message}`
)

const LOG = createLogger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'debug',
  format: combine(
    newRelicForm(),
    format.timestamp({ format: timezoned }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.Http({
      host: 'localhost',
      path: '/logs',
    }),
    new transports.File({ filename: path.join('logs', '/logs.txt') })
  ]
})

LOG.debugJSON = (message, json) => {
  if (LOG.isDebugEnabled()) {
    LOG.debug(`${message}: ${JSON.stringify(json)}`)
  }
}

LOG.error = message => {
  if (message instanceof Object) {
    LOG.log({
      level: 'error',
      message: JSON.stringify(message)
    })
  } else {
    LOG.log({
      level: 'error',
      message
    })
  }
}

module.exports = { LOG }
