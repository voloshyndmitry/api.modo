import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AmqpController } from '../Controllers/amqp.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
                    queue: 'main_queue',
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [AmqpController],
})
export class AmqpModule {}
