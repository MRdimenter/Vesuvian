package ru.vesuvian.amqp.message;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CustomerUUID {
    final String UUID;
}
