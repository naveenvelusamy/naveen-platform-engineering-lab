// Chapter 1 only. Examples and exercise starters run without shell or network access.
export type Exercise = { title: string; prompt: string; starter: string; hints: string[]; expected: string };
export type Lesson = {
  id: string; kind: "lesson"; title: string; explanation: string; example: string;
  walkthrough: string; useCase: string; outcomes: string[]; exercises: Exercise[];
  quiz: { question: string; options: { text: string; explanation: string }[]; answer: number };
};
export const lessons: Lesson[] = [
  {
    "id": "why-python",
    "kind": "lesson",
    "title": "Programs, values, and output",
    "explanation": "A program is a sequence of instructions. Python executes top-level statements in order. Start by predicting the output, run the example, then change one thing and compare. This predict\u2013run\u2013inspect cycle helps you solve problems independently. Text in quotes is a string; # starts a comment that Python ignores.",
    "example": "print(\"Starting checks\")\nprint(\"api\", \"OK\")",
    "walkthrough": "print(...) calls a function that displays values. Parentheses enclose its arguments; commas separate arguments and print adds spaces between them. Each call normally ends with a newline. Quotes delimit text and do not appear in the output. A missing closing quote causes a SyntaxError: read the message and check the indicated line.",
    "useCase": "An automation script can print a deployment checklist or a readable status report. These examples only print simulated status; they do not check real servers.",
    "outcomes": [
      "Read a short program in execution order.",
      "Print strings and distinguish code from comments.",
      "Use an error message to locate a syntax mistake."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Print your name and a learning goal on separate lines.",
        "starter": "# Add two print calls here.\n",
        "hints": [
          "Start with a quoted piece of text.",
          "Use one print(...) call for each line."
        ],
        "expected": "Two lines: your name, then your goal."
      },
      {
        "title": "Infrastructure practice",
        "prompt": "Print the three deployment phases: validate, deploy, verify, in that order.",
        "starter": "# Print one phase per line.\n",
        "hints": [
          "Treat each phase as text.",
          "Write three print calls in the required order."
        ],
        "expected": "validate\ndeploy\nverify"
      }
    ],
    "quiz": {
      "question": "What does print(\"api\", \"OK\") display?",
      "options": [
        {
          "text": "api OK",
          "explanation": "Correct: print separates these two arguments with a space."
        },
        {
          "text": "\"api\", \"OK\"",
          "explanation": "Quotes and the comma are syntax, not characters printed here."
        },
        {
          "text": "Nothing",
          "explanation": "Calling print produces output."
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "python-and-pip",
    "kind": "lesson",
    "title": "Python, modules, and project environments",
    "explanation": "An interpreter executes Python code. A module groups reusable code; import makes it available. The standard library ships with Python, while third-party packages are installed separately. On a local machine, a virtual environment isolates a project\u2019s installed packages. It is dependency isolation, not a security sandbox. This page already supplies a browser Python runtime and needs no local setup.",
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
    "id": "python-basics",
    "kind": "lesson",
    "title": "Variables, types, and calculations",
    "explanation": "Variables give names to values so a program can compute results from inputs. Assignment uses =; Python evaluates the right side first. Strings represent text, integers whole numbers, floats decimal approximations, and booleans True or False. Names are case-sensitive. A value\u2019s type determines which operations make sense.",
    "example": "service = \"api\"\nreplicas = 3\ncpu_per_replica = 0.5\ntotal_cpu = replicas * cpu_per_replica\nenabled = True\nprint(f\"{service}: {total_cpu} CPU; enabled={enabled}\")",
    "walkthrough": "The assignments bind names to values. * multiplies the numeric inputs. The f before the string lets {expressions} insert values into the text. + adds numbers but joins strings; \"3\" + \"2\" is \"32\". int(\"3\") converts numeric text to an integer. Invalid conversions raise ValueError. / performs division; // gives floor division. Use == later to compare values, rather than assigning them.",
    "useCase": "Calculate a deployment\u2019s requested CPU from its replica count. This is arithmetic on supplied data, not a measurement of live resource usage.",
    "outcomes": [
      "Assign values and identify str, int, float, and bool.",
      "Calculate a result and display it with an f-string.",
      "Convert numeric text explicitly."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Set price to 12 and quantity to 3; calculate and print their product.",
        "starter": "# Define price and quantity, then calculate total.\n",
        "hints": [
          "Use numeric values without quotes.",
          "Multiply with * and print the result."
        ],
        "expected": "36"
      },
      {
        "title": "Infrastructure practice",
        "prompt": "A service has 4 replicas with 256 MiB each. Calculate total_mib and print api requests 1024 MiB using an f-string.",
        "starter": "replicas = 4\nmib_per_replica = 256\n# Calculate and print the total.\n",
        "hints": [
          "Multiply the two inputs.",
          "Place total_mib inside braces in a string prefixed with f."
        ],
        "expected": "api requests 1024 MiB"
      }
    ],
    "quiz": {
      "question": "What is the value of int(\"3\") + 2?",
      "options": [
        {
          "text": "32",
          "explanation": "String concatenation would require two strings; int converts the text."
        },
        {
          "text": "5",
          "explanation": "Correct: int(\"3\") produces the integer 3, then numeric addition gives 5."
        },
        {
          "text": "A syntax error",
          "explanation": "This is valid Python with a valid conversion."
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "collections",
    "kind": "lesson",
    "title": "Lists and dictionaries",
    "explanation": "Lists store an ordered sequence; dictionaries map unique keys to values. These let you describe several resources and their settings without making a variable for every field. A list index starts at zero. A dictionary uses keys rather than numeric positions.",
    "example": "services = [\"api\", \"worker\"]\nservices.append(\"database\")\nconfig = {\"environment\": \"staging\", \"replicas\": 2}\nconfig[\"replicas\"] = 3\nprint(services[0], len(services))\nprint(config[\"replicas\"])",
    "walkthrough": "Square brackets construct a list or select an item. append adds to the end; len returns the item count. Braces with key: value pairs construct a dictionary. Assigning through a key updates that entry. services[0] is api; services[3] would raise IndexError here. A missing dictionary key raises KeyError; config.get(\"region\", \"unknown\") supplies a fallback when the key is absent.",
    "useCase": "An inventory can be a list of service names, with dictionaries holding configuration. Updating this local dictionary does not change a real deployment.",
    "outcomes": [
      "Access and extend a list.",
      "Read and update dictionary fields.",
      "Recognize missing indices and keys."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Create a list of two favorite tools, append a third, and print its length.",
        "starter": "# Create a list, append one item, and print the count.\n",
        "hints": [
          "Use square brackets and quoted names.",
          "Call your_list.append(...) before len(your_list)."
        ],
        "expected": "3"
      },
      {
        "title": "Infrastructure practice",
        "prompt": "Update replicas to 4 and add region eu-west-1 to the configuration. Print both fields.",
        "starter": "config = {\"service\": \"api\", \"replicas\": 2}\n# Update replicas and add region.\n",
        "hints": [
          "Assign to config[\"replicas\"].",
          "A new key can be assigned using the same syntax."
        ],
        "expected": "4 eu-west-1 (on one line, separated by a space)."
      }
    ],
    "quiz": {
      "question": "For services = [\"api\", \"worker\"], what is services[1]?",
      "options": [
        {
          "text": "api",
          "explanation": "The first item is at index 0."
        },
        {
          "text": "worker",
          "explanation": "Correct: index 1 selects the second item."
        },
        {
          "text": "IndexError",
          "explanation": "Index 1 exists in a two-item list."
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "conditions-loops",
    "kind": "lesson",
    "title": "Decisions and repetition",
    "explanation": "An if statement chooses a block based on a condition. A for loop visits each item in a sequence. Together they let one rule process an inventory of any size. Use four spaces for each indentation level; the indentation defines which statements belong inside a block.",
    "example": "services = [{\"name\": \"api\", \"healthy\": True}, {\"name\": \"worker\", \"healthy\": False}]\nhealthy_count = 0\nfor service in services:\n    if service[\"healthy\"]:\n        healthy_count += 1\n        print(service[\"name\"], \"OK\")\n    else:\n        print(service[\"name\"], \"CHECK\")\nprint(\"Healthy:\", healthy_count)",
    "walkthrough": "A colon starts each for, if, and else block. The loop binds service to each dictionary in turn. True enters the if block; False enters else. += 1 increments the counter. The final unindented print runs after the loop, producing Healthy: 1. Comparisons include ==, !=, <, and >=; and/or combine conditions. Avoid treating the nonempty string \"False\" as a boolean: nonempty strings are truthy.",
    "useCase": "Flag services from supplied health data, or compare disk usage with a threshold. A script should report simulated data clearly before it is connected to live checks.",
    "outcomes": [
      "Write an indented for/if block.",
      "Compare numeric values and count matching items.",
      "Explain the difference between False and \"False\"."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Loop over the numbers and print only numbers greater than or equal to 5.",
        "starter": "numbers = [2, 5, 8]\n# Loop and filter.\n",
        "hints": [
          "Use for number in numbers: .",
          "Inside the loop, test number >= 5 before printing."
        ],
        "expected": "5\n8"
      },
      {
        "title": "Infrastructure practice",
        "prompt": "Print each disk usage at or above 80, then print the number of alerts.",
        "starter": "disk_usage = [45, 80, 92]\nalerts = 0\n# Check each usage and count alerts.\n",
        "hints": [
          "Initialize the counter before the loop (already supplied).",
          "Increment only inside the matching branch; print the total after the loop."
        ],
        "expected": "80\n92\nAlerts: 2"
      }
    ],
    "quiz": {
      "question": "Where should a total be printed once after a loop?",
      "options": [
        {
          "text": "Inside the loop body",
          "explanation": "That prints a running total on every iteration."
        },
        {
          "text": "At the indentation level of the for statement, after its body",
          "explanation": "Correct: leaving the loop block executes the print once after iteration completes."
        },
        {
          "text": "Only in else under if",
          "explanation": "That would print only for items taking that branch."
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "functions",
    "kind": "lesson",
    "title": "Reusable functions and errors",
    "explanation": "A function packages a named operation. Parameters receive input; return sends a result to the caller. Defining a function does not run its body: you must call it. Exceptions signal a failure; catch a specific expected exception when you can explain or recover from it.",
    "example": "def total_cpu(replicas, cpu_each):\n    if replicas < 0:\n        raise ValueError(\"replicas must be nonnegative\")\n    return replicas * cpu_each\n\nprint(total_cpu(3, 0.5))\ntry:\n    print(total_cpu(-1, 0.5))\nexcept ValueError as error:\n    print(\"Invalid configuration:\", error)",
    "walkthrough": "def names the function and declares two parameters. The indented body validates replicas before returning the product. Calling it with 3 and 0.5 prints 1.5. raise stops the invalid call and transfers control to the matching except block, which prints the message. return and print differ: print displays text; a function without an explicit return returns None. Avoid a bare except that hides unrelated programming errors.",
    "useCase": "Reuse a resource calculation across services and report invalid configuration clearly. This function assumes numeric inputs and validates only nonnegative replicas; production validation would also constrain types and CPU values.",
    "outcomes": [
      "Define and call a function with parameters.",
      "Use a return value in another expression.",
      "Raise and catch ValueError for a known invalid input."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Define double(number) that returns twice its input. Print double(6).",
        "starter": "# Define the function, then call it.\n",
        "hints": [
          "Place the calculation in an indented function body.",
          "Use return rather than only printing inside the function."
        ],
        "expected": "12"
      },
      {
        "title": "Infrastructure practice",
        "prompt": "Define validate_replicas(count): reject counts below 1 with ValueError; otherwise return count. Print the result for 3 and catch the error for 0.",
        "starter": "# Define validation, then try valid and invalid calls.\n",
        "hints": [
          "Use if count < 1 inside the function.",
          "Put the invalid call inside try; catch ValueError and print its message."
        ],
        "expected": "3 followed by your validation error message."
      }
    ],
    "quiz": {
      "question": "What does a function return if it only calls print(\"OK\")?",
      "options": [
        {
          "text": "\"OK\"",
          "explanation": "That text is displayed, but print does not make it the function\u2019s return value."
        },
        {
          "text": "None",
          "explanation": "Correct: without an explicit return value, the function returns None."
        },
        {
          "text": "True",
          "explanation": "Successful execution does not automatically return True."
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
  },
  {
    "id": "service-summary",
    "kind": "lesson",
    "title": "Chapter practice: service summary",
    "explanation": "Combine the chapter\u2019s skills by breaking a problem into input, processing, and output. First inspect the supplied data, then decide what should be counted, then format a report. Test a mixed inventory, an empty list, and an all-unhealthy inventory. A successful run proves the syntax executed; compare output with the requirements to check correctness.",
    "example": "def count_healthy(services):\n    count = 0\n    for service in services:\n        if service[\"healthy\"]:\n            count += 1\n    return count\n\nservices = [{\"name\": \"api\", \"healthy\": True}, {\"name\": \"worker\", \"healthy\": False}]\nprint(f\"{count_healthy(services)}/{len(services)} services healthy\")",
    "walkthrough": "The function accepts a list of dictionaries, increments only for healthy entries, and returns a number. len gives the total independently. The final f-string produces 1/2 services healthy. Empty input returns zero, so reporting 0/0 is safe here because there is no division. This example assumes every record has a name and a boolean healthy field.",
    "useCase": "A fleet report can make unhealthy services visible to an operator. Work from this fixed snapshot before adding network access in a future chapter. No subsequent chapter is included here.",
    "outcomes": [
      "Translate requirements into a small algorithm.",
      "Combine collections, loops, functions, and formatted output.",
      "Check results for mixed and empty inventories."
    ],
    "exercises": [
      {
        "title": "Beginner practice",
        "prompt": "Write count_passes(scores), returning how many scores are at least 50. Print its result for [40, 50, 90] and for [].",
        "starter": "scores = [40, 50, 90]\n# Define count_passes and test both lists.\n",
        "hints": [
          "Start a counter at zero inside the function.",
          "Increment for score >= 50; return after the loop."
        ],
        "expected": "2\n0"
      },
      {
        "title": "Infrastructure practice",
        "prompt": "From this JSON snapshot, print name: OK or name: CHECK for every service, then N/T services healthy. Put counting/reporting in a function and test an empty list too.",
        "starter": "import json\ntext = '[{\"name\": \"api\", \"healthy\": true}, {\"name\": \"worker\", \"healthy\": false}, {\"name\": \"db\", \"healthy\": true}]'\n# Parse the snapshot, define a reporting function, and call it.\n",
        "hints": [
          "Parse into a list; loop over each dictionary inside a function.",
          "Use an if/else for labels and increment only when healthy.",
          "After the loop, format the count and len(services); call again with []."
        ],
        "expected": "api: OK\nworker: CHECK\ndb: OK\n2/3 services healthy\n0/0 services healthy"
      }
    ],
    "quiz": {
      "question": "Why test the reporting function with an empty list?",
      "options": [
        {
          "text": "It verifies the zero-item case and counter initialization",
          "explanation": "Correct: the loop runs zero times, so the initial counter and final report still need to work."
        },
        {
          "text": "Empty lists always cause Python exceptions",
          "explanation": "Iteration over an empty list is valid and performs zero iterations."
        },
        {
          "text": "It proves live servers are healthy",
          "explanation": "These tests use supplied data; they do not observe live servers."
        }
      ],
      "answer": 0
    }
  }
];
