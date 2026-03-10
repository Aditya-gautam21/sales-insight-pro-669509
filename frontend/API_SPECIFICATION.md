# API Specification - B2B Outreach Assistant

## Sales Research

### Generate Insights
- **URL:** `/api/sales/research`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "companyName": "string (optional for bulk finder)",
    "industry": "string",
    "targetRole": "string",
    "productService": "string",
    "tone": "Professional | Casual"
  }
  ```
- **Response:**
  ```json
  {
    "insights": {
      "enrichedProfile": {
        "summary": "string",
        "recentNews": "string",
        "contacts": [
          { "role": "string", "name": "string", "email": "string" }
        ],
        "revenue": "string",
        "funding": "string",
        "techPains": "string"
      },
      "painPoints": ["string"],
      "leadScore": {
        "score": 0.0,
        "breakdown": {
          "industryFit": 0,
          "painAlignment": 0,
          "growthPotential": 0
        },
        "adjustment": 0.0,
        "why": "string"
      },
      "valueProp": "string",
      "coldEmail": {
        "variantA": "string",
        "variantB": "string"
      },
      "linkedinMsg": "string",
      "followUp": {
        "day3": "string",
        "day7": "string"
      }
    }
  }
  ```
  *Note: If `companyName` is empty, `insights` will be an array of the above structure with an added `companyName` field.*

### History

#### Get History
- **URL:** `/api/sales/history`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "history": [
      {
        "id": "string",
        "input": { "companyName": "string", "industry": "string", "targetRole": "string", "productService": "string", "tone": "string" },
        "insights": { ... },
        "createdAt": "ISOString"
      }
    ]
  }
  ```

#### Delete History Item
- **URL:** `/api/sales/history/:id`
- **Method:** `DELETE`

#### Clear All History
- **URL:** `/api/sales/history`
- **Method:** `DELETE`

### Templates

#### Get Templates
- **URL:** `/api/sales/templates`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "templates": [
      {
        "id": "string",
        "name": "string",
        "industry": "string",
        "targetRole": "string",
        "product": "string",
        "tone": "string"
      }
    ]
  }
  ```

#### Create Template
- **URL:** `/api/sales/templates`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "string",
    "input": { "industry": "string", "targetRole": "string", "productService": "string", "tone": "string" }
  }
  ```

#### Delete Template
- **URL:** `/api/sales/templates/:id`
- **Method:** `DELETE`

#### Suggest Template
- **URL:** `/api/sales/templates/suggest`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "name": "string",
    "industry": "string",
    "targetRole": "string",
    "product": "string",
    "tone": "string"
  }
  ```
