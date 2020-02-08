const inq = require('inquirer');

var roleDescriptionQ = {
    message: "How would you best describe yourself?",
    type: "list",
    name: "role",
    choices: ["Beginner", "Intermediate", "Coding Ninja" ]
};

function prompt() {
    return inq.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?"  
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "list",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?",
        when: function(answers) {
            return answers.role === "Engineer";
        }
    },
    {
        type: "input",
        name: "office",
        message: "What is your office number?",
        when: function(answers) {
            return answers.role === "Manager";
        }
    },
    {
        type: "input",
        name: "school",
        message: "Where do you go to school?",
        when: function(answers) {
            return answers.role === "Intern";
        }
    }
    ]);
}

function keepGoing() {
    return inq.prompt({
        type: "confirm",
        name: "moreEmployees",
        message: "Any more employees to add?",
        default: true
    })
}

async function init() {
    let employees = [];
    let more = true;

    while(more) {
        let answers = await prompt();
        console.log(answers);

        let { moreEmployees } = await keepGoing();
        console.log(moreEmployees);
        more = moreEmployees;
    }

}

init();