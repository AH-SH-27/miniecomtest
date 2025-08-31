package com.example.ecomtest.entity.enums;

public enum StockStatus {
        OUT_OF_STOCK("Out of Stock"),
        LOW_STOCK("Low Stock"),
        IN_STOCK("In Stock");

        private final String displayName;

        StockStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }

}
