package com.infosys.educationconsultancyapplication.controller;

import com.infosys.educationconsultancyapplication.bean.CourseSubscription;
import com.infosys.educationconsultancyapplication.dto.CourseSubscriptionDto;
import com.infosys.educationconsultancyapplication.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/edu-con/subscriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class SubscriptionPaymentController {

    private final SubscriptionService subscriptionService;

    public SubscriptionPaymentController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Get All Subscriptions
    @GetMapping("/all")
    public ResponseEntity<List<CourseSubscription>> getAllSubscriptions() {
        List<CourseSubscription> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    // Get Subscription By ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseSubscription> getSubscriptionById(@PathVariable String id) {
        Optional<CourseSubscription> subscription = subscriptionService.getSubscriptionById(id);
        return subscription.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create Subscription
    @PostMapping("/create")
    public ResponseEntity<?> createSubscription(@RequestBody CourseSubscriptionDto subscription) {

        try {
            CourseSubscription savedSubscription = subscriptionService.addSubscription(subscription);
            return ResponseEntity.ok(savedSubscription);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error processing subscription: " + e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing subscription: " + e.getMessage());
        }
    }

    // Get Active Subscriptions
    @GetMapping("/active")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CourseSubscription>> getActiveSubscriptions() {
        List<CourseSubscription> activeSubscriptions = subscriptionService.getActiveSubscriptions();
        return ResponseEntity.ok(activeSubscriptions);
    }

    // Cancel Subscription
//    @PutMapping("/cancel/{id}")
//    public ResponseEntity<CourseSubscription> cancelSubscription(@PathVariable String id) {
//        Optional<CourseSubscription> subscription = subscriptionService.getSubscriptionById(id);
//        if (subscription.isPresent()) {
//            CourseSubscription cancelledSubscription = subscriptionService.cancelSubscription(id);
//            return ResponseEntity.ok(cancelledSubscription);
//        }
//        return ResponseEntity.notFound().build();
//    }
}
