import { Worker, isMainThread, parentPort } from 'worker_threads'
import HeyGenAPIManager from '../api/heyGenManager.js'
import { apiConfig } from '../config/config.js'

class TaskManager {
  constructor() {
    this.apiManager = new HeyGenAPIManager(apiConfig.apiKey)
    this.workers = []
    this.taskQueue = []
    this.initWorkers()
  }

  initWorkers() {
    for (let i = 0; i < apiConfig.maxConcurrentTasks; i++) {
      const worker = new Worker(__filename)
      worker.on('message', this.handleWorkerMessage.bind(this))
      worker.on('error', this.handleWorkerError.bind(this))
      this.workers.push(worker)
    }
  }

  addTask(task) {
    this.taskQueue.push(task)
    this.processTasks()
  }

  processTasks() {
    while (this.workers.length > 0 && this.taskQueue.length > 0) {
      const worker = this.workers.pop()
      const task = this.taskQueue.shift()
      worker.postMessage(task)
    }
  }

  handleWorkerMessage(result) {
    this.workers.push(result.worker)
    this.processTasks()
    // Handle task result
  }

  handleWorkerError(error) {
    console.error('Worker error:', error)
    // Implement error handling and retry logic
  }
}

if (!isMainThread) {
  parentPort.on('message', async (task) => {
    try {
      const result = await processTask(task)
      parentPort.postMessage({ worker: this, result })
    } catch (error) {
      parentPort.postMessage({ worker: this, error })
    }
  })

  async function processTask(task) {
    // Implement task processing logic
  }
}

export default TaskManager