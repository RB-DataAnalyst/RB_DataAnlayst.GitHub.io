# SQL Financial Project
---
**Project Description**: This project explores the extensive dataset of World Bank loans to uncover interesting financial trends and patterns across various countries.

## Key Findings
1. Diverse Borrowing Patterns: There's a significant range in borrowing behaviors among different countries.
2. Transaction Trends: The frequency and size of transactions vary widely, revealing different financial behaviors.
3. Payment Dynamics: Recent data shows varied rates of loan repayments, providing insights into financial health.

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
<img src="images/SFP1.JPG?raw=true"/>

#### 3.3 Examine the Region and 'Due to IDA' fields but alias the latter so it's easier to read
```sql
SELECT region, ROUND(SUM("Due to IDA"),2) AS total_due
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
GROUP BY region
ORDER BY total_due DESC;
```
<img src="images/SFP2.JPG?raw=true"/>

#### 3.4 Find out what transactions have the lowest service charge rate.
```sql
SELECT region, AVG("Service Charge Rate") AS avg_rate
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
GROUP BY region
ORDER BY avg_rate DESC;
```
<img src="images/SFP3.JPG?raw=true"/>

#### 3.5 Calculate the total number of transactions
```sql
SELECT COUNT(*) AS total_transactions
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data);
```
<img src="images/SFP4.JPG?raw=true"/>

#### 3.6 Calculate the total number of transactions per country
```sql
SELECT country, COUNT(*) AS total_transactions
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
GROUP BY country
ORDER BY total_transactions DESC
LIMIT 10;
```
<img src="images/SFP5.JPG?raw=true"/>

#### 3.7 Find the maximum amount owed to the IDA
```sql
SELECT country, MAX("Due to IDA") AS max_owed
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period") FROM banking_data)
GROUP BY country
ORDER BY max_owed DESC
LIMIT 10;
```
<img src="images/SFP6.JPG?raw=true"/>
