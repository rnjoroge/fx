# Aza

FX application

## Running Application
1.The easiest way to run the application is using docker ,
  if you have docker installed run
  ```bash
     docker build -t aza/fx:1.0 .
     docker run -dp 8484:8484 aza/fx:1.0 
  ```
2.cd into the aza directory
  ```bash
	  npm install
	  npm build
	  npm start
  ```

The default api port is 8484
NB .. Transaction Created Disappear once the system is restarted.

## Api Documentation
1.Creating a Transaction
```
POST /api/v1/transaction
``` 
Request
```javascript
{
	"CustomerID":"78898",
	"TransactionID":"88888",
	"amount":20,
	"currency":"usd"
}
```
Response
```javascript
{
    "Transactionref": {
        "value": "ref-93833a8c-fffc-47e7-931c-661da9e60ca7"
    }
}
```

2.List All Transactions
```
GET /api/v1/transaction/list
``` 
Response
```javascript
[
    {
        "TransactionID": "88888",
        "CustomerID": "78898",
        "input": {
            "amount": 20,
            "currency": "USD"
        },
        "output": {
            "amount": 2,
            "currency": "USD"
        },
        "transactionDate": "2022-06-12T04:26:52.922Z",
        "Transactionref": "ref-ceda1691-168c-4e41-bb74-a224e1b0870e"
    }
]
```

3.Fetch a  specific transaction by ID

```
GET /api/v1/transaction/{TransactionID}
``` 

Request
```
GET /api/v1/transaction/88888
``` 

Response
```javascript
{
    "TransactionID": "88888",
    "CustomerID": "78898",
    "input": {
        "amount": 20,
        "currency": "USD"
    },
    "output": {
        "amount": 2,
        "currency": "USD"
    },
    "transactionDate": "2022-06-12T04:26:52.922Z",
    "Transactionref": "ref-ceda1691-168c-4e41-bb74-a224e1b0870e"
}
```

## Running Test
  ```bash
	  npm run test
	  npm run test:cov
  ```
   

## Generating Docs
  ```bash
	  npm run generate:docs
  ```
  This command will output a docs folder , using a web server / or opening the index.html file to view the documentations of the applications