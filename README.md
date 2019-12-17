# Shell Tech Test

## Assumptions made
For the purposes of this exercise I have made the following assumptions:
1) instant turnaround times for ships. (i.e. bunkering and loading/unloading of cargo is instantaneous) as I do not have a `POST: /departure endpoint`
2) vessels and captains must already exist in the system for arrivals at ports to be recorded
3) there will be some sort of existing auth layer between the mobile app and this system, meaning this system does not have to manage sessions.

## Fake Upstream
This app does not call out to the upstream service as per the requirements as details of this service have not been provided, instead I've implemented a fake version for now in-memory.

## Architecture Diagram
Note the below diagram is for how I imagine this would work in production using real downstream services, not how this application currently works.
<img width="1195" alt="Screenshot 2019-12-17 at 19 54 19" src="https://user-images.githubusercontent.com/11778762/71029305-09230880-2107-11ea-817d-e6254e5ed776.png">

## Postman collection
[I have added a postman json for export here](./postman_collection.json)
You will need to update the api key in the collection settings with the value supplied separately.

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
