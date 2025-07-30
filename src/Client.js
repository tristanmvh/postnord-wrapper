import { MyPackHome } from "./myPackHome.js";
import { closestServicePoint as sp } from "./FindClosestServicePoint.js";
import { ServicePoint } from "./servicePoint.js";
import { ServicePointLocation } from "./ServicePointLocation.js";

export class PostNordClient {
    static #customerNumber;
    static #apiKey;
    static #initialized = false;
    static #appName;
    static #issuerCode;
    static #postnordURL;
    static #isTest;

    /*
     * Initialize the client
     */

    init(config) {
        PostNordClient.#initialized = true;


        PostNordClient.#customerNumber = config.customerNumber;
        PostNordClient.#issuerCode = config.issuerCode;
        PostNordClient.#appName = config.appName;

        if (config.isTest) {
            PostNordClient.#postnordURL = "https://atapi2.postnord.com";
            PostNordClient.#apiKey = config.apiKeyTest;
        } else {
            PostNordClient.#postnordURL = "https://api2.postnord.com"
            PostNordClient.#apiKey = config.apiKey;
        }
    }

    isInitialized() {
        return PostNordClient.#initialized;
    }

    async myPackHomeSmall(reference, freeText, weight, additionalServiceCodes, sender, customer) {
        if (!PostNordClient.#initialized) {
            console.error("The client has not been initialized.");
            return undefined;
        }
        const body = await new MyPackHome().create({customerNumber: PostNordClient.#customerNumber, issuerCode: PostNordClient.#issuerCode }, "30", reference, freeText, weight, additionalServiceCodes, sender, customer);
        console.dir(body, { depth: null, colors: true });
        const response = await this.#request(
            "/shipment/v3/edi/labels/pdf",
            "paperSize=A4&rotate=0&multiPDF=false&labelType=standard&pnInfoText=false&labelsPerPage=100&page=1&processOffline=false&storeLabel=true",
            body
        );
        return response;
    }

    async closestServicePoint(customer) {
        return await sp(customer, PostNordClient.#postnordURL, PostNordClient.#apiKey);
    }

    async servicePoint(reference, freeText, weight, additionalServiceCodes, sender, customer) {
        if (!PostNordClient.#initialized) {
            console.error("The client has not been initialized.");
            return undefined;
        }
        
        const spJSON = await this.closestServicePoint(customer);
        const spName = spJSON.servicePointInformationResponse.servicePoints[0].name;
        const spAddress = spJSON.servicePointInformationResponse.servicePoints[0].deliveryAddress;
        const servicePointLocation = new ServicePointLocation(
            spName, 
            {
                street: `${spAddress.streetName} ${spAddress.streetNumber}`,
                city: spAddress.city,
                postalCode: spAddress.postalCode,
                country: spAddress.countryCode
            },
            spJSON.servicePointInformationResponse.servicePoints[0].servicePointId
        );

        const body = await new ServicePoint().create({customerNumber: PostNordClient.#customerNumber, issuerCode: PostNordClient.#issuerCode }, "19", reference, freeText, weight, additionalServiceCodes, sender, customer, servicePointLocation);
        //console.dir(body, { depth: null, colors: true });
        const response = await this.#request(
            "/shipment/v3/edi/labels/pdf",
            "paperSize=A4&rotate=0&multiPDF=false&labelType=standard&pnInfoText=false&labelsPerPage=100&page=1&processOffline=false&storeLabel=true",
            body
        );
        return response;
    }

    async returnQR(kolli, email, locale) {
        const body = [
            {
                id: kolli
            }
        ];
        const response = await this.#request("/shipment/v3/returns/qrcode/ids", `qrCodeScale=4&emailQRcodeTo=${email}&locale=${locale}`, body); 
        return response;
    }

    async #request(endpoint, param, body) {        
        const response = await fetch(`${PostNordClient.#postnordURL}/rest${endpoint}?apikey=${PostNordClient.#apiKey}&${param}`, {
            "method": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return response.text();
    }
    
}