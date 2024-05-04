# SQL at the Helm: Charting Financial Waters with World Bank Data
---

[Home](index.md)  
[Key Findings](bank.md/#Analysis)

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
### 1. Data Inspection
- The dataset was acquired and loaded into a table using CSVFiddle.
- On initial inspection, it seemed there might be dupicate records. However, further investigation revealed that these were not duplicates but updates in the form of different snapshots over time.
- To ensure the analysis reflected the most current financial situation, I used a specifc SQL sub-query to filter the data:
```sql
WHERE 
  "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  )
```

### 2. SQL Queries
Below are the SQL queries used in the project, each query is accompanied by its respective output image:

#### 2.1 Top Borrowers and Their Amounts Due
Identify specific borrowers (typically government bodies or ministries of finance) with the highest amounts due, providing a clearer picture of responsibility and financial management at a more granular level within the countries.
```sql
SELECT 
  Borrower, 
  Country, 
  "Due to IDA" AS due 
FROM 
  banking_data 
WHERE 
  due IS NOT NULL 
  AND "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  ) 
ORDER BY 
  due DESC 
LIMIT 
  10;
```
<img src="images/SFP1.JPG?raw=true"/>
Governmental bodies like The National Treasury and Planning of Kenya and the Ministry of Finance in Ethiopia and India are key players, reflecting their central roles in managing these countries' external
debts.

---

#### 2.2 Total Amount Due by Region
Understand which regions have the largest total financial commitments due, indicating where the IDA’s financial resources are most heavily allocated.
```sql
SELECT 
  region, 
  ROUND(
    SUM("Due to IDA"), 
    2
  ) AS total_due 
FROM 
  banking_data 
WHERE 
  "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  ) 
GROUP BY 
  region 
ORDER BY 
  total_due DESC;
```
<img src="images/SFP2.JPG?raw=true"/>  
South Asia and Eastern and Southern Africa top this list, highlighting significant financial needs and engagements in these regions.

---

#### 2.3 Average Service Charge Rates by Region
Explore and compare the average service charge rates across different World Bank regions, which can indicate the cost of borrowing and the financial terms set by the IDA across different geographies.
```sql
SELECT 
  region, 
  AVG("Service Charge Rate") AS avg_rate 
FROM 
  banking_data 
WHERE 
  "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  ) 
GROUP BY 
  region 
ORDER BY 
  avg_rate DESC;

```
<img src="images/SFP3.JPG?raw=true"/>  
Regions like Europe and Central Asia exhibit higher rates, potentially pointing to varying economic conditions or risk assessments by the IDA.

---

#### 2.4 Total Transactions Overall:
Quantify the total number of transactions recorded in the latest dataset snapshot, offering a macroscopic view of the activity level across all countries with the IDA.
```sql
SELECT 
  COUNT(*) AS total_transactions 
FROM 
  banking_data 
WHERE 
  "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  );

```
<img src="images/SFP4.JPG?raw=true"/>  
With 9,991 transactions, the data reflect a high level of global engagement with the IDA, indicating extensive developmental efforts.

---

#### 2.5 Total Transactions by Country:
Determine which countries have the highest number of transactions with the IDA, providing insight into which countries are most actively engaging with the World Bank in terms of the number of projects or financial interactions.
```sql
SELECT 
  country, 
  COUNT(*) AS total_transactions 
FROM 
  banking_data 
WHERE 
  "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  ) 
GROUP BY 
  country 
ORDER BY 
  total_transactions DESC 
LIMIT 
  10;

```
<img src="images/SFP5.JPG?raw=true"/>  
India, Bangladesh, and Pakistan are the most active, which might reflect their dynamic involvement in development projects financed by the IDA.

---

#### 2.6 Maximum Amount Owed by Countries:
Identify which countries have the highest financial obligations to the IDA. This helps understand where the most significant financial interventions might be needed and which countries are under the heaviest debt burden.
```sql
SELECT 
  country, 
  MAX("Due to IDA") AS max_owed 
FROM 
  banking_data 
WHERE 
  "End of Period" = (
    SELECT 
      MAX("End of Period") 
    FROM 
      banking_data
  ) 
GROUP BY 
  country 
ORDER BY 
  max_owed DESC 
LIMIT 
  10;
```
<img src="images/SFP6.JPG?raw=true"/>  
Countries like Kenya and Nigeria top this list, highlighting their substantial financial commitments.

## Conclusion
This analysis of the World Bank's IDA data for 2022 provided crucial insights into the financial dynamics of countries and regions interacting with international development funds:
1. **Substantial Debts in Key Nations:**
Kenya and Nigeria emerged as countries with the most significant financial obligations to the IDA,
indicating potential areas for focused economic support or debt relief interventions.
2. **High Engagement in Developmental Activities:**
Countries like India, Bangladesh, and Pakistan showed high numbers of transactions, illustrating
their active participation in development projects. This suggests a robust engagement with the IDA in striving for economic development and poverty alleviation.
3. **Regional Financial Commitments:**
South Asia and Eastern and Southern Africa were identified as regions with the highest total amounts due, highlighting where the IDA’s efforts are most concentrated and perhaps where the needs are greatest.
4. **Varied Borrowing Costs:**
The analysis also revealed differences in service charge rates across regions, with Europe and Central Asia facing the highest rates, which could affect the terms of financial aid and loan agreements in these regions.

SQL's capability to efficiently filter and analyze data over millions of records enabled me to uncover meaningful financial insights across various countries. The process highlighted the importance of data preparation and the power of SQL in extracting actionable insights from the World Bank's extensive datasets.

[Home](index.md)
