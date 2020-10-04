package com.card.payment.repository;

import com.card.payment.domain.CardUser;
import com.card.payment.domain.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PaymentRepository extends MongoRepository<CardUser, String> {
}
