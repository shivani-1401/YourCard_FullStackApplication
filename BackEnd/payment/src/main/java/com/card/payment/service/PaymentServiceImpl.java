package com.card.payment.service;

import com.card.payment.domain.CardUser;
import com.card.payment.domain.Payment;
import com.card.payment.exception.*;
import com.card.payment.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements IPaymentService {

    private PaymentRepository repository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository repository) {
        this.repository = repository;
    }

    private CardUser cardUser = null;
    private List<Payment> paymentList = null;


    @Override
    public boolean addPayment(Payment payment) {
        int counter = 1;
        boolean status = false;
        cardUser = new CardUser();
        paymentList = new ArrayList<>();
        if (repository.existsById(payment.getCustomer())) {
            paymentList = repository.findById(payment.getCustomer()).get().getPaymentList();
            Iterator iterator = paymentList.iterator();
            Payment payment1 = new Payment();
            while (iterator.hasNext()) {
                payment1 = (Payment) iterator.next();
            }
            payment.setId(payment1.getId() + counter);
            paymentList.add(payment);
            cardUser.setId(payment.getCustomer());
            cardUser.setPaymentList(paymentList);
            if (repository.save(cardUser) != null) {
                status = true;
            }
        } else {
            payment.setId(counter);
            paymentList.add(payment);
            cardUser.setId(payment.getCustomer());
            cardUser.setPaymentList(paymentList);
            if (repository.insert(cardUser) != null) {
                status = true;
            }
        }
        return status;
    }

    @Override
    public List<Payment> getAllPaymentsByUserId(String userId) throws UserNotFoundException {
        List<Payment> allPayments = null;
        Optional<CardUser> optionalUser = repository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        } else {
            allPayments = repository.findById(userId).get().getPaymentList();
        }
        return allPayments;
    }


    @Override
    public List<Payment> getAllPaymentsByOutlet(String userId, String outletName) throws UserNotFoundException, OutletNotFoundException {

        Optional<CardUser> optionalCardUser = repository.findById(userId);
        if (!optionalCardUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        }
        List<Payment> userPaymentList = optionalCardUser.get().getPaymentList();
        List<Payment> outletList = userPaymentList.stream()
                .filter(payment -> payment.getOutlet().equals(outletName))
                .collect(Collectors.toList());
        if (outletList == null || outletList.size() == 0) {
            throw new OutletNotFoundException("Payment details for the given outlet is not found");
        }
        return outletList;

    }

    @Override
    public List<Payment> getAllPaymentsByCountry(String userId, String country) throws UserNotFoundException, CountryNotFoundException {

        Optional<CardUser> optionalCardUser = repository.findById(userId);
        if (!optionalCardUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        }
        List<Payment> userPaymentList = optionalCardUser.get().getPaymentList();
        List<Payment> countryList = userPaymentList.stream()
                .filter(payment -> payment.getCountry().equals(country))
                .collect(Collectors.toList());
        if (countryList == null || countryList.size() == 0) {
            throw new CountryNotFoundException("Payment details for the given country is not found");
        }
        return countryList;
    }

    @Override
    public List<Payment> getAllPaymentsByCategory(String userId, String category) throws UserNotFoundException, CategoryNotFoundException {
        Optional<CardUser> optionalCardUser = repository.findById(userId);
        if (!optionalCardUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        }
        List<Payment> userPaymentList = optionalCardUser.get().getPaymentList();
        List<Payment> categoryList = userPaymentList.stream()
                .filter(payment -> payment.getCategory().equals(category))
                .collect(Collectors.toList());
        if (categoryList == null || categoryList.size() == 0) {
            throw new CategoryNotFoundException("Payment details for the given category is not found");
        }
        return categoryList;
    }

    @Override
    public List<Payment> getAllPaymentsByCity(String userId, String city) throws UserNotFoundException, CityNotFoundException {

        Optional<CardUser> optionalCardUser = repository.findById(userId);
        if (!optionalCardUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        }
        List<Payment> userPaymentList = optionalCardUser.get().getPaymentList();
        List<Payment> cityList = userPaymentList.stream()
                .filter(payment -> payment.getCity().equals(city))
                .collect(Collectors.toList());
        if (cityList == null || cityList.size() == 0) {
            throw new CityNotFoundException("Payment details for the given city is not found");
        }
        return cityList;
    }

    @Override
    public List<Payment> getAllPaymentsByYear(String userId, String year) throws UserNotFoundException, YearNotFoundException {
        Optional<CardUser> optionalCardUser = repository.findById(userId);
        if (!optionalCardUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        }
        List<Payment> userPaymentList = optionalCardUser.get().getPaymentList();
        List<Payment> yearList = userPaymentList.stream()
                .filter(payment -> payment.getYear().equals(year))
                .collect(Collectors.toList());
        if (yearList == null || yearList.size() == 0) {
            throw new YearNotFoundException("Payment details for the given year is not found");
        }
        return yearList;
    }

    @Override
    public List<Payment> getAllPaymentsByMonth(String userId, String month) throws UserNotFoundException, MonthNotFoundException {
        Optional<CardUser> optionalCardUser = repository.findById(userId);
        if (!optionalCardUser.isPresent()) {
            throw new UserNotFoundException("User with the given id doesn't exist");
        }
        List<Payment> userPaymentList = optionalCardUser.get().getPaymentList();
        List<Payment> monthList = userPaymentList.stream()
                .filter(payment -> payment.getMonth().equals(month))
                .collect(Collectors.toList());
        if (monthList == null || monthList.size() == 0) {
            throw new MonthNotFoundException("Payment details for the given month is not found");
        }
        return monthList;
    }

}