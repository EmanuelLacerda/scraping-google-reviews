import axios from 'axios';
import dotenv from 'dotenv';

import { SQS } from '@aws-sdk/client-sqs';

dotenv.config();

const apiV1 = axios.create({ baseURL: process.env.BASE_URL_API_V1 })

const sqs = new SQS({ apiVersion: '2012-11-05' });

export async function run() {
    const response = await apiV1.get(`business/`);

    for(const business of response.data){
        const result = await sqs.sendMessage({
            MessageGroupId: business.id,
            MessageBody: `${business.id}`,
            QueueUrl: process.env.SQS_QUEUE_URL,
        })

        console.log(`Message sent to the SQS queue with MessageId: ${result.MessageId}`);
    }
}