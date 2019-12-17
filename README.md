# Shell Tech Test

## Endpoints

All endpoints require an apiKey supplied via the `x-api-key` header.

### GET: /history/:captainName
#### REQUEST
`:captainName` - a captains name in the format `<FirstName>+<Surname>` (case insensitive)

#### RESPONSE 
a captain's journey history in JSON format:
```$json
{
    "captainName": "patsy stone",
    "trips": [
        {
            "vessel": "El Tauro",
            "from": "Singapore",
            "to": "Melbourne",
            "fromDate": 1514764800000,
            "toDate": 1515888000000
        }
    ]
}
```

### POST: /arrival
#### REQUEST BODY
```$json
{
	"captain": "Patsy+Stone",
    "vessel": "El Tauro",
    "datetime": "5th of Feb 2056",
    "port": "Singapore"
}
```

#### RESPONSE 
201 - if successful
