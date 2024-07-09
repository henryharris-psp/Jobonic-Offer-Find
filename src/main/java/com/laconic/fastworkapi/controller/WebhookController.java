package com.laconic.fastworkapi.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@Tag(name = "webhook", description = "Webhook related APIs")
@RestController
@RequestMapping("/api/v1/webhook")
public class WebhookController {

    public record NotificationPayload(@JsonProperty(value = "txn_hash") String txnHash,
                                      @JsonProperty(value = "block_id") String blockId,
                                      @JsonProperty(value = "from_address")  String fromAddress,
                                      @JsonProperty(value = "contract_address")  String contractAddress,
                                      @JsonProperty(value = "to_address")  String toAddress,
                                      @JsonProperty(value = "amount")  String amount,
                                      @JsonProperty(value = "decimals")  String decimals,
                                      @JsonProperty(value = "currency")  String currency,
                                      @JsonProperty(value = "chain") String chain,
                                      @JsonProperty(value = "paid_at")  String paidAt){}
    @PostMapping
    public String test(@RequestBody NotificationPayload notificationPayload) {
        if (notificationPayload != null) System.out.println(notificationPayload);
        else {
            System.out.println("Response is null");
        }
        return "SUCCESS";
    }
}
