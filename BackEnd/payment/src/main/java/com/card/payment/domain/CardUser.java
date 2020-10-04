package com.card.payment.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class CardUser {

    @Id
    private String id;
    private List<Payment> paymentList;

    public CardUser() {
    }

    public CardUser(String id, List<Payment> paymentList) {
        this.id = id;
        this.paymentList = paymentList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Payment> getPaymentList() {
        return paymentList;
    }

    public void setPaymentList(List<Payment> paymentList) {
        this.paymentList = paymentList;
    }

    @Override
    public String toString() {
        return "CardUser{" +
                "id='" + id + '\'' +
                ", paymentList=" + paymentList +
                '}';
    }
}
