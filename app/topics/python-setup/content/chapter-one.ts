// Chapter 1: each lesson introduces one main idea, then builds on earlier lessons.
export type Exercise = {
  title: string; prompt: string; starter: string; hints: string[]; expected: string; stdin?: string;
};
export type Teaching = {
  what: string; why: string; syntax: { code: string; meaning: string }[];
  expected: string; prediction: string; mistakes: string[]; recap: string;
  extras?: { title: string; explanation: string; code: string; expected: string }[];
};
export type Lesson = {
  id: string; kind: "lesson"; title: string; explanation: string; example: string;
  walkthrough: string; useCase: string; outcomes: string[]; exercises: Exercise[];
  stdin?: string; teaching?: Teaching;
  quiz: { question: string; options: { text: string; explanation: string }[]; answer: number };
};
export const lessons: Lesson[] = [
  {
    "id": "why-python",
    "kind": "lesson",
    "title": "Hello, Python! 🐍",
    "explanation": "Your first step into programming. No previous coding experience required.",
    "example": "print(\"Hello, World!\")",
    "walkthrough": "This tells Python to display a message.",
    "useCase": "Later, an automation program can display a message for the person running it. For now, we will only display text; no servers are checked or changed.",
    "outcomes": [
      "Explain that Python lets you give instructions to a computer.",
      "Write one print instruction to display your own message.",
      "Predict the message and compare it with the output."
    ],
    "exercises": [
      {
        "title": "Now it’s your turn",
        "prompt": "Write a Python instruction to display your own message. Choose any short message, such as a greeting. Before running it, say what you expect to see.",
        "starter": "\n",
        "hints": [
          "Look back at the first instruction. Which part contains the message?",
          "Keep print, the parentheses, and the pair of quotes. Replace only the text inside the quotes."
        ],
        "expected": "Your chosen message appears once, without the surrounding quotes."
      },
      {
        "title": "A small automation message",
        "prompt": "Imagine a program that displays a message before someone starts work. Display the text Ready to begin. This only displays a message; it does not perform a check.",
        "starter": "\n",
        "hints": [
          "This uses the same single instruction as your greeting.",
          "Put the message between matching quotes inside the parentheses."
        ],
        "expected": "Ready to begin"
      }
    ],
    "quiz": {
      "question": "What will print(\"Hello, World!\") display?",
      "options": [
        {
          "text": "Hello, World!",
          "explanation": "The text inside the quotes is displayed. The quotes and parentheses are part of the instruction."
        },
        {
          "text": "\"Hello, World!\"",
          "explanation": "The quotes mark where the text starts and ends. They are not displayed."
        },
        {
          "text": "print(\"Hello, World!\")",
          "explanation": "Python follows the instruction and displays its message, rather than displaying the instruction itself."
        }
      ],
      "answer": 0
    },
    "teaching": {
      "what": "Python is a programming language. We use it to give instructions to a computer.",
      "why": "A computer needs instructions to know what to do. Displaying a message is a simple way to see that it followed your instruction.",
      "syntax": [
        {
          "code": "print",
          "meaning": "displays something on the screen. Write it in lowercase."
        },
        {
          "code": "()",
          "meaning": "holds the information passed to print. Use an opening and a closing parenthesis."
        },
        {
          "code": "\"Hello, World!\"",
          "meaning": "the text we want to display. The matching quotes mark its beginning and end."
        }
      ],
      "expected": "Hello, World!",
      "prediction": "What message will appear? Will the quotes appear too?",
      "mistakes": [
        "If you leave out a closing quote or parenthesis, Python cannot read the instruction. Compare it with the example, one character at a time.",
        "Use straight quotes like the example. Curly quotation marks copied from a document do not work as Python text delimiters.",
        "Use lowercase print. Print is a different name and will not display your message."
      ],
      "recap": "You gave Python one instruction and saw it display a message. You can now change that message yourself. Next, we will practise print more and introduce comments, one small step at a time."
    }
  },
  {
    "id": "print-comments",
    "kind": "lesson",
    "title": "Understanding print() and comments",
    "explanation": "A comment is a note for a person reading a program. Python ignores the comment when it runs your instructions.",
    "example": "# Say hello to a learner\nprint(\"Good morning!\")\nprint(\"Let us practise.\")",
    "walkthrough": "Python skips the first line because it begins with #. It then displays the two messages in order. Each print instruction starts a new output line. Write each instruction on its own code line.",
    "useCase": "A short comment can explain why an automation message is shown. A printed message is visible when the program runs; a comment stays in the code.",
    "outcomes": [
      "Explain the difference between a comment and output.",
      "Write two print instructions on separate lines."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Write one comment describing your goal, then display two short messages on separate lines.",
        "hints": [
          "Begin the note with #; do not put the print instructions on that comment line.",
          "Reuse the print instruction twice, with each instruction on its own line."
        ],
        "expected": "Only your two messages appear; the comment does not.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Add a comment explaining this is a rehearsal. Display Starting rehearsal and then Rehearsal complete.",
        "hints": [
          "Put the explanation after # on its own line.",
          "Use one print instruction for each message."
        ],
        "expected": "Starting rehearsal\nRehearsal complete",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "Which line is ignored when the program runs?",
      "options": [
        {
          "text": "# Explain this step",
          "explanation": "Yes. # begins a comment outside quoted text."
        },
        {
          "text": "print(\"Hello\")",
          "explanation": "This displays a message; it is an instruction."
        },
        {
          "text": "print(\"# Hello\")",
          "explanation": "The # is inside quotes, so it is displayed as text."
        }
      ],
      "answer": 0
    },
    "stdin": "",
    "teaching": {
      "what": "A comment is a note for a person reading a program. Python ignores the comment when it runs your instructions.",
      "why": "Notes help you remember why an instruction is there. We will use comments to explain a small program without changing its output.",
      "syntax": [
        {
          "code": "#",
          "meaning": "starts a comment that continues to the end of that line."
        },
        {
          "code": "print(\"Good morning!\")",
          "meaning": "uses the same message instruction from Lesson 1. The next print instruction displays the next line."
        }
      ],
      "expected": "Good morning!\nLet us practise.",
      "prediction": "How many output lines will appear? Will the comment appear?",
      "mistakes": [
        "Text after # outside quotes is a comment, so print(\"Hi\") placed after # on the same line will not run.",
        "A # inside quotes is part of your message: print(\"Task #1\") displays Task #1."
      ],
      "recap": "You can explain an instruction with a comment and display two messages in order. Next, we will give information a name.",
      "extras": []
    }
  },
  {
    "id": "python-basics",
    "kind": "lesson",
    "title": "Variables and storing information",
    "explanation": "A variable is a name you use to refer to a value. You can store information under a name and use that name later.",
    "example": "name = \"Maya\"\nprint(name)\nname = \"Ravi\"\nprint(name)",
    "walkthrough": "The first line assigns the text Maya to name. print(name) looks up its current value. The third line assigns a new value to the same name. The earlier output stays Maya; the second output becomes Ravi.",
    "useCase": "Store the name of the service your program describes. Changing a variable here does not change a real service.",
    "outcomes": [
      "Assign a value and use the variable in print.",
      "Trace how reassignment changes later output."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Store your favorite food in favorite_food and display it. Assign a different food to the same name and display it again.",
        "hints": [
          "Use = with the text in quotes on the right.",
          "Print the variable without quoting its name, both before and after the change."
        ],
        "expected": "Your first food, then your second food on a new line.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Store api in service_name and display it. Reassign service_name to worker and display it again.",
        "hints": [
          "A service name is just quoted text in this exercise.",
          "Use the same variable name for both assignments."
        ],
        "expected": "api\nworker",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "After city = \"Pune\", what does print(\"city\") display?",
      "options": [
        {
          "text": "Pune",
          "explanation": "That would be the output of print(city), without quotes around the name."
        },
        {
          "text": "city",
          "explanation": "Yes. Quotes make this literal text instead of a variable lookup."
        },
        {
          "text": "Nothing",
          "explanation": "print displays the quoted text."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "A variable is a name you use to refer to a value. You can store information under a name and use that name later.",
      "why": "If a message needs someone’s name more than once, store the name once rather than typing it into every instruction.",
      "syntax": [
        {
          "code": "name",
          "meaning": "is a variable name you choose. Use letters, digits, and underscores; do not start with a digit. Use descriptive names."
        },
        {
          "code": "=",
          "meaning": "assigns the value on its right to the name on its left."
        },
        {
          "code": "print(name)",
          "meaning": "looks up a name. print(\"name\") would display the word name instead."
        }
      ],
      "expected": "Maya\nRavi",
      "prediction": "Does changing name change the message that was already printed?",
      "mistakes": [
        "Define a name before using it. Otherwise Python reports that the name is not defined.",
        "Names are case-sensitive: name and Name are different. Avoid spaces and names such as print that Python already uses."
      ],
      "recap": "You can store information, use it by name, and assign a new value. Next, we will distinguish different kinds of values.",
      "extras": []
    }
  },
  {
    "id": "value-types",
    "kind": "lesson",
    "title": "Strings, numbers, and booleans",
    "explanation": "A value has a type: the kind of information it represents. Text, numbers, and yes/no information serve different purposes.",
    "example": "name = \"Maya\"\nage = 25\nheight = 1.7\nis_learning = True\nprint(name)\nprint(age)\nprint(height)\nprint(is_learning)",
    "walkthrough": "Quoted text is called a string (str). A whole number is an integer (int). A number written with a decimal point is a float. True and False are booleans (bool): they represent two possible states. These names describe types; you do not need to declare a type when assigning a value.",
    "useCase": "A configuration may describe service_name as text, replicas as an integer, cpu as a decimal, and enabled as a boolean. These are supplied values, not live measurements.",
    "outcomes": [
      "Recognize str, int, float, and bool values.",
      "Choose types for names, counts, measurements, and flags."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Store a book title, its page count, a decimal rating, and whether you finished it. Display each value.",
        "hints": [
          "Use quotes for the title, numeric values for count and rating, and True or False for the flag.",
          "Print each variable on its own line."
        ],
        "expected": "Four lines showing your chosen title, count, rating, and boolean.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Store service_name as api, replicas as 3, cpu as 0.5, and enabled as True. Display them on separate lines.",
        "hints": [
          "Only api needs quotes.",
          "Use True with a capital T and no quotes."
        ],
        "expected": "api\n3\n0.5\nTrue",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "Which value is a boolean?",
      "options": [
        {
          "text": "\"False\"",
          "explanation": "The quotes make this a string."
        },
        {
          "text": "False",
          "explanation": "Yes. False is a boolean written without quotes."
        },
        {
          "text": "0.5",
          "explanation": "This is a float, not a boolean."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "A value has a type: the kind of information it represents. Text, numbers, and yes/no information serve different purposes.",
      "why": "Choosing the right kind of value helps you describe information accurately. A person’s name is text; an item count is a number.",
      "syntax": [
        {
          "code": "\"Maya\"",
          "meaning": "is a string: text enclosed in matching quotes."
        },
        {
          "code": "25",
          "meaning": "is an integer: a whole number without quotes."
        },
        {
          "code": "1.7",
          "meaning": "is a float: a decimal number without quotes. Floats are approximations, not exact for every decimal."
        },
        {
          "code": "True",
          "meaning": "is a boolean. True and False begin with capital letters and have no quotes."
        }
      ],
      "expected": "Maya\n25\n1.7\nTrue",
      "prediction": "Which values are text? Will True appear with quotation marks?",
      "mistakes": [
        "\"25\" is text; 25 is a number. Similar-looking output does not mean the values have the same type.",
        "\"False\" is text, not the boolean False. Lowercase true is not Python’s True."
      ],
      "recap": "You can choose text, whole numbers, decimal numbers, and booleans for different information. Next, we will calculate with numbers.",
      "extras": []
    }
  },
  {
    "id": "operators",
    "kind": "lesson",
    "title": "Basic operators and calculations",
    "explanation": "An operator is a symbol that performs an operation. Arithmetic operators let Python calculate with numbers.",
    "example": "price = 12\nquantity = 3\ntotal = price * quantity\nprint(total)\nprint(total + 4)",
    "walkthrough": "* multiplies, so total becomes 36. + adds, so the second result is 40. Python calculates the right side before assigning it. - subtracts and / divides: 7 / 2 gives 3.5. Parentheses group a calculation: (2 + 3) * 4 gives 20, while 2 + 3 * 4 gives 14 because multiplication happens before addition.",
    "useCase": "Multiply a replica count by requested memory per replica to estimate total requested memory. This is a calculation on supplied configuration.",
    "outcomes": [
      "Use addition, subtraction, multiplication, and division.",
      "Store a calculated result and predict grouped arithmetic."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "A notebook costs 8 and you buy 4. Store the inputs, calculate the cost, and print it. Then print the cost with a delivery fee of 3.",
        "hints": [
          "Multiply the two inputs with *.",
          "Add 3 to your calculated total for the second print."
        ],
        "expected": "32\n35",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "A service has 4 replicas requesting 256 MiB each. Calculate total_mib and display the total.",
        "hints": [
          "Store both inputs as integers.",
          "Multiply replicas by the amount per replica."
        ],
        "expected": "1024",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "What is (2 + 3) * 4?",
      "options": [
        {
          "text": "14",
          "explanation": "That is the result without the grouping parentheses."
        },
        {
          "text": "20",
          "explanation": "Yes. The grouped addition gives 5, then multiplication gives 20."
        },
        {
          "text": "24",
          "explanation": "First calculate the expression inside the parentheses."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "An operator is a symbol that performs an operation. Arithmetic operators let Python calculate with numbers.",
      "why": "Calculating from stored values lets you change the inputs without manually working out the answer again.",
      "syntax": [
        {
          "code": "*",
          "meaning": "multiplies two numbers."
        },
        {
          "code": "+",
          "meaning": "adds two numbers; it can also join two strings."
        },
        {
          "code": "-",
          "meaning": "subtracts the right number from the left."
        },
        {
          "code": "/",
          "meaning": "divides; the result is a float. Dividing by zero fails."
        },
        {
          "code": "(2 + 3) * 4",
          "meaning": "does the grouped addition before multiplication."
        }
      ],
      "expected": "36\n40",
      "prediction": "Does total change when we print total + 4, without assigning it?",
      "mistakes": [
        "\"3\" + \"2\" joins strings into \"32\". Use numbers without quotes for numeric arithmetic.",
        "Writing a calculation without storing or printing it will not show a result in a script.",
        "A calculation does not automatically update its inputs: total + 4 leaves total unchanged."
      ],
      "recap": "You can calculate a result from inputs and explain the order of operations. Next, we will ask the person running a program for an input.",
      "extras": []
    }
  },
  {
    "id": "user-input",
    "kind": "lesson",
    "title": "Getting input and displaying output",
    "explanation": "input() reads text supplied by the person running a program. You can store that text in a variable and use it in a response.",
    "example": "name = input(\"Your name: \")\nprint(\"Hello, \" + name + \"!\")",
    "walkthrough": "input displays the prompt in quotes and reads one line of text. = stores that text in name. + joins strings into one message. In this page, type answers into Program input before pressing Run, one answer per line. Python consumes them in order. An empty input box means no lines are supplied. If the program asks for more lines than supplied, it reports an end-of-input error instead of waiting.",
    "useCase": "Ask which environment a report should describe. Reading its name does not connect to that environment or perform a deployment.",
    "outcomes": [
      "Use input to read text into a variable.",
      "Join text and distinguish supplied input from output."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Ask for a favorite color and display I like COLOR, replacing COLOR with the supplied answer. Try blue first.",
        "hints": [
          "Store the result of input in a variable.",
          "Join \"I like \" with the variable using +."
        ],
        "expected": "Your prompt followed by I like blue when blue is supplied.",
        "starter": "\n",
        "stdin": "blue"
      },
      {
        "title": "Automation practice",
        "prompt": "Ask for an environment name and display Selected environment: NAME. Try staging.",
        "hints": [
          "The supplied environment is text.",
          "Join the label and the variable, including a space after the colon."
        ],
        "expected": "Your prompt followed by Selected environment: staging.",
        "starter": "\n",
        "stdin": "staging"
      }
    ],
    "quiz": {
      "question": "If a person supplies 3 to input(), what kind of value is returned?",
      "options": [
        {
          "text": "An integer",
          "explanation": "input returns text, even when that text contains digits."
        },
        {
          "text": "A string",
          "explanation": "Yes. Numeric conversion is a separate step."
        },
        {
          "text": "A boolean",
          "explanation": "The input text is not automatically converted to a boolean."
        }
      ],
      "answer": 1
    },
    "stdin": "Maya",
    "teaching": {
      "what": "input() reads text supplied by the person running a program. You can store that text in a variable and use it in a response.",
      "why": "A program can respond to different people without editing its source code for every run.",
      "syntax": [
        {
          "code": "input(\"Your name: \")",
          "meaning": "asks for one line of text; the quoted text is the prompt."
        },
        {
          "code": "name = input(...)",
          "meaning": "stores the supplied text under a variable name."
        },
        {
          "code": "\"Hello, \" + name + \"!\"",
          "meaning": "joins three strings. Spaces inside quotes appear in the message."
        }
      ],
      "expected": "Your name: Hello, Maya!",
      "prediction": "With Maya supplied as input, which text comes from the program and which from the person?",
      "mistakes": [
        "input always returns text, even if the person types digits. int(\"3\") converts numeric text to an integer; int(\"three\") fails. Keep this exercise to text; we will practise conversion errors in debugging.",
        "The prompt may share an output line with the response. This runner does not echo supplied answers as typed terminal input.",
        "Do not put quotes around your name in Program input unless you want those quotes to be part of the answer."
      ],
      "recap": "You can ask for a line of text and respond using it. Next, we will choose instructions based on a condition.",
      "extras": []
    }
  },
  {
    "id": "decisions",
    "kind": "lesson",
    "title": "Making decisions with if",
    "explanation": "An if statement runs an instruction only when a condition is true. An else block gives an alternative when it is false.",
    "example": "age = 16\nif age >= 18:\n    print(\"Adult ticket\")\nelse:\n    print(\"Youth ticket\")",
    "walkthrough": ">= compares two values and means greater than or equal to. The comparison gives True or False. if tests that result. A colon ends each block header; four spaces indent the instructions belonging to it. Here, the comparison is False, so only the else message is printed. == checks equality; != checks inequality; < and > compare size. = still means assignment, not comparison.",
    "useCase": "Flag a supplied disk usage value when it reaches a threshold. This reports a number supplied to the program; it does not measure a real disk.",
    "outcomes": [
      "Write an if/else block with correct indentation.",
      "Use comparisons to choose one output."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Set temperature to 30. Print Take water when it is at least 25; otherwise print Enjoy your walk. Try 20 too.",
        "hints": [
          "Use >= to compare temperature with 25.",
          "Put each message inside its own indented block."
        ],
        "expected": "30: Take water. 20: Enjoy your walk.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Set disk_usage to 85. Print CHECK when it is at least 80; otherwise print OK. Try 45 and 80 too.",
        "hints": [
          "Compare the supplied usage with the threshold.",
          "The value 80 belongs in the CHECK branch because the threshold is inclusive."
        ],
        "expected": "85: CHECK. 45: OK. 80: CHECK.",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "Which operator checks whether two values are equal?",
      "options": [
        {
          "text": "=",
          "explanation": "This assigns a value to a name."
        },
        {
          "text": "==",
          "explanation": "Yes. This compares values and produces True or False."
        },
        {
          "text": "+",
          "explanation": "This adds numbers or joins strings."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "An if statement runs an instruction only when a condition is true. An else block gives an alternative when it is false.",
      "why": "A program can respond differently to different information, rather than always following the same path.",
      "syntax": [
        {
          "code": "if age >= 18:",
          "meaning": "tests a condition. The colon starts an indented block."
        },
        {
          "code": "    print(\"Adult ticket\")",
          "meaning": "four leading spaces place this instruction inside the if block."
        },
        {
          "code": "else:",
          "meaning": "starts the alternative block, aligned with if."
        },
        {
          "code": "==",
          "meaning": "compares two values for equality; it does not assign a value."
        }
      ],
      "expected": "Youth ticket",
      "prediction": "Which one of the two messages appears? What changes if age is 18?",
      "mistakes": [
        "Keep instructions in the same block aligned. Missing indentation or a missing colon prevents Python from reading the block.",
        "Use == for equality checks. A single = is for assignment.",
        "Use the boolean False for a false flag. The nonempty string \"False\" is treated as true in an if test."
      ],
      "recap": "You can trace a condition and choose one of two blocks. Next, we will repeat instructions.",
      "extras": []
    }
  },
  {
    "id": "conditions-loops",
    "kind": "lesson",
    "title": "Repeating instructions with loops",
    "explanation": "A loop repeats a block of instructions. A for loop can visit each number produced by range().",
    "example": "for number in range(1, 4):\n    print(number)\nprint(\"Done\")",
    "walkthrough": "range(1, 4) produces 1, 2, and 3: the starting number is included and the stopping number is excluded. for assigns each number in turn to number. in connects that name to the sequence to visit. The colon begins the loop block. The indented print runs once per number. The final unindented print runs once after the loop.",
    "useCase": "Print numbered rehearsal attempts or inspect a supplied collection. A loop does not itself add retries, delays, or real network checks.",
    "outcomes": [
      "Predict the numbers produced by range.",
      "Distinguish repeated instructions from an after-loop summary."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Print the numbers 1 through 5, then print Finished once.",
        "hints": [
          "Choose a stopping value one greater than the final number you want.",
          "Indent the number print, but leave the final message outside the loop."
        ],
        "expected": "1\n2\n3\n4\n5\nFinished",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Loop through attempt numbers 1 through 3. On each iteration print Attempt, then print its number on the next line. After the loop, print Rehearsal complete.",
        "hints": [
          "Use range with a starting value of 1.",
          "Both print instructions for an attempt belong inside the loop."
        ],
        "expected": "Attempt\n1\nAttempt\n2\nAttempt\n3\nRehearsal complete",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "Which numbers does range(1, 3) produce?",
      "options": [
        {
          "text": "1, 2, 3",
          "explanation": "The stopping value is excluded."
        },
        {
          "text": "1, 2",
          "explanation": "Yes. Start at 1 and stop before 3."
        },
        {
          "text": "0, 1, 2",
          "explanation": "An explicit start of 1 excludes 0."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "A loop repeats a block of instructions. A for loop can visit each number produced by range().",
      "why": "Repeating a rule saves you from writing nearly identical instructions many times.",
      "syntax": [
        {
          "code": "range(1, 4)",
          "meaning": "produces numbers starting at 1 and stopping before 4. The comma separates its two inputs."
        },
        {
          "code": "for number in ...:",
          "meaning": "gives each successive item the name number and repeats the indented block."
        },
        {
          "code": "print(\"Done\")",
          "meaning": "is outside the loop because it has no leading indentation."
        }
      ],
      "expected": "1\n2\n3\nDone",
      "prediction": "How many times does the indented print run? Does Done repeat?",
      "mistakes": [
        "The stopping number is excluded. range(1, 4) does not include 4.",
        "Keep a final summary outside the loop if it should appear once.",
        "Initialize a counter before a loop. Resetting it inside the loop loses the previous count."
      ],
      "recap": "You can repeat an action and trace each iteration. Next, we will group information into collections.",
      "extras": []
    }
  },
  {
    "id": "collections",
    "kind": "lesson",
    "title": "Lists and dictionaries",
    "explanation": "A collection groups related values. A list keeps items in order; a dictionary gives values descriptive keys. We will start with a list, then compare a small dictionary.",
    "example": "foods = [\"rice\", \"soup\"]\nprint(foods[0])\nfoods.append(\"bread\")\nfor food in foods:\n    print(food)",
    "walkthrough": "Square brackets around comma-separated values create a list. An index selects a position, counting from zero: foods[0] is rice. append adds one item to the end. The dot in foods.append accesses an operation belonging to this list. The for loop visits each stored value in order.",
    "useCase": "A list can hold service names, while a dictionary holds a service’s settings. These structures describe local data; changing them does not update infrastructure.",
    "outcomes": [
      "Create a list, access an index, append an item, and iterate.",
      "Read and update a small dictionary by key."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Create a list of two favorite activities, append a third, and print each activity with a loop.",
        "hints": [
          "Use square brackets for the list and append to add the third item.",
          "Reuse for item in your_list: with an indented print."
        ],
        "expected": "Your three activities in their stored order.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Create config with service set to api and replicas set to 2. Update replicas to 4, then print service and replicas on separate lines.",
        "hints": [
          "Use a dictionary with quoted keys and key: value pairs.",
          "Assign through config[\"replicas\"] before printing the fields."
        ],
        "expected": "api\n4",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "For tools = [\"pen\", \"ruler\"], what does tools[0] give?",
      "options": [
        {
          "text": "pen",
          "explanation": "Yes. List indices start at zero."
        },
        {
          "text": "ruler",
          "explanation": "This is the second item, at index 1."
        },
        {
          "text": "A missing-key error",
          "explanation": "This is a valid list position, not a dictionary key."
        }
      ],
      "answer": 0
    },
    "stdin": "",
    "teaching": {
      "what": "A collection groups related values. A list keeps items in order; a dictionary gives values descriptive keys. We will start with a list, then compare a small dictionary.",
      "why": "You can manage a group of names without inventing a separate variable name for every item.",
      "syntax": [
        {
          "code": "[\"rice\", \"soup\"]",
          "meaning": "creates a list containing two strings."
        },
        {
          "code": "foods[0]",
          "meaning": "selects the first item; index 1 selects the second."
        },
        {
          "code": "foods.append(\"bread\")",
          "meaning": "adds bread after the existing items."
        },
        {
          "code": "for food in foods:",
          "meaning": "uses the loop you know to visit each item."
        }
      ],
      "expected": "rice\nrice\nsoup\nbread",
      "prediction": "Why does rice appear twice? Which message comes before the loop?",
      "mistakes": [
        "The first index is 0. An index beyond the end of the list causes IndexError.",
        "A dictionary key must exist before you read it with square brackets; a missing key causes KeyError.",
        "Lists and dictionaries can be changed in place. Giving one list a second name does not copy it; references and mutability will get a dedicated deeper exercise later."
      ],
      "recap": "You can store ordered items and look up named fields. Next, we will give a reusable group of instructions a name.",
      "extras": [
        {
          "title": "Next small step: named fields",
          "explanation": "A dictionary groups values under keys. Curly braces create it; a colon joins each key to its value and commas separate entries. Use a quoted key in square brackets to read or update its value. len(...) returns a collection’s item count.",
          "code": "person = {\"name\": \"Maya\", \"age\": 25}\nprint(person[\"name\"])\nperson[\"age\"] = 26\nprint(person[\"age\"])\nprint(len(person))",
          "expected": "Maya\n26\n2"
        }
      ]
    }
  },
  {
    "id": "functions",
    "kind": "lesson",
    "title": "Functions and reusable code",
    "explanation": "A function is a named group of instructions. Defining it saves the instructions; calling it runs them.",
    "example": "def greet():\n    print(\"Hello!\")\n\ngreet()\ngreet()",
    "walkthrough": "def introduces a function definition. greet is the name we chose. Empty parentheses mean this function expects no input values. The colon begins its body, which is indented by four spaces. The definition alone prints nothing. Each later greet() call runs the body once.",
    "useCase": "Name a repeatable reporting action. Later, keep calculations separate from display so you can check their results independently.",
    "outcomes": [
      "Define and call a no-input function.",
      "Use a simple parameter and return value after understanding a basic call."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Define a function named show_goal that prints your learning goal. Call it twice.",
        "hints": [
          "Begin with def and choose no inputs for this function.",
          "The message is inside the indented body; both calls are outside it."
        ],
        "expected": "Your goal appears twice, on separate lines.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Define total_memory(replicas, memory_each) that returns their product. Print the result of calling it with 3 and 256.",
        "hints": [
          "The names between parentheses receive values from each call.",
          "Use return for the calculation, then print the result of the call outside the function."
        ],
        "expected": "768",
        "starter": "\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "When does a function body run?",
      "options": [
        {
          "text": "Whenever Python reads its definition",
          "explanation": "A definition saves the body but does not execute it."
        },
        {
          "text": "When the function is called",
          "explanation": "Yes. A call uses the function name followed by parentheses."
        },
        {
          "text": "Only if its name is print",
          "explanation": "You can call functions you define yourself."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "A function is a named group of instructions. Defining it saves the instructions; calling it runs them.",
      "why": "You can use the same action several times without copying its body. You have already called print; now you will define your own function.",
      "syntax": [
        {
          "code": "def greet():",
          "meaning": "defines a function called greet. def is a Python keyword."
        },
        {
          "code": "    print(\"Hello!\")",
          "meaning": "belongs to the function body because it is indented."
        },
        {
          "code": "greet()",
          "meaning": "calls the function. Parentheses after the name request execution."
        }
      ],
      "expected": "Hello!\nHello!",
      "prediction": "How many greetings appear? Does the definition itself display a greeting?",
      "mistakes": [
        "Calling greet without parentheses only refers to the function; it does not run it.",
        "Define the function before the first call. Keep its body indented.",
        "Displaying text and returning a value are different. return passes a value back to the caller; print only displays it."
      ],
      "recap": "You can define and call a small function, then give it input and use its result. Scope and different argument styles will be explored later with focused exercises.",
      "extras": [
        {
          "title": "Next small step: inputs and a result",
          "explanation": "A parameter names an input inside a function. An argument is the value supplied in a call. Here number receives 4. return sends a value back to the caller; it does not display it. The caller stores the returned value in answer, then prints it. Without an explicit return value, a function returns None, meaning no value was supplied.",
          "code": "def double(number):\n    return number * 2\n\nanswer = double(4)\nprint(answer)",
          "expected": "8"
        }
      ]
    }
  },
  {
    "id": "errors-debugging",
    "kind": "lesson",
    "title": "Errors and debugging",
    "explanation": "Debugging means finding why a program does not behave as intended, changing one thing, and checking again.",
    "example": "items = 3\nprice_each = 4\ntotal = items * price_each\nprint(total)",
    "walkthrough": "This corrected program prints 12. If you expected 12 but wrote items + price_each, it would run and print 7: that is a logic mistake. First write down your expected result, inspect the inputs and operation, change one thing, and run again. For reported errors, read the final error line and the referenced source line. SyntaxError means Python could not read the code; NameError means a name was not defined; ValueError often means a conversion received unsuitable text.",
    "useCase": "Validate text intended to be a replica count before relying on it. Reporting a bad value is safer than silently choosing a count.",
    "outcomes": [
      "Distinguish syntax, runtime, and logic mistakes.",
      "Repair a small calculation and catch a specific conversion error."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "This program should print the cost of three tickets at 5 each. Predict the right answer, run it, find the mistake, and repair it.",
        "hints": [
          "The program runs, so inspect the calculation rather than looking for missing punctuation.",
          "Which operator means three groups of five?"
        ],
        "expected": "15",
        "starter": "tickets = 3\nprice = 5\nprint(tickets + price)\n",
        "stdin": ""
      },
      {
        "title": "Automation practice",
        "prompt": "Convert replica_text to an integer and print it. If conversion fails, catch ValueError and print Invalid replica count. Test with \"3\" and then \"three\".",
        "hints": [
          "Put the conversion inside a try block.",
          "Catch ValueError in an except block, using the indentation shown in the example below."
        ],
        "expected": "For \"3\": 3. For \"three\": Invalid replica count.",
        "starter": "replica_text = \"three\"\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "A program runs but prints 7 when the required result is 12. What should you do?",
      "options": [
        {
          "text": "Assume it is correct because it ran",
          "explanation": "Execution success does not prove the program meets its requirements."
        },
        {
          "text": "Compare the inputs and calculation with the expected result",
          "explanation": "Yes. A logic mistake may produce no Python error at all."
        },
        {
          "text": "Ignore the result",
          "explanation": "The output is evidence you need when checking the program."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "Debugging means finding why a program does not behave as intended, changing one thing, and checking again.",
      "why": "Errors provide clues. A program can fail to run, fail while running, or run successfully but produce the wrong result.",
      "syntax": [
        {
          "code": "items * price_each",
          "meaning": "multiplies the count by the price, rather than adding them."
        },
        {
          "code": "int(\"3\")",
          "meaning": "converts numeric text to an integer. int(\"three\") raises ValueError instead of guessing."
        }
      ],
      "expected": "12",
      "prediction": "If * were replaced by +, would Python report an error or print an incorrect total?",
      "mistakes": [
        "A successful run is not proof that the result is correct. Compare with a result you worked out yourself.",
        "Read the error before changing several lines. Check spelling, quotes, indentation, and values.",
        "Catch only an error you can handle; hiding all errors can make a broken program look successful."
      ],
      "recap": "You can compare expected and actual behavior, read a useful error clue, and test a repair. You can handle one known conversion failure without hiding unrelated errors.",
      "extras": [
        {
          "title": "Handle one expected conversion error",
          "explanation": "An exception is Python’s signal that an operation failed while running. try starts a block where a known operation may fail. except ValueError runs only when that type of failure occurs. Both headers need colons and indented bodies. If conversion succeeds, the except block is skipped. This example deliberately uses unsuitable numeric text.",
          "code": "text = \"three\"\ntry:\n    count = int(text)\n    print(count)\nexcept ValueError:\n    print(\"Please use digits\")",
          "expected": "Please use digits"
        }
      ]
    }
  },
  {
    "id": "service-summary",
    "kind": "lesson",
    "title": "Your first mini-project",
    "explanation": "A mini-project combines familiar steps to solve a small problem. Start with a plan in plain language before writing the code.",
    "example": "tasks = [True, False, True]\nfinished = 0\nfor done in tasks:\n    if done:\n        finished = finished + 1\nprint(finished)\nprint(len(tasks))",
    "walkthrough": "This everyday model counts completed tasks. Each boolean describes whether one task is finished. The counter starts at zero before the loop and grows only when done is True. len(tasks) gives the total. For your own project, plan first, write one small piece, run it, then extend it. Reuse the same counting idea for a supplied service inventory.",
    "useCase": "Summarize supplied service health records. Your report should make an unhealthy record visible and include totals, without using network access or changing infrastructure.",
    "outcomes": [
      "Break a reporting problem into input, processing, and output.",
      "Write a function that reports supplied service data.",
      "Check mixed, empty, and all-unhealthy inputs."
    ],
    "exercises": [
      {
        "title": "Everyday practice",
        "prompt": "Create your own list of finished-task booleans. Write a function that prints the finished count and total on separate lines. Test it with [True, False], [], and [False, False].",
        "hints": [
          "Pass the list into your function rather than relying on a variable outside it.",
          "Initialize the counter in the function before the loop; print totals after the loop."
        ],
        "expected": "For the three calls: 1 then 2; 0 then 0; 0 then 2, each number on its own line.",
        "starter": "\n",
        "stdin": ""
      },
      {
        "title": "Automation mini-project",
        "prompt": "Plan and write report_services(services). For each supplied dictionary, display its name, then OK or CHECK on the next line. After all records, display Healthy: followed by the healthy count on a new line, then Total: followed by the total on a new line. Test the supplied snapshot, an empty list, and a list with one unhealthy service.",
        "hints": [
          "Loop over the dictionaries inside your function. Read each name and healthy field, then use if/else for the label.",
          "Count healthy records inside the matching branch. Print the two totals after the loop using len for the total. Do not divide."
        ],
        "expected": "Supplied snapshot:\napi\nOK\nworker\nCHECK\nHealthy:\n1\nTotal:\n2\n\nEmpty: Healthy: then 0, Total: then 0. One unhealthy record: its name and CHECK, then healthy count 0 and total 1.",
        "starter": "services = [\n    {\"name\": \"api\", \"healthy\": True},\n    {\"name\": \"worker\", \"healthy\": False},\n]\n\n",
        "stdin": ""
      }
    ],
    "quiz": {
      "question": "Which test set gives useful confidence in a service summary?",
      "options": [
        {
          "text": "Only one healthy service",
          "explanation": "This does not check empty input or the unhealthy branch."
        },
        {
          "text": "Mixed health, empty input, and all unhealthy",
          "explanation": "Yes. These test both decision branches and the zero-iteration case."
        },
        {
          "text": "No tests if the program ran once",
          "explanation": "One successful run does not establish correctness for different inputs."
        }
      ],
      "answer": 1
    },
    "stdin": "",
    "teaching": {
      "what": "A mini-project combines familiar steps to solve a small problem. Start with a plan in plain language before writing the code.",
      "why": "Planning input, processing, and output helps you work independently instead of copying a complete solution.",
      "syntax": [
        {
          "code": "finished = finished + 1",
          "meaning": "reads the old count, adds one, and stores the new count."
        },
        {
          "code": "if done:",
          "meaning": "tests the boolean currently assigned to done."
        },
        {
          "code": "len(tasks)",
          "meaning": "returns how many entries are stored in the list."
        }
      ],
      "expected": "2\n3",
      "prediction": "Which items increase finished? What happens for an empty list?",
      "mistakes": [
        "Do not reset the counter inside the loop. That loses the count from earlier items.",
        "An empty inventory should produce a clear zero-count report, rather than an undefined variable.",
        "Do not assume a program checks real services just because its data contains service names. This project uses a fixed snapshot."
      ],
      "recap": "You can plan, implement, and verify a small report using values, loops, decisions, collections, and functions. Before moving on, rewrite your solution from your plan without looking at the example.",
      "extras": []
    }
  }
];
