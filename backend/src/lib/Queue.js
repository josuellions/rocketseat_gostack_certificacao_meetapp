import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import InscritionMail from '../app/jobs/InscritionMail';

const jobs = [InscritionMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /** Criando novo item na fila */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /** Executando os items da fila */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
