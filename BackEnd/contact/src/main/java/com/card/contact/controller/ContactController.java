package com.card.contact.controller;

import com.card.contact.domain.Contact;
import com.card.contact.service.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ContactController {

    private IContactService contactService;
    private ResponseEntity responseEntity;

    @Autowired
    public ContactController(IContactService contactService){
        this.contactService = contactService;
    }

    @PostMapping("/addQuery")
    public ResponseEntity<?> registerUser(@RequestBody Contact contact) {
        try {
            this.contactService.addQuery(contact);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        return new ResponseEntity(contact, HttpStatus.CREATED);
    }
}
