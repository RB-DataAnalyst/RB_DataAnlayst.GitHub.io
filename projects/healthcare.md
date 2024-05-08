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
### 1. Data Preperation & Exploration
The initial step in preparing the dataset for analysis involved loading the data into a MySQL database, which was structured into two main tables: ```demographics``` and ```health```. This organization facilitated a more efficient querying process by separating patient demographic information from their health-related data.

- Next, the data types in the tables were verified. Here is an example of this query for the ```health``` table:
```sql
SELECT 
    column_name, DATA_TYPE
FROM
    INFORMATION_SCHEMA.COLUMNS
WHERE
    table_schema = 'patient'
    AND table_name = 'health';
```

- Data Type Adjustments: Certain columns, like num_medications in the health table, were originally imported with varchar data types. These were converted to integer types to enable numerical operations essential for analysis.
- Handling Missing Values: The dataset contained several missing values, especially in the race and weight categories. For simplicity and to maintain data integrity, entries with missing race data were retained and categorized under a new label '?', allowing for an inclusive analysis of demographic impacts without data loss.



### 2. Descriptive Queries
Below are the SQL queries used to examine time distributions, medical specialities, and potential disparities in treatment along with its respective output:

#### 2.1 Distribution of Hospital Stays
Analyzed the distribution of the length of hospital stays, identifying a predominance of short-term stays (1-4 days), which highlights the operational dynamics and potential areas for improving patient care efficiency.
```sql
SELECT 
    ROUND(time_in_hospital, 1) AS length_of_stay,
    COUNT(*) AS count,
    RPAD('', COUNT(*) / 100, '*') AS bar
FROM
    health
GROUP BY length_of_stay
ORDER BY length_of_stay;
```
<img src="../images/SQL_Bank/SFP1.JPG?raw=true"/>

---
### 3. Comparative Analysis
#### 3.1 Medical Specialties and Procedures
Analyzed which medical specialties conducted more procedures on average, pointing to specific fields like thoracic and cardiovascular surgery as high-resource areas.
```sql
SELECT 
    medical_specialty,
    ROUND(AVG(num_procedures), 1) AS avg_procedures,
    COUNT(*) AS count
FROM
    health
GROUP BY medical_specialty
HAVING count > 50 AND avg_procedures > 2.5
ORDER BY avg_procedures DESC;
```
<img src="../images/SQL_Bank/SFP2.JPG?raw=true"/>  

---
#### 3.2 Potential Racial Disparities in Treatment
Explore differences in the number of laboratory procedures performed across different races, revealing that there are only nominal differnces between racical demographics. 
```sql
SELECT 
    race,
    ROUND(AVG(num_lab_procedures), 1) AS avg_num_lab_procedures
FROM
    health AS h
    JOIN
    demographics AS d ON h.patient_nbr = d.patient_nbr
GROUP BY race
ORDER BY avg_num_lab_procedures DESC;
```
<img src="../images/SQL_Bank/SFP4.JPG?raw=true"/>  

--- 
### 4 Correlational Analysis
#### 4.1 Lab Procedures and Hospital Stay Length
Investigated the relationship between the number of lab procedures and the length of hospital stays, finding a direct correlation where more procedures often meant longer stays.
```sql
SELECT 
    ROUND(AVG(time_in_hospital), 1) AS avg_time,
    CASE
        WHEN num_lab_procedures >= 0 AND num_lab_procedures < 25 THEN 'few'
        WHEN num_lab_procedures >= 25 AND num_lab_procedures < 55 THEN 'average'
        ELSE 'many'
    END AS procedure_frequency
FROM
    health
GROUP BY procedure_frequency
ORDER BY avg_time DESC;
```
<img src="../images/SQL_Bank/SFP3.JPG?raw=true"/>  

---

### 5 Targeted Analysis
#### 5.1 Efficiency of Emergency Admissions
Explored cases where patients admitted through emergency stayed less than the average duration, which could suggest both efficient treatment and areas for review to prevent rapid readmissions.
```sql
WITH avg_time AS (
    SELECT AVG(time_in_hospital) AS avg_hospital_time
    FROM health
)
SELECT *
FROM health
WHERE admission_type_id = 1
AND time_in_hospital < (SELECT avg_hospital_time FROM avg_time);
```
<img src="../images/SQL_Bank/SFP5.JPG?raw=true"/>  

---

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
