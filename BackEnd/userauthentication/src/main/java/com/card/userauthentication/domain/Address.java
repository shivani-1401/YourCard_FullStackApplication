package com.card.userauthentication.domain;

public class Address {

    private String houseNo;
    private String district;
    private String state;

    public Address() {
    }

    public Address(String houseNo, String district, String state) {
        this.houseNo = houseNo;
        this.district = district;
        this.state = state;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Address{" +
                "houseNo='" + houseNo + '\'' +
                ", district='" + district + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
