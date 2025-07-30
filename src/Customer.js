

export class Customer {

    #name;
    #address;
    #email;
    #phone;

    /**
     * Used to specify recipient/customer information
     * @param {string} name - Customer name
     * @param {string} email - Email address
     * @param {string} phone - Phonenumber
     * @param {Object} address - Delivery address
     * @param {string} address.street - Street name
     * @param {string} address.city - City name
     * @param {string} address.postalCode - Postal/ZIP code
     * @param {string} address.country - Country code
     */



    constructor(name, email, phone, address) {
        this.#name = name;
        this.#address = address;
        this.#email = email;
        this.#phone = phone;
    }

    /**
     * 
     * @returns {string} name
     */

    getName() {
        return this.#name;
    }

    getAddress() {
        return this.#address;
    }

    getPhoneNumber() {
        return this.#phone;
    }

    getEmail() {
        return this.#email;
    }



    toJSON() {
        return {
            nameIdentification: {
                name: this.#name
            },
            address: {
                streets: [
                    this.#address.street
                ],
                postalCode: this.#address.postalCode,
                city: this.#address.city,
                countryCode: this.#address.country
            },
            contact: {
                contactName: this.#name,
                emailAddress: this.#email,
                smsNo: this.#phone
            }
        }
    }
}
