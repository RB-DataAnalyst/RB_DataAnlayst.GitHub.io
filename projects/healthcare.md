# Exploratory Data Analysis of Hospital Care for Diabetic Patients
---

**[Back to Projects](../index.md)**  


## Introduction
My fascination with healthcare data's complexities and its potential to yield insightful observations for patient care and hospital management inspired this project. The healthcare sector, with its intricate data structures and significant impacts, provides a unique analytical challenge. This project primarily aims to enhance my SQL skills by using advanced techniques like joins, CASE statements, GROUP BY and HAVING clauses, and subqueries and CTEs to extract and analyze data from a comprehensive healthcare dataset. While I aim to uncover patterns that demonstrate the power of data analysis in healthcare, it is important to note that this project is purely educational and not intended to influence actual healthcare decisions.

## Key Findings
1. **Length of Hospital Stay Trends:** Most diabetic patients were found to have short hospital stays, typically ranging from 1 to 4 days.
2. **Variation in Treatment by Medical Specialty** Data analysis revealed that medical specialties such as thoracic surgery and cardiovascular surgery generally involve a higher number of procedures per patient.
3. **Correlation Between Lab Procedures and Hospital Stay:** A distinct correlation was identified indicating that patients undergoing more laboratory procedures typically experience longer hospital stays.
4. **Efficiency in Emergency Admissions:** Analysis suggested instances of efficient treatment among patients admitted through emergency services who stayed shorter than the average.

## Source
The dataset used in this project spans ten years (1999-2008) of clinical care from 130 U.S. hospitals and integrated delivery networks, focusing on hospital admissions for patients diagnosed with diabetes. It comprises over 100,000 instances and 50 features, covering an extensive array of data points including patient demographics, the medical specialty of the admitting physician, type of admission, length of hospital stay, laboratory tests performed, medications administered, and patient outcomes like readmission rates. This comprehensive dataset is available on Kaggle, a prominent platform hosting datasets and competitions for data science and machine learning. It is [publicly accessible](https://www.kaggle.com/code/iabhishekofficial/prediction-on-hospital-readmission/data?select=diabetic_data.csv) for analysis and educational uses, making it an excellent resource for exploring healthcare analytics.

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
<img src="../images/SQL_Bank/SFP1.JPG?raw=true"/>
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
<img src="../images/SQL_Bank/SFP2.JPG?raw=true"/>  
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
<img src="../images/SQL_Bank/SFP3.JPG?raw=true"/>  
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
<img src="../images/SQL_Bank/SFP4.JPG?raw=true"/>  
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
<img src="../images/SQL_Bank/SFP5.JPG?raw=true"/>  
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
<img src="../images/SQL_Bank/SFP6.JPG?raw=true"/>  
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

**[Back to Projects](../index.md)** 
