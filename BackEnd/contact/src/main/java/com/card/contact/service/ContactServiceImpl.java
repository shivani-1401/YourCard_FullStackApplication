package com.card.contact.service;

import com.card.contact.domain.Contact;
import com.card.contact.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements IContactService {

    private ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public boolean addQuery(Contact contact) {
        boolean flag = false;
        Contact savedContact = contactRepository.save(contact);
        if (savedContact != null) {
            flag = true;
        }
        return flag;
    }
}
