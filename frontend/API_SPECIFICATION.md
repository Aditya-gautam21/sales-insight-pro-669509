# API Specification

## Sales Research

### POST /api/sales/research
Generates sales insights for a single company or finds bulk leads if company name is missing.

**Request Body:**
- `companyName`: string (optional, if empty triggers bulk lead finding)
- `industry`: string (required)
- `targetRole`: string (required)
- `productService`: string (required)
- `tone`: string (required)

**Response:**
- `insights`: `SalesInsights` | `SalesInsights[]`

## History

### GET /api/sales/history
Retrieves all research history entries.

**Response:**
- `history`: `ResearchSession[]`

### DELETE /api/sales/history/:id
Deletes a research history entry.

### DELETE /api/sales/history
Clears all research history.

## Templates

### GET /api/sales/templates
Retrieves all sales templates.

**Response:**
- `templates`: `Template[]`

### POST /api/sales/templates
Creates a new sales template.

**Request Body:**
- `name`: string
- `input`: `ResearchInput`

### DELETE /api/sales/templates/:id
Deletes a sales template.

### GET /api/sales/templates/suggest
Suggests a template based on recent research history.

**Response:**
- `template`: `Template`
