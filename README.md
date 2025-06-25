# React Query Builder

A minimal, extensible query builder UI built with React and Material-UI.

## Features

- Add/remove conditions and groups (AND/OR logic)
- Nested groups supported
- Dynamic dropdowns for fields and values
- JSON output for the constructed query

## Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/Jeetbshah/react-query-builder.git
   cd react-query-builder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the app:
   ```
   npm start
   ```

4. Run tests:
   ```
   npm test
   ```

## Example Output

```json
{
  "logic": "AND",
  "conditions": [
    {
      "field": "Status",
      "operator": "equals",
      "value": "Open"
    },
    {
      "logic": "OR",
      "conditions": [
        {
          "field": "Priority",
          "operator": "equals",
          "value": "High"
        },
        {
          "field": "Category",
          "operator": "equals",
          "value": "Bug"
        }
      ]
    }
  ]
}
```

## License

MIT