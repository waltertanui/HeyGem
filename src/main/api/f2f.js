import request from './request.js'
import { serviceUrl } from '../config/config.js'
import log from '../logger.js'

// Face-to-face video operations
export function makeVideo(param) {
  log.debug('~ makeVideo ~ param:', JSON.stringify(param))
  return request.post('https://api.external-service.com/v1/video/submit', param)
}

export function getVideoStatus(taskCode) {
  return request.get(`https://api.external-service.com/v1/video/status?code=${taskCode}`).then((res) => {
    log.debug('~ getVideoStatus ~ res:', JSON.stringify(res))
    return res
  })
}

// Text-to-speech operations
export function generateTTS(params) {
  log.debug('~ generateTTS ~ params:', JSON.stringify(params))
  return request.post('https://api.external-service.com/v1/tts/generate', params)
}

export function getTTSStatus(taskId) {
  return request.get(`https://api.external-service.com/v1/tts/status/${taskId}`).then((res) => {
    log.debug('~ getTTSStatus ~ res:', JSON.stringify(res))
    return res
  })
}
