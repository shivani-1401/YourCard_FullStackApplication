package com.card.payment.service;

import com.card.payment.domain.Payment;
import com.card.payment.exception.*;

import java.util.List;

public interface IPaymentService {

    boolean addPayment(Payment payment);

    List<Payment> getAllPaymentsByUserId(String userId) throws UserNotFoundException;

    List<Payment> getAllPaymentsByOutlet(String userId, String outletName) throws UserNotFoundException, OutletNotFoundException;

    List<Payment> getAllPaymentsByCountry(String userId, String country) throws UserNotFoundException, CountryNotFoundException;

    List<Payment> getAllPaymentsByCategory(String userId, String category) throws UserNotFoundException, CategoryNotFoundException;

    List<Payment> getAllPaymentsByCity(String userId, String city) throws UserNotFoundException, CityNotFoundException;

    List<Payment> getAllPaymentsByYear(String userId, String year) throws UserNotFoundException, YearNotFoundException;

    List<Payment> getAllPaymentsByMonth(String userId, String month) throws UserNotFoundException, MonthNotFoundException;
}