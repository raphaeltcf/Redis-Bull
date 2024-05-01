import redisConfig from "../config/redis";
import * as jobs from "../jobs";
import Queue, { QueueOptions } from "bull";

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis: redisConfig } as QueueOptions),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(jobName: any, data: any) {
    const queue = this.queues.find((q) => q.name === jobName);

    return queue!.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.name, job.data);
        console.log(err);
      });
    });
  },
};
