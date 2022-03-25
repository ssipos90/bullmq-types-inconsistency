import { Queue, Worker } from 'bullmq';

type WeeklyNewsletterData = {
  title: string;
  body: string;
  authorName: string;
}

type MonthlyNewsletterData = {
  title: string;
  articles: Array<{
    title: string;
    body: string;
    authorName: string;
  }>;
}

type DataType = WeeklyNewsletterData | MonthlyNewsletterData;
type ReturnType = void;
type Jobs = 'weekly-newsletter' | 'monthly-newsletter';

const queueName = 'user-report-notification';

const queue = new Queue<DataType, ReturnType, Jobs>(queueName);

const worker = new Worker<DataType, ReturnType, Jobs>(
  queueName,
  async job => {
    switch (job.name) {
      case 'weekly-newsletter':
        console.log(job.data.title);
        console.log(job.data.body);
        break;
      case 'monthly-newsletter':
        console.log(job.data.articles);
        break;
    }
  }
);

worker.on('error', console.error);
