# SQL Financial Project
---
**Project Description**: Data mined 1.2M real bank transactions to find financial outliers for anomalies & correlations

## This can be a template for an internal project
**Project description:** You can use this template to create projects in the future. Simply duplicate the page and change the text and images.

### 1. You can have sections and text.
Just like this. And you can even add internal coding blocks

```SQL
print('this is the python code I used to solve this problem')
```

### 2. You can add any images you'd like.
![Your Image Description](images/dummy_thumbnail.jpg)

### 3. SQL Queries
Below are the SQL queries used in the project, each query is accompanied by its respective output image:

#### 3.1 Select All
```sql
SELECT *
FROM banking_data;
```
![Your Image Description](images/select_all.jpg)

#### 3.2 Limit
```sql
SELECT borrower, "Due to IDA"
FROM banking_data
LIMIT 5;
```
![Your Image Description](images/limit.jpg)

#### 3.3 Alias
```sql
SELECT region, "Due to IDA" AS due
FROM banking_data
LIMIT 20;
```
**Image Placeholder:** ![Your Image Description](images/alias.jpg)

#### 3.4 WHERE
```sql
SELECT *
FROM banking_data
WHERE country = 'Nicaragua';
```
**Image Placeholder:** ![Your Image Description](images/where.jpg)

#### 3.5 Count
```sql
SELECT COUNT(*) FROM banking_data;
SELECT COUNT("Due to IDA") FROM banking_data WHERE country = 'Nicaragua';
```
**Image Placeholder:** ![Your Image Description](images/count.jpg)

#### 3.6 Number of Transactions per Country
```sql
SELECT country, COUNT(*) FROM banking_data GROUP BY "country";
```
**Image Placeholder:** ![Your Image Description](images/transactions.jpg)

#### 3.7 Max/MIN
```sql
SELECT MAX("Due to IDA")
FROM banking_data;
```
**Image Placeholder:** ![Your Image Description](images/max_min.jpg)

#### 3.8 Owed to the IDA (Cummulative SUM)
```sql
SELECT SUM("Due to IDA")
FROM banking_data;
```
**Image Placeholder:** ![Your Image Description](images/owed_sum.jpg)

#### 3.9 Owed to the IDA (Regular)
```sql
SELECT SUM("Due to IDA")
FROM banking_data
WHERE "End of Period" = (SELECT MAX("End of Period")
FROM banking_data);
```
**Image Placeholder:** ![Your Image Description](images/owed_regular.jpg)

#### 3.10 Average Service Charge Rate for a Loan
```sql
SELECT AVG("Service Charge Rate")
FROM banking_data;
```
**Image Placeholder:** ![Your Image Description](images/avg_rate.jpg)

#### 3.11 Lowest Service Charge Rate Transactions
```sql
SELECT *
FROM banking_data
ORDER BY "Service Charge Rate" ASC;
```
**Image Placeholder:** ![Your Image Description](images/lowest_rate.jpg)

#### 3.12 Loans from Honduras with Service Charge Rate > 1
```sql
SELECT *
FROM "banking_data"
WHERE country = 'Honduras' AND "Service Charge Rate" > 1;
```
**Image Placeholder:** ![Your Image Description](images/honduras_loans.jpg)

#### 3.13 Loans with Project Name 'COTTON' or 'RIVER'
```sql
SELECT *
FROM "banking_data"
WHERE "Project Name" = 'COTTON' OR "Project Name" = 'RIVER';
```
**Image Placeholder:** ![Your Image Description](images/cotton_river.jpg)

#### 3.14 Loans not of Project Name 'COTTON'
```sql
SELECT *
FROM "banking_data"
WHERE NOT "Project Name" = 'COTTON';
```
**Image Placeholder:** ![Your Image Description](images/not_cotton.jpg)

