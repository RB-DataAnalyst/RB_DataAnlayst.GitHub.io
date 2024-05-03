# SQL Financial Project
---
**Project Description**: Data mined 1.2M real bank transactions to find financial outliers for anomalies & correlations

## This can be a template for an internal project


### 1. You can have sections and text.

### 2. You can add any images you'd like.
<img src="images/dummy_thumbnail.JPG?raw=true"/>

### 3. SQL Queries
Below are the SQL queries used in the project, each query is accompanied by its respective output image:

#### 3.1 Explore the table by returning all its content
```sql
SELECT *
FROM banking_data;
```
<img src="images/3.1.JPG?raw=true"/>

#### 3.2 Examine Borrower and 'Due to IDA' fields for the first five transactions
```sql
SELECT borrower, country,"Due to IDA" AS due
FROM banking_data
```
<img src="images/3.2.JPG?raw=true"/>

#### 3.3 Examine the Region and 'Due to IDA' fields but alias the latter so it's easier to read
```sql
SELECT region, "Due to IDA" AS due
FROM banking_data
LIMIT 20;
```
<img src="images/3.3.JPG?raw=true"/>

#### 3.4 Examine all transactions from Nicaragua
```sql
SELECT *
FROM banking_data
WHERE country = 'Nicaragua';
```
<img src="images/3.4.JPG?raw=true"/>

#### 3.5 Calculate the total number of transactions
```sql
SELECT COUNT(*) AS total_transactions
FROM banking_data;
```
<img src="images/3.5.JPG?raw=true"/>

#### 3.6 Calculate the total number of transactions per country
```sql
SELECT country, COUNT(*) AS total_transactions
FROM banking_data
GROUP BY "country"
ORDER BY total_transactions DESC
LIMIT 10;
```
<img src="images/3.6.JPG?raw=true"/>


#### 3.7 Find the maximum amount owed to the IDA
```sql
SELECT country, MAX("Due to IDA") AS max_owed
FROM banking_data
GROUP BY country
ORDER BY max_owed DESC
LIMIT 10;
```
<img src="images/3.7.JPG?raw=true"/>


#### 3.8 Owed to the IDA (Cummulative SUM)
```sql
SELECT SUM("Due to IDA")
FROM banking_data;
```
**Image Placeholder:** ![Your Image Description](images/owed_sum.JPG)
