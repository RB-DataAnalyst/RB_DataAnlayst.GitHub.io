# SQL Financial Project
---
## Introduction
With a foundation in accounting and an interest in financial datasets, I was drawn to the World Bank's data due to its breadth and complexity. This project capitalizes on my SQL skills to dissect and understand global
financial transactions from the World Bank's dataset. 

The objective of this analysis is to navigate through this extensive dataset to unearth insightful financial patterns, assess the latest status of loans, and calculate obligations by various global borrowers using SQL queries.

## Key Findings
1. **Predominant Financial Obligations in Kenya and Nigeria:** Kenya and Nigeria are highlighted as the top countries with the highest financial obligations to the IDA, with Kenya leading at $7.5 billion. This indicates substantial financial engagement and potentially significant repayment pressures on these economies.
2. **Active Transaction Hubs in South Asia:** India, with the highest number of transactions (440), emerges as a central hub of activity within the World Bank's financial network. This reflects a high level of engagement in developmental projects, suggesting a robust pipeline of initiatives aimed at economic improvement.
3. **Regional Financial Burdens and Service Charges:** Europe and Central Asia region exhibit the highest average service charge rate (1.28%), indicating a more costly borrowing environment. Simultaneously, South Asia shows the highest total amount due ($591 billion), underlining extensive financial commitments and the substantial development finance needed in the region.

## Source
The dataset used in this analysis comes from the World Bank's "IDA Statement of Credits and Grants Historical Data," which is part of a comprehensive set of data services provided by the World Bank. It contains
detailed financial information related to credits and grants administered by the International Development Association (IDA), which is a part of the World Bank focused on assisting the poorest countries. This dataset includes various metrics such as country, borrower, loan amounts, service charge rates, and status of the loans. It is a reflection of the latest financial transactions and statuses as of 2022, updated to capture the ongoing financial engagements and responsibilities of the borrowing nations.

The dataset is publicly available and can be accessed via the World Bank’s finances website at [World Bank IDA Credits and Grants](https://finances.worldbank.org/Loans-and-Credits/IDA-Statement-Of-Credits-and-Grants-Historical-Dat/tdwh-3krx).

## Analysis


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
