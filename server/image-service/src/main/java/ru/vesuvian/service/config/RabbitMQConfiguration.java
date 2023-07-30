package ru.vesuvian.service.config;

import lombok.Getter;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class RabbitMQConfiguration {
    @Value("${rabbitmq.exchanges.customer-events}")
    private String customerEventsExchange;

    @Value("${rabbitmq.queues.image-service-new-customer}")
    private String newCustomerQueue;

    @Value("${rabbitmq.routing-keys.new-customer-event}")
    private String newCustomerEventRoutingKeys;

    @Bean
    public TopicExchange internalTopicExchange() {
        return new TopicExchange(this.customerEventsExchange);
    }

    @Bean
    public Queue notificationQueue() {
        return new Queue(this.newCustomerQueue);
    }

    @Bean
    public Binding internalToNotificationBinding() {
        return BindingBuilder
                .bind(notificationQueue())
                .to(internalTopicExchange())
                .with(this.newCustomerEventRoutingKeys);
    }
}
