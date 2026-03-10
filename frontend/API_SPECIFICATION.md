# Sales Outreach Assistant API Specification

## Base URL
`/api/sales`

## Endpoints

### 1. Research & Insights
- **POST `/research`**
  - **Description**: Generate sales research and insights for a single company or bulk leads if company name is missing.
  - **Request Body**:
    ```json
    {
      "companyName": "string (optional)",
      "industry": "string",
      "targetRole": "string",
      "productService": "string",
      "tone": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "insights": {
        "enrichedProfile": {
          "summary": "string",
          "keyContacts": [{"role": "string", "name": "string", "emailEst": "string"}],
          "extras": {"revenueEst": "string", "fundingSize": "string", "techPainSignals": "string"}
        },
        "painPoints": ["string"],
        "leadScore": {
          "score": 8.5,
          "explanation": "string",
          "breakdown": {"industryFit": 2.5, "painAlignment": 2.5, "growthPotential": 3.5}
        },
        "valuePropositionAngle": "string",
        "coldEmail": "string",
        "coldEmailVariant": "string",
        "linkedInMessage": "string",
        "followUpSequence": ["string"]
      }
    }
    ```
    *OR (if bulk leads)*
    ```json
    {
      "insights": [
        {
          "companyName": "string",
          "enrichedProfile": { ... },
          "painPoints": [...],
          "leadScore": { ... },
          "valuePropositionAngle": "...",
          "coldEmail": "...",
          "coldEmailVariant": "...",
          "linkedInMessage": "...",
          "followUpSequence": ["..."]
        }
      ]
    }
    ```

### 2. History Management
- **GET `/history`**
  - **Description**: Fetch the last 20 research sessions.
- **DELETE `/history/:id`**
  - **Description**: Soft delete a specific history entry.
- **DELETE `/history`**
  - **Description**: Soft delete all history entries.

### 3. Template Management
- **GET `/templates`**
  - **Description**: Fetch all sales outreach templates.
- **POST `/templates`**
  - **Description**: Create a new outreach template.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "input": {
        "industry": "string",
        "targetRole": "string",
        "productService": "string",
        "tone": "string"
      }
    }
    ```
- **PATCH `/templates/:id`**
  - **Description**: Update an existing template.
- **DELETE `/templates/:id`**
  - **Description**: Soft delete a template.
- **GET `/templates/suggest`**
  - **Description**: Generate an AI-suggested template based on research history.