// Proposal only: these entries are not executable lessons or completion IDs.
export const beginnerPath = [
  { topic: "What is Python? Your first program", focus: "Give one instruction and display a message." },
  { topic: "Understanding print() and comments", focus: "Display messages, then explain code with comments." },
  { topic: "Variables and storing information", focus: "Give a value a name and use it again." },
  { topic: "Strings, numbers, and booleans", focus: "Choose a kind of value for the information you need." },
  { topic: "Basic operators and calculations", focus: "Calculate with values and explain the result." },
  { topic: "Getting input and displaying output", focus: "Ask for information and respond to it." },
  { topic: "Making decisions with if", focus: "Choose an instruction based on a condition." },
  { topic: "Repeating instructions with loops", focus: "Repeat a small action and trace each step." },
  { topic: "Lists and dictionaries", focus: "Group information, first in lists, then with named fields." },
  { topic: "Functions and reusable code", focus: "Name a small reusable action, then explore inputs and results." },
  { topic: "Errors and debugging", focus: "Read a message, isolate a mistake, and test a correction." },
  { topic: "Your first mini-project", focus: "Plan, write, and check a small program independently." },
];

export const firstProgram = {
  what: "Python is a programming language. We use it to give instructions to a computer.",
  why: "A computer needs instructions to know what to do. Displaying a message is a simple way to see that it followed your instruction.",
  syntax: [
    { code: "print", meaning: "displays something on the screen. Write it in lowercase." },
    { code: "()", meaning: "holds the information passed to print. Use an opening and a closing parenthesis." },
    { code: '"Hello, World!"', meaning: "the text we want to display. The matching quotes mark its beginning and end." },
  ],
  expected: "Hello, World!",
  mistakes: [
    "If you leave out a closing quote or parenthesis, Python cannot read the instruction. Compare it with the example, one character at a time.",
    "Use straight quotes like the example. Curly quotation marks copied from a document do not work as Python text delimiters.",
    "Use lowercase print. Print is a different name and will not display your message in this example.",
  ],
  recap: "You gave Python one instruction and saw it display a message. You can now change that message yourself. Next, we will practise print more and introduce comments, one small step at a time.",
};
