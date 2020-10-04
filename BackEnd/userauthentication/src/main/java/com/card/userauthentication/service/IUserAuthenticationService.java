package com.card.userauthentication.service;

import com.card.userauthentication.domain.User;
import com.card.userauthentication.exception.UserAlreadyExistsException;
import com.card.userauthentication.exception.UserNotFoundException;

public interface IUserAuthenticationService {

    public User findByIdAndPassword(String username, String password) throws UserNotFoundException;

    boolean saveUser(User user) throws UserAlreadyExistsException;

    public String getUserBaseCurrency(String userId) throws UserNotFoundException;

    public String getUserBalance(String userId) throws UserNotFoundException;

    public User updateBalance(User user) throws UserNotFoundException;

    public User getUserById(String userId) throws UserNotFoundException;

    public String getCustomerId(String userId) throws UserNotFoundException;

    public String getCardNo(String userId) throws UserNotFoundException;
}
