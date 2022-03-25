// Lib

interface JobDefinition<Name extends string, Data = any> {
  name: Name;
  data: Data;
}

class Worker<JD extends JobDefinition<string, unknown>> {
  queueName: string;
  cb: (job: JD) => Promise<void>;
  constructor(queueName: string, cb: (job: JD) => Promise<void>) {
    this.queueName = queueName;
    this.cb = cb;
  }
}

// Userspace


type WeeklyNewsletterData = {
  title: string;
  body: string;
  authorName: string;
}

type WeeklyNewsletterJob = JobDefinition<'weekly-newsletter', WeeklyNewsletterData>;

type MonthlyNewsletterData = {
  title: string;
  articles: Array<{
    title: string;
    body: string;
    authorName: string;
  }>;
}

type MonthlyNewsletterJob = JobDefinition<'monthly-newsletter', MonthlyNewsletterData>;

type Jobs = WeeklyNewsletterJob | MonthlyNewsletterJob;

const worker = new Worker<Jobs>(
  'test',
  async (job) => {
    switch(job.name) {
      case 'weekly-newsletter':
        console.log(job.data.title);
        console.log(job.data.body);
        console.log(job.data.articles);
        break;
      case 'monthly-newsletter':
        console.log(job.data.title);
        console.log(job.data.body);
        console.log(job.data.articles);
        break;
    }
  }
);
