package com.card.userauthentication.controller;

import com.card.userauthentication.domain.User;
import com.card.userauthentication.exception.UserAlreadyExistsException;
import com.card.userauthentication.exception.UserNotFoundException;
import com.card.userauthentication.service.IUserAuthenticationService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class UserAuthenticationController {

    private Map<String, String> map = new HashMap<>();
    private IUserAuthenticationService authService;

    @Autowired
    public UserAuthenticationController(IUserAuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        try {
            this.authService.saveUser(user);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        return new ResponseEntity(user, HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity userLogin(@RequestBody User user) {

        try {
            String jwtToken = generateToken(user.getId(), user.getPassword());
            map.put("message", "User successfully logged in");
            map.put("user", user.getId());
            map.put("token", jwtToken);
        } catch (Exception e) {
            map.put("message", e.getMessage());
            map.put("token", null);
            return new ResponseEntity(map, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity(map, HttpStatus.OK);


    }

    private String generateToken(String id, String password) throws Exception {
        String jwtToken = "";
        if (id == null || password == null) {
            throw new Exception("Please send valid username or password");
        }
        //validate the user from db
        User user = authService.findByIdAndPassword(id, password);
        if (user == null) {
            throw new Exception("Invalid credentials");
        } else {
            jwtToken = Jwts.builder()
                    .setSubject(id)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 300000000))
                    .signWith(SignatureAlgorithm.HS256, "secretkey")
                    .compact();
        }
        return jwtToken;
    }

    @GetMapping("/getBaseCurrency/{userId}")
    public ResponseEntity<?> getBaseCurrency(@PathVariable String userId) {

        try {
            String baseCurrency = authService.getUserBaseCurrency(userId);
            HashMap<String, String> map = new HashMap<>();
            map.put("baseCurrency", baseCurrency);
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (UserNotFoundException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUserBalance/{userId}")
    public ResponseEntity<?> getUserBalance(@PathVariable String userId) {

        try {

            String balance = authService.getUserBalance(userId);

            HashMap<String, String> map = new HashMap<>();
            map.put("balance", balance);
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (UserNotFoundException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateBalance")
    public ResponseEntity<?> updateBalance(@RequestBody User user) {

        try {
            User updatedUser = authService.updateBalance(user);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } catch (UserNotFoundException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {

        try {
            User user = authService.getUserById(userId);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserNotFoundException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCustomerId/{userId}")
    public ResponseEntity<?> getCustomerId(@PathVariable String userId) {

        try {

            String customerId = authService.getCustomerId(userId);
            HashMap<String, String> map = new HashMap<>();
            map.put("customerId", customerId);
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCardNo/{userId}")
    public ResponseEntity<?> getCardNo(@PathVariable String userId) {

        try {

            String cardNo = authService.getCardNo(userId);
            HashMap<String, String> map = new HashMap<>();
            map.put("cardNo", cardNo);
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (UserNotFoundException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
