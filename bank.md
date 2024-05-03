# SQL Financial Project
---
**Project Description**: Data mined 1.2M real bank transactions to find financial outliers for anomalies & correlations

## This can be a template for an internal project

### 1. SQL Queries
Below are the SQL queries used in the project, each query is accompanied by its respective output image:

#### 3.2 Examine Borrower and 'Due to IDA' fields for the first 10 transactions
```sql
SELECT Borrower, Country, "Due to IDA" AS due
FROM banking_data
WHERE due IS NOT NULL AND "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
ORDER BY due DESC
LIMIT 10;
```
<img src="images/3.2.JPG?raw=true"/>

#### 3.3 Examine the Region and 'Due to IDA' fields but alias the latter so it's easier to read
```sql
SELECT region, ROUND(SUM("Due to IDA"),2) AS total_due
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
GROUP BY region
ORDER BY total_due DESC;
```
<img src="images/3.3.JPG?raw=true"/>

#### 3.4 Find out what transactions have the lowest service charge rate.
```sql
SELECT *
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
ORDER BY "Service Charge Rate" ASC;
```
<img src="images/3.4.JPG?raw=true"/>

#### 3.5 Calculate the total number of transactions
```sql
SELECT COUNT(*) AS total_transactions
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data);
```
<img src="images/3.5.JPG?raw=true"/>

#### 3.6 Calculate the total number of transactions per country
```sql
SELECT country, COUNT(*) AS total_transactions
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data);
GROUP BY country
ORDER BY total_transactions DESC
LIMIT 10;
```
<img src="images/3.6.JPG?raw=true"/>

#### 3.7 Find the maximum amount owed to the IDA
```sql
SELECT country, MAX("Due to IDA") AS max_owed
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data);
GROUP BY country
ORDER BY max_owed DESC
LIMIT 10;
```
<img src="images/3.7.JPG?raw=true"/>
