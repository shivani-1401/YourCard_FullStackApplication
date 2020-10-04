package com.card.payment.controller;

import com.card.payment.domain.Payment;
import com.card.payment.exception.*;
import com.card.payment.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PaymentController {

    IPaymentService paymentService;
    ResponseEntity responseEntity;

    @Autowired
    public PaymentController(IPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/addPayment")
    public ResponseEntity<?> addNote(@RequestBody Payment payment) {
        if (paymentService.addPayment(payment)) {
            return new ResponseEntity<Payment>(payment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<String>("Oops something went wrong !! try again", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/allPayments/{userId}")
    public ResponseEntity<?> getAllPaymentsByUserId(@PathVariable String userId) {
        try {
            List<Payment> userPayments = paymentService.getAllPaymentsByUserId(userId);
            responseEntity = new ResponseEntity<List<Payment>>(userPayments, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }


    @GetMapping("/allPaymentsByOutlet/{userId}/{outletName}")
    public ResponseEntity<?> getAllPaymentsByOutletName(@PathVariable String userId, @PathVariable String outletName) {

        try {
            List<Payment> paymentListByOutletName = paymentService.getAllPaymentsByOutlet(userId, outletName);
            responseEntity = new ResponseEntity(paymentListByOutletName, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OutletNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return responseEntity;
    }

    @GetMapping("/allPaymentsByCountry/{userId}/{country}")
    public ResponseEntity<?> getAllPaymentsByCountryName(@PathVariable String userId, @PathVariable String country) {

        try {
            List<Payment> paymentListByCountryName = paymentService.getAllPaymentsByCountry(userId, country);
            responseEntity = new ResponseEntity(paymentListByCountryName, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (CountryNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return responseEntity;
    }

    @GetMapping("/allPaymentsByCategory/{userId}/{category}")
    public ResponseEntity<?> getAllPaymentsByCategoryName(@PathVariable String userId, @PathVariable String category) {

        try {
            List<Payment> paymentListByCategoryName = paymentService.getAllPaymentsByCategory(userId, category);
            responseEntity = new ResponseEntity(paymentListByCategoryName, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (CategoryNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return responseEntity;
    }

    @GetMapping("/allPaymentsByCity/{userId}/{city}")
    public ResponseEntity<?> getAllPaymentsByCityName(@PathVariable String userId, @PathVariable String city) {

        try {
            List<Payment> paymentListByCityName = paymentService.getAllPaymentsByCity(userId, city);
            responseEntity = new ResponseEntity(paymentListByCityName, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch ( CityNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return responseEntity;
    }

    @GetMapping("/allPaymentsByYear/{userId}/{year}")
    public ResponseEntity<?> getAllPaymentsByYear(@PathVariable String userId, @PathVariable String year) {

        try {
            List<Payment> paymentListByYear = paymentService.getAllPaymentsByYear(userId, year);
            responseEntity = new ResponseEntity(paymentListByYear, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (YearNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return responseEntity;
    }

    @GetMapping("/allPaymentsByMonth/{userId}/{month}")
    public ResponseEntity<?> getAllPaymentsByMonth(@PathVariable String userId, @PathVariable String month) {

        try {
            List<Payment> paymentListByMonth = paymentService.getAllPaymentsByMonth(userId, month);
            responseEntity = new ResponseEntity(paymentListByMonth, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (MonthNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }


}