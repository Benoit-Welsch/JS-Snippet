export default class Queue extends Array {
  running = 0;
  maxjob = 1;

  constructor(maxjob = 1, jobs = []) {
    super(0);
    this.maxjob = maxjob - 1;
    jobs.forEach((j) => this.push(j));
  }

  async exec() {
    if (this.running > this.maxjob || this.length <= 0) return;
    const job = this.shift();
    if (!job || !job.run || job.running) return;
    this.running += 1;
    if (this.running < this.maxjob) this.exec();
    return job.run().then(() => {
      this.running -= 1;
      this.exec();
    });
  }

  add(f) {
    this.push({ run: f, running: false });
    this.exec();
  }
}
