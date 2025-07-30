export class ServicePointLocation {
    #name;
    #address;
    #id;

    constructor(name, address, id) {
        this.#id = id;
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
            partyIdentification: {
                partyId: this.#id,
                partyIdType: "156"
            },
            party: {
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
}