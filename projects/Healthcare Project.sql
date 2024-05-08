-- Data Preperation
-- Verify the data types of columns in the 'demographics' table.
SELECT 
    column_name, DATA_TYPE
FROM
    INFORMATION_SCHEMA.COLUMNS
WHERE
    table_schema = 'patient'
    AND table_name = 'demographics';

-- Verify the data types of columns in the 'health' table.
SELECT 
    column_name, DATA_TYPE
FROM
    INFORMATION_SCHEMA.COLUMNS
WHERE
    table_schema = 'patient'
    AND table_name = 'health';
    
-- Modify data types in the 'health' table
ALTER TABLE health
MODIFY COLUMN num_medications INT,
MODIFY COLUMN time_in_hospital INT,
MODIFY COLUMN num_procedures INT,
MODIFY COLUMN num_lab_procedures INT,
MODIFY COLUMN number_outpatient INT,
MODIFY COLUMN number_emergency INT,
MODIFY COLUMN number_inpatient INT;

-- Data Analysis Queries: time distributions, medical specialities, and disparities in treatment
-- Calculate the distribution of time patients spend in the hospital and visualize it as a bar chart.
SELECT 
    ROUND(time_in_hospital, 1) AS length_of_stay,
    COUNT(*) AS count,
    RPAD('', COUNT(*) / 100, '*') AS bar
FROM
    health
GROUP BY length_of_stay
ORDER BY length_of_stay;


-- Identify medical specialties that perform a higher average number of procedures (more than 2.5) with total procedures over 50.
SELECT 
    medical_specialty,
    ROUND(AVG(num_procedures), 1) AS avg_procedures,
    COUNT(*) AS count
FROM
    health
GROUP BY medical_specialty
HAVING count > 50 AND avg_procedures > 2.5
ORDER BY avg_procedures DESC;


-- Examine if there are racial disparities in the number of lab procedures performed on patients.
SELECT 
    race,
    ROUND(AVG(num_lab_procedures), 1) AS avg_num_lab_procedures
FROM
    health AS h
    JOIN
    demographics AS d ON h.patient_nbr = d.patient_nbr
GROUP BY race
ORDER BY avg_num_lab_procedures DESC;


-- Analyze how the number of lab procedures correlates with the length of hospital stay.
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

-- Targeted data queries for subsets of patients
 -- Select patients who are either African American or have an increased dosage of metformin for potential medical testing.
SELECT 
    patient_nbr
FROM
    demographics
WHERE
    race = 'AfricanAmerican'
UNION 
SELECT 
    patient_nbr
FROM
    health
WHERE
    metformin = 'Up';

-- Identify cases where patients were admitted through emergency but stayed shorter than the average duration.
WITH avg_time AS (
    SELECT AVG(time_in_hospital) AS avg_hospital_time
    FROM health
)
SELECT *
FROM health
WHERE admission_type_id = 1
AND time_in_hospital < (SELECT avg_hospital_time FROM avg_time);

-- Calculate aggregates where patients were admitted through emergency but stayed shorter than the average duration.
-- Calculate the average hospital stay duration
WITH avg_time AS (
    SELECT AVG(time_in_hospital) AS avg_hospital_time
    FROM health
)
-- Count patients staying less and more than the average duration and calculate percentages
SELECT 
    ROUND(100.0 * SUM(CASE
                WHEN time_in_hospital < avg_hospital_time THEN 1
                ELSE 0
            END) / COUNT(*),
            2) AS pct_below_average_stays,
    ROUND(100.0 * SUM(CASE
                WHEN time_in_hospital >= avg_hospital_time THEN 1
                ELSE 0
            END) / COUNT(*),
            2) AS pct_above_or_equal_average_stays
FROM
    health,
    avg_time;

-- Data summary query
-- Generate a summary for the top 50 patients based on the number of medications and lab procedures.
SELECT 
    CONCAT_WS(' ',
            'Patient',
            health.patient_nbr,
            'was',
            demographics.race,
            'and',
            (CASE
                WHEN readmitted = 'NO' THEN 'was not readmitted. They had '
                ELSE 'was readmitted. They had'
            END),
            num_medications,
            'medications and',
            num_lab_procedures,
            'lab procedures.') AS summary
FROM
    health
    INNER JOIN
    demographics ON demographics.patient_nbr = health.patient_nbr
ORDER BY num_medications DESC, num_lab_procedures DESC
LIMIT 50;