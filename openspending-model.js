{ 
  "dataset": {
    "model_rev": 1,
    "name": "israel-state-budget",
    "label": "Israel State Budget", 
    "description": "<p>Obtained by <a href=\"http://www.meida.org.il\">Movement for Freedom of Information in Israel</a>.",
    "currency": "ILS"
  },  
  "mapping": {
    "from": {
      "fields": [
        {"constant": "Israeli Government", "name": "label", "datatype": "constant"}
      ],
      "type": "entity",
      "description": "The entity that the money was paid from",
      "label": "Paid from"
    },
    "to": {
      "fields": [
        {"constant": "Israeli Society", "name": "label", "datatype": "constant"}
      ],
      "type": "entity",
      "description": "The entity that the money was paid to",
      "label": "Paid to"
    },
    "amount": {
      "default_value": "",
      "description": "",
      "column": "amount",
      "label": "",
      "datatype": "float",
      "type": "value"
    },
    "grant_title": {
      "default_value": "",
      "description": "",
      "column": "grant_title",
      "label": "Grant title",
      "datatype": "string",
      "type": "value"   
    },
    "time": {
      "default_value": "",
      "description": "",
      "column": "year",
      "label": "Budget year",
      "datatype": "date",
      "type": "value"
    },
    "primary": {
      "fields": [
        {
          "column": "primary",
          "datatype": "string",
          "default_value": "",
          "constant": "",
          "name": "label"
        }
      ],
      "label": "Primary classification",
      "type": "classifier",
      "description": "An artificial grouping to allow for an easier overview of spending.",
      "taxonomy": "israel-state-budget.classification",
      "level": 0
    },
    "section": {
      "fields": [
        {
          "column": "section",
          "datatype": "string",
          "default_value": "",
          "constant": "",
          "name": "label"
        }
      ],
      "label": "Section",
      "type": "classifier",
      "description": "Israeli spending code, level 1 (Section).",
      "taxonomy": "israel-state-budget.classification",
      "level": 1
    },
    "entity": {
      "fields": [
        {
          "column": "entity",
          "datatype": "string",
          "default_value": "",
          "constant": "",
          "name": "label"
        }
      ],
      "label": "Entity",
      "type": "classifier",
      "description": "Israeli spending code, level 2 (Entity).",
      "taxonomy": "israel-state-budget.classification",
      "level": 2
    },
    "programme": {
      "fields": [
        {
          "column": "programme",
          "datatype": "string",
          "default_value": "",
          "constant": "",
          "name": "label"
        }
      ],
      "label": "Programme",
      "type": "classifier",
      "description": "Israeli spending code, level 3 (Programme).",
      "taxonomy": "israel-state-budget.classification",
      "level": 3
    },
    "concept": {
      "fields": [
        {
          "column": "concept",
          "datatype": "string",
          "default_value": "",
          "constant": "",
          "name": "label"
        }
      ],
      "label": "Concept",
      "type": "classifier",
      "description": "Israeli spending code, level 4 (Concept).",
      "taxonomy": "israel-state-budget.classification",
      "level": 4
    }  
  },
  "views": [
    {
      "entity": "dataset",
      "label": "Spending by Overview Category",
      "name": "default",
      "dimension": "dataset",
      "breakdown": "primary",
      "filters": {"name": "israel-state-budget"}           
    },
    {
      "entity": "dataset",
      "label": "Spending by Section",
      "name": "section",
      "dimension": "dataset",
      "breakdown": "section",
      "filters": {"name": "israel-state-budget"}           
    },
    {
      "entity": "classifier",
      "label": "Spending by Section",
      "name": "default",
      "dimension": "primary",
      "breakdown": "section",
      "filters": {"taxonomy": "israel-state-budget.classification", "level": 0}           
    },
    {
      "entity": "classifier",
      "label": "Spending by Entity",
      "name": "default",
      "dimension": "section",
      "breakdown": "entity",
      "filters": {"taxonomy": "israel-state-budget.classification", "level": 1}        
    },
    {
      "entity": "classifier",
      "label": "Spending by Programme",
      "name": "default",
      "dimension": "entity",
      "breakdown": "programme",
      "filters": {"taxonomy": "israel-state-budget.classification", "level": 2}           
    },
    {
      "entity": "classifier",
      "label": "Spending by Concept",
      "name": "default",
      "dimension": "programme",
      "breakdown": "concept",
      "filters": {"taxonomy": "israel-state-budget.classification", "level": 3}           
    }
  ]                       
}