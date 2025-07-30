export var template = {
    "messageDate": "2020-11-26T13:39:59.9125844+00:00",
    "messageFunction": "Instruction",
    "messageId": "20201126_2",
    "application": {
        "applicationId": 1438,
        "name": "PostNord",
        "version": "1.0"
    },
    "updateIndicator": "Original",
    "shipment": [
        {
            "shipmentIdentification": {
                "shipmentId": "0"
            },
            "dateAndTimes": {
                "loadingDate": "2020-11-26T13:39:59.9125321Z"
            },
            "service": {
                "basicServiceCode": "19",
                "additionalServiceCode": [
                    "A3",
                    "A7"
                ]
            },
            "freeText": [
                {
                    "usageCode": "DEL",
                    "text": ""
                }
            ],
            "numberOfPackages": {
                "value": 1
            },
            "totalGrossWeight": {
                "value": 1.73,
                "unit": "KGM"
            },
            "parties": {
                "consignor": {
                    "issuerCode": "Z12",
                    "partyIdentification": {
                        "partyId": "1111111111",
                        "partyIdType": "160"
                    },
                    "party": {
                        "nameIdentification": {
                            "name": "Consignor"
                        },
                        "address": {
                            "streets": [
                                "Terminalvägen 14"
                            ],
                            "postalCode": "17173",
                            "city": "Solna",
                            "countryCode": "SE"
                        }
                    }
                },
                "consignee": {
                    "party": {
                        "nameIdentification": {
                            "name": "consignee"
                        },
                        "address": {
                            "streets": [
                                "arendalvej 7"
                            ],
                            "postalCode": "9800",
                            "city": "Hjørring",
                            "countryCode": "DK"
                        },
                        "contact": {
                            "contactName": "consignee",
                            "emailAddress": "consignee@me.com",
                            "smsNo": "+4571111199"
                        }
                    }
                },
                "deliveryParty": {
                    "partyIdentification": {
                        "partyIdType": "156"
                    },
                    "party": {
                        "nameIdentification": {
                            "name": "COLLECTSHOP SPAR"
                        },
                        "address": {
                            "streets": [
                                "Nordens Alle 14"
                            ],
                            "postalCode": "9800",
                            "city": "Hjørring",
                            "countryCode": "DK"
                        }
                    }
                }
            },
            "goodsItem": [
                {
                    "packageTypeCode": "PC",
                    "items": [
                        {
                            "itemIdentification": {
                                "itemId": "0",
                                "itemIdType": "SSCC"
                            },
                            "grossWeight": {
                                "value": 1.73,
                                "unit": "KGM"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}