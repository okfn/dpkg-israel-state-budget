{ 
  "dataset": {
    "name": "israel-state-budget",
    "label": "Israel State Budget", 
    "description": "<p>Obtained by <a href=\"http://www.meida.org.il\">Movement for Freedom of Information in Israel</a>.",
    "currency": "ILS",
    "unique_keys": ["unique_id"]
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
      "description": "",
      "column": "amount",
      "label": "",
      "datatype": "float",
      "type": "value"
    }, 
    "unique_id": {
      "description": "",
      "column": "unique_id",
      "label": "Unique ID",
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
    "section": {
      "fields": [
        {"column": "section_id", "datatype": "id", "name": "name"},
        {"column": "section_name", "datatype": "string", "name": "label"}
      ],
      "label": "Section",
      "type": "classifier",
      "description": "Israeli spending code, level 1 (Section).",
      "taxonomy": "israel-state-budget:level:1"
    },
    "entity": {
      "fields": [
        {"column": "entity_id", "datatype": "id", "name": "name"},
        {"column": "entity_name", "datatype": "string", "name": "label"}
      ],
      "label": "Entity",
      "type": "classifier",
      "description": "Israeli spending code, level 2 (Entity).",
      "taxonomy": "israel-state-budget:level:2"
    },                                         
    "programme": {
      "fields": [
        {"column": "programme_id", "datatype": "id", "name": "name"},
        {"column": "programme_name", "datatype": "string", "name": "label"}
      ],
      "label": "Programme",
      "type": "classifier",
      "description": "Israeli spending code, level 3 (Programme).",
      "taxonomy": "israel-state-budget:level:3"
    },
    "concept": {
      "fields": [
        {"column": "concept_id", "datatype": "id", "name": "name"},
        {"column": "concept_name", "datatype": "string", "name": "label"}
      ],
      "label": "Concept",
      "type": "classifier",
      "description": "Israeli spending code, level 4 (Concept).",
      "taxonomy": "israel-state-budget:level:4"
    }  
  },
  "views": [
    {
      "entity": "dataset",
      "label": "Spending by Section",
      "name": "default",
      "dimension": "dataset",
      "breakdown": "section",
      "filters": {"name": "israel-state-budget"}           
    },
    {
      "entity": "classifier",
      "label": "Spending by Entity",
      "name": "default",
      "dimension": "section",
      "breakdown": "entity",
      "filters": {"taxonomy": "israel-state-budget:level:1"}        
    },
    {
      "entity": "classifier",
      "label": "Spending by Programme",
      "name": "default",
      "dimension": "entity",
      "breakdown": "programme",
      "filters": {"taxonomy": "israel-state-budget:level:2"}           
    },
    {
      "entity": "classifier",
      "label": "Spending by Concept",
      "name": "default",
      "dimension": "programme",
      "breakdown": "concept",
      "filters": {"taxonomy": "israel-state-budget:level:3"}           
    }
  ]                       
}
