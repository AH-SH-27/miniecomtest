package com.example.ecomtest.entity.enums;

public enum Roles {
    USER("Customer"),
    ADMIN("Administrator");

    private final String displayName;

    Roles(String displayName) {
            this.displayName = displayName;
        }

    public String getDisplayName() {
        return displayName;
    }
}