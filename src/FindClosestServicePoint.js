import { Customer } from "./Customer.js";

export async function closestServicePoint(customer, url, apiKey) {
    const customerAddress = customer.getAddress();
    const country = customerAddress.country;
    const postalCode = customerAddress.postalCode;
    const city = customerAddress.city;
    const street = customerAddress.street;

    const params = `?apikey=${apiKey}&returnType=json&countryCode=${country}&agreementCountry=SE&city=${city}&postalCode=${postalCode}&streetName=${street}&numberOfServicePoints=1&srId=EPSG:4326&context=optionalservicepoint&responseFilter=public&typeId=25&callback=json`;

    var endpoint = "/rest/businesslocation/v5/servicepoints/nearest/byaddress"

    return await fetch(url + endpoint + params).then(async (response) => {
        const data = await response.text().then((text) => {
            return text.slice(5, -1);
        });
        return JSON.parse(data);
    });
}


