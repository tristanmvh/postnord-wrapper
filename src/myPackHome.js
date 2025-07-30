import { loadTemplate, getDate } from "./functions.js";

export class MyPackHome {

    //create booking data
    async create(postnordCustomer, basicServiceCode, reference, freeText, weight, additionalServiceCodes, sender, customer) {
        const now = new getDate();

        //get myPackHome Small template
        var data = await loadTemplate("myPackHome.json");

        //Parcel information
        data.messageDate = now.ISO;
        data.messageId = now.short;
        if (reference.toString().trim() !== "") data.messageId += "-" + reference.toString();
        data.shipment[0].totalGrossWeight.value = weight;
        data.shipment[0].dateAndTimes.loadingDate = now.ISO;
        data.shipment[0].goodsItem[0].items[0].grossWeight.value = weight;
        data.shipment[0].freeText[0].text = freeText;
        data.shipment[0].service.basicServiceCode = basicServiceCode.toString();
        data.shipment[0].service.additionalServiceCode = additionalServiceCodes;

        //Sender information
        data.shipment[0].parties.consignor.party = sender.toJSON();
        data.shipment[0].parties.consignor.partyIdentification.partyId = postnordCustomer.customerNumber;
        data.shipment[0].parties.consignor.issuerCode = postnordCustomer.issuerCode;

        //Customer information
        data.shipment[0].parties.consignee.party = customer.toJSON();
        return data;
    }
}