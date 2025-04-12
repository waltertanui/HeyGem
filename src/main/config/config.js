import path from 'path'
import os from 'os'

const isDev = process.env.NODE_ENV === 'development'
const isWin = process.platform === 'win32'

export const serviceUrl = {
  face2face: 'https://api.external-service.com/v1/video',  // Changed to external API
  tts: 'https://api.external-service.com/v1/tts'           // Changed to external API
}

export const assetPath = {
  model: isWin
    ? path.join('C:', 'heygem_data', 'face2face', 'temp')  // Changed from D: to C:
    : path.join(os.homedir(), 'heygem_data', 'face2face', 'temp'),
  ttsProduct: isWin
    ? path.join('C:', 'heygem_data', 'face2face', 'temp')  // Changed from D: to C:
    : path.join(os.homedir(), 'heygem_data', 'face2face', 'temp'),
  ttsRoot: isWin
    ? path.join('C:', 'heygem_data', 'voice', 'data')      // Changed from D: to C:
    : path.join(os.homedir(), 'heygem_data', 'voice', 'data'),
  ttsTrain: isWin
    ? path.join('C:', 'heygem_data', 'voice', 'data', 'origin_audio')  // Changed from D: to C:
    : path.join(os.homedir(), 'heygem_data', 'voice', 'data', 'origin_audio')
}

export const apiConfig = {
  apiKey: 'your-api-key-here',
  maxConcurrentTasks: 10,  // Increase this value
  retryCount: 3,
  timeout: 30000
}
