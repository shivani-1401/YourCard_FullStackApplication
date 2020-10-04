package com.card.payment.domain;

public class Payment {

    private int id;
    private String customer;
    private String date;
    private String month;
    private String year;
    private String city;
    private String country;
    private String category;
    private String outlet;
    private String amount;
    private String transactionCurrency;

    public Payment() {
    }

    public Payment(int id, String customer, String date, String month, String year, String city, String country, String category, String outlet, String amount, String transactionCurrency) {
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.month = month;
        this.year = year;
        this.city = city;
        this.country = country;
        this.category = category;
        this.outlet = outlet;
        this.amount = amount;
        this.transactionCurrency = transactionCurrency;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTransactionCurrency() {
        return transactionCurrency;
    }

    public void setTransactionCurrency(String transactionCurrency) {
        this.transactionCurrency = transactionCurrency;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", customer='" + customer + '\'' +
                ", date='" + date + '\'' +
                ", month='" + month + '\'' +
                ", year='" + year + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", category='" + category + '\'' +
                ", outlet='" + outlet + '\'' +
                ", amount='" + amount + '\'' +
                ", transactionCurrency='" + transactionCurrency + '\'' +
                '}';
    }
}
