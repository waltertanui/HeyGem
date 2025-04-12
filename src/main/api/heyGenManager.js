import axios from 'axios'
import log from '../logger.js'

class HeyGenAPIManager {
  constructor(apiKey, baseUrl = 'https://api.external-service.com/v1') {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
    this.token = null
    this.queue = []
    this.isProcessing = false
  }

  async authenticate() {
    try {
      const response = await axios.post(`${this.baseUrl}/token`, {
        api_key: this.apiKey
      })
      this.token = response.data.token
      log.info('Authentication successful')
      return true
    } catch (error) {
      log.error('Authentication failed:', error)
      throw error
    }
  }

  async createModelTask(modelData) {
    try {
      const response = await axios.post(`${this.baseUrl}/model`, modelData, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      return response.data.task_id
    } catch (error) {
      log.error('Model task creation failed:', error)
      throw error
    }
  }

  async createVideoTask(videoData) {
    try {
      const response = await axios.post(`${this.baseUrl}/video`, videoData, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      return response.data.task_id
    } catch (error) {
      log.error('Video task creation failed:', error)
      throw error
    }
  }

  async checkTaskStatus(taskId) {
    try {
      const response = await axios.get(`${this.baseUrl}/video/${taskId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      return response.data
    } catch (error) {
      log.error('Task status check failed:', error)
      throw error
    }
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return
    
    this.isProcessing = true
    const task = this.queue.shift()
    
    try {
      const result = await this.processTask(task)
      task.resolve(result)
    } catch (error) {
      task.reject(error)
    } finally {
      this.isProcessing = false
      this.processQueue()
    }
  }

  async enqueueTask(taskType, taskData) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        type: taskType,
        data: taskData,
        resolve,
        reject
      })
      this.processQueue()
    })
  }

  async processTask(task) {
    switch (task.type) {
      case 'model':
        return this.createModelTask(task.data)
      case 'video':
        return this.createVideoTask(task.data)
      default:
        throw new Error('Unknown task type')
    }
  }

  handleCallback(callbackData) {
    try {
      const { event_type, data } = callbackData
      
      switch (event_type) {
        case 'model_success':
          this.handleModelSuccess(data)
          break
        case 'model_failed':
          this.handleModelFailure(data)
          break
        case 'video_success':
          this.handleVideoSuccess(data)
          break
        case 'video_failed':
          this.handleVideoFailure(data)
          break
        default:
          log.warn('Unknown callback type:', event_type)
      }
    } catch (error) {
      log.error('Callback handling failed:', error)
    }
  }

  handleModelSuccess(data) {
    // Implement model success handling
    log.info('Model task completed successfully:', data)
  }

  handleModelFailure(data) {
    // Implement model failure handling
    log.error('Model task failed:', data)
  }

  handleVideoSuccess(data) {
    // Implement video success handling
    log.info('Video task completed successfully:', data)
  }

  handleVideoFailure(data) {
    // Implement video failure handling
    log.error('Video task failed:', data)
  }
}

export default HeyGenAPIManager