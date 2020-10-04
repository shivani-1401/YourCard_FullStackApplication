package com.card.userauthentication.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {

    @Id
    private String id;
    private String dob;
    private String aadhaarNo;
    private String panNo;
    private Address address;
    private String country;
    private String password;
    private String amount;
    private String customerId;
    private String cardNo;
    private String baseCurrency;
    private String cardType;
    private String cardLimit;
    private String isActive;

    public User() {
    }

    public User(String id, String dob, String aadhaarNo, String panNo, Address address, String country, String password, String amount, String customerId, String cardNo, String baseCurrency, String cardType, String cardLimit, String isActive) {
        this.id = id;
        this.dob = dob;
        this.aadhaarNo = aadhaarNo;
        this.panNo = panNo;
        this.address = address;
        this.country = country;
        this.password = password;
        this.amount = amount;
        this.customerId = customerId;
        this.cardNo = cardNo;
        this.baseCurrency = baseCurrency;
        this.cardType = cardType;
        this.cardLimit = cardLimit;
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAadhaarNo() {
        return aadhaarNo;
    }

    public void setAadhaarNo(String aadhaarNo) {
        this.aadhaarNo = aadhaarNo;
    }

    public String getPanNo() {
        return panNo;
    }

    public void setPanNo(String panNo) {
        this.panNo = panNo;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getBaseCurrency() {
        return baseCurrency;
    }

    public void setBaseCurrency(String baseCurrency) {
        this.baseCurrency = baseCurrency;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardLimit() {
        return cardLimit;
    }

    public void setCardLimit(String cardLimit) {
        this.cardLimit = cardLimit;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", dob='" + dob + '\'' +
                ", aadhaarNo='" + aadhaarNo + '\'' +
                ", panNo='" + panNo + '\'' +
                ", address=" + address +
                ", country='" + country + '\'' +
                ", password='" + password + '\'' +
                ", amount='" + amount + '\'' +
                ", customerId='" + customerId + '\'' +
                ", cardNo='" + cardNo + '\'' +
                ", baseCurrency='" + baseCurrency + '\'' +
                ", cardType='" + cardType + '\'' +
                ", cardLimit='" + cardLimit + '\'' +
                ", isActive='" + isActive + '\'' +
                '}';
    }
}
