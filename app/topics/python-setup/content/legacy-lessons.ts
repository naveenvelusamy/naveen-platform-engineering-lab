import type { Lesson } from "./chapter-one";

// Existing optional material retained with its original completion IDs.
export const legacyLessons: Lesson[] = [
  {
    "id": "python-and-pip",
    "kind": "lesson",
    "title": "Python, modules, and project environments",
    "explanation": "An interpreter executes Python code. A module groups reusable code; import makes it available. The standard library ships with Python, while third-party packages are installed separately. On a local machine, a virtual environment isolates a project’s installed packages. It is dependency isolation, not a security sandbox. This page already supplies a browser Python runtime and needs no local setup.",
    "example": "import sys\nprint(sys.version)\nprint(\"Standard library available\")",
    "walkthrough": "import sys makes the standard-library sys module available. The dot in sys.version accesses its version string. Local terminal workflow (macOS/Linux): python3 -m venv .venv, then source .venv/bin/activate, then python -m pip install requests. On Windows PowerShell, use py -m venv .venv and .venv\\Scripts\\Activate.ps1. These are shell commands, not Python: do not paste them into this editor. Record dependencies in requirements.txt or a project file, install them into a fresh environment to verify setup, and exclude .venv from Git. Version pins improve repeatability but do not by themselves guarantee identical builds.",
    "useCase": "Two automation projects may need different HTTP client versions. Separate environments prevent their installed dependencies from interfering. The browser exercises use only the standard library; pip, cloud SDKs, and host shell access are outside this runner.",
    "outcomes": [
      "Import a standard-library module.",
      "Distinguish interpreter, module, and third-party package.",
      "Describe local dependency isolation without running shell commands in Python."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Import sys and print sys.version.",
        "starter": "# Import the module, then inspect its version.\n",
        "hints": [
          "Use the import keyword.",
          "Access the version attribute with a dot."
        ],
        "expected": "A Python version string; the exact version depends on the runtime."
      },
      {
        "title": "Infrastructure practice",
        "prompt": "Print a project setup checklist with three lines: create venv, record dependencies, verify fresh install. This is a checklist, not command execution.",
        "starter": "# Print the three checklist items.\n",
        "hints": [
          "Use the print syntax from lesson 1.",
          "Put each checklist item in quotes."
        ],
        "expected": "create venv\nrecord dependencies\nverify fresh install"
      }
    ],
    "quiz": {
      "question": "Where should a regular project install third-party dependencies?",
      "options": [
        {
          "text": "Into system Python for all projects",
          "explanation": "This can cause conflicts with system tools and other projects."
        },
        {
          "text": "Into its virtual environment, with dependencies recorded",
          "explanation": "Correct: isolation avoids cross-project conflicts and recording dependencies supports repeatable setup."
        },
        {
          "text": "Inside this browser editor using shell commands",
          "explanation": "This editor executes Python, not shell commands."
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "devops-json",
    "kind": "lesson",
    "title": "JSON configuration",
    "explanation": "JSON is a text format used for API payloads and configuration. Python dictionaries are in-memory objects, not JSON text. The standard-library json module converts between them. Parse text before inspecting its fields; serialize an object when another tool needs JSON.",
    "example": "import json\ntext = '{\"service\": \"api\", \"replicas\": 3, \"enabled\": true}'\nconfig = json.loads(text)\nprint(config[\"service\"], config[\"enabled\"])\nconfig[\"replicas\"] = 4\nprint(json.dumps(config, sort_keys=True))",
    "walkthrough": "loads means load from a string; dumps serializes to a string. JSON requires double-quoted keys and strings. JSON true, false, and null become Python True, False, and None. The outer single quotes delimit the Python string in this example. Malformed text raises json.JSONDecodeError, which you can catch specifically. Valid JSON can also contain a list or scalar, so parsing alone does not validate your expected configuration schema.",
    "useCase": "Read a saved deployment payload and produce updated JSON for review. Editing a payload in this editor does not send an API request or deploy anything.",
    "outcomes": [
      "Parse and serialize JSON with the standard library.",
      "Distinguish JSON booleans from Python booleans.",
      "Separate parsing from field validation."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Parse the JSON and print the name field.",
        "starter": "import json\ntext = '{\"name\": \"Sam\", \"learning\": true}'\n# Parse text and print name.\n",
        "hints": [
          "Use json.loads(text).",
          "The parsed dictionary can be indexed with \"name\"."
        ],
        "expected": "Sam"
      },
      {
        "title": "Infrastructure practice",
        "prompt": "Parse the deployment, change replicas to 5, and print JSON with sorted keys.",
        "starter": "import json\ntext = '{\"service\": \"worker\", \"replicas\": 2}'\n# Parse, update, serialize.\n",
        "hints": [
          "Reuse dictionary assignment from lesson 4.",
          "Pass the updated dictionary to json.dumps(..., sort_keys=True)."
        ],
        "expected": "{\"replicas\": 5, \"service\": \"worker\"}"
      }
    ],
    "quiz": {
      "question": "After json.loads('{\"enabled\": false}'), what is the enabled value?",
      "options": [
        {
          "text": "\"false\"",
          "explanation": "The JSON boolean is not a quoted string."
        },
        {
          "text": "False",
          "explanation": "Correct: the JSON boolean false maps to Python False."
        },
        {
          "text": "A parsing error",
          "explanation": "Lowercase false is valid JSON."
        }
      ],
      "answer": 1
    }
  }
];
