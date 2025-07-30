export class Sender {
    #customerNumber
    #name;
    #address;

    /**
     * Used to specify the sender's information
     * @param {string} name - Sender name
     * @param {Object} address - Sender address
     * @param {string} address.street - Street name
     * @param {string} address.city - City name
     * @param {string} address.postalCode - Postal/ZIP code
     * @param {string} address.country - Country code
     */
    
    constructor(name, address) {
        this.#name = name;
        this.#address = address;
    }

    getName() {
        return this.#name;
    }

    getAddress() {
        return this.#address;
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
            }
        }
    }
}
