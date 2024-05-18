# SkyLink Communications Customer Cluster Analysis

## Overview

In this project, we used cluster analysis to segment the diverse customer base of SkyLink Communications into distinct groups. This segmentation helps us understand customer behaviors and preferences better, enabling us to tailor our marketing strategies more effectively. The analysis focused on key customer attributes such as tenure, service usage, and charges.

## Key Steps and Insights

### Data Preparation and Exploration

I began by preparing and exploring the data, focusing on key continuous variables that influence customer behavior:

- **Customer Tenure**: Understanding how long customers stay with us helps identify loyalty patterns.
- **Service Usage**: Analyzing local, international calls, and data usage provides insights into customer needs and preferences.
- **Charges**: Examining charges for services helps in identifying customers' willingness to pay and their service tiers.

### Data Normalization

To ensure a fair comparison, we normalized the data, making sure each variable equally contributed to the clustering process.

### Determining the Optimal Number of Clusters

Using the Elbow Method, we determined that four clusters were optimal for our data. This method helped us identify the point where adding more clusters didn’t significantly improve the model.

### K-Means Clustering

I performed k-means clustering and identified four distinct customer segments:

1. **Global Communicators**
2. **Data Enthusiasts**
3. **Emerging Users**
4. **Local Loyalists**

### Cluster Analysis and Marketing Strategies

#### 1. Global Communicators

**Characteristics**:
- Long-term customers
- High international call usage
- High international charges

**Marketing Strategies**:
- Loyalty programs
- Premium international calling plans

#### 2. Data Enthusiasts

**Characteristics**:
- High data usage
- Moderate international call usage

**Marketing Strategies**:
- Unlimited or high-data plans
- Bundled data and international calling features
- Promotions focusing on data services

#### 3. Emerging Users

**Characteristics**:
- Newer customers
- Minimal service usage

**Marketing Strategies**:
- Engagement strategies to increase service utilization
- Introductory offers
- Educational marketing on services

#### 4. Local Loyalists

**Characteristics**:
- Long-term customers
- High local call usage
- Low international call usage

**Marketing Strategies**:
- Bundled services emphasizing local features
- Incentives for increased local usage
- Tailored local communication packages or discounts

## Visualizations

### Distribution of Account Length by Cluster

I visualized the distribution of customer tenure across clusters. The red dashed line indicates the overall mean account length of approximately 32 months.

![Distribution of Account Length in Months by Cluster](../images/cluster/unnamed-chunk-18-1.png)

### Local vs. International Minutes by Cluster

The scatter plot below shows the relationship between local and international minutes for each cluster.

- **Global Communicators**: Strong inclination towards international communication.
- **Local Loyalists**: Predominantly engage in local communication.

![Local Minutes vs International Minutes by Cluster](../images/cluster/unnamed-chunk-19-1.png)
