export interface Invoice{
    id: String;
    transactionId: Number,
    customerId: String,
    customerName: String,
    customerStreetAddress: String,
    city: String,
    countyOrState: String,
    postcode: String,
    phone: String,
    email: String,
    orders:[{
        itemId: Number,
        description: String,
        price: Number,
        quantity: Number
    }],
    transactionDate: String,
    completed:{
        type: Boolean,
        default: false
    }
}