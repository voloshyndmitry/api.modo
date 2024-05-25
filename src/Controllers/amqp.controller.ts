import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller("amqp")
export class AppController {
    constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

    @Get('send')
    async sendMessage() {
        const message = { text: 'Hello from RabbitMQ Microservice' };
        return this.client.emit('message_printed', message);
    }

    @EventPattern('message_printed')
    handleMessagePrinted(data: Record<string, unknown>) {
        console.log('Received message:', data);
    }
}
