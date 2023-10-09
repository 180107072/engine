/**
 * Load core module
 */
import core from '@engine/modules/pythonRPA/pythonRPA.module.json' assert { type: 'json' }
import shared from '@engine/modules/pythonRPA/pythonRPA.shared.json' assert { type: 'json' }

import http, { IncomingMessage, ServerResponse } from 'node:http'

const data = JSON.stringify({ pythonRPA: { core, shared } })

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const listener = (_, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': 'application/json'
  }

  res.writeHead(200, headers)
  res.end(data)
}

http.createServer(listener).listen(3000)
