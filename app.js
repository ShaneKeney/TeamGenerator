const inq = require('inquirer');
const uuid = require('uuid');
const fs = require('fs');

const Engineer = require('./lib/models/Engineer');
const Manager = require('./lib/models/Manager');
const Intern = require('./lib/models/Intern');

const mainTemplate = fs.readFileSync('./templates/main.html', "utf-8", function() { });
const engineerCardTemplate = fs.readFileSync('./templates/engineer.html', "utf-8", function() { });
const internCardTemplate = fs.readFileSync('./templates/intern.html', "utf-8", function() { });
const managerCardTemplate = fs.readFileSync('./templates/manager.html', "utf-8", function() { });

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

        createEmployee(employees, answers);
        console.log(employees);

        let { moreEmployees } = await keepGoing();
        more = moreEmployees;
    }

   createHTMLPage(employees);
}

const createHTMLPage = (employeeArray) => {
    let webpage = mainTemplate;
    let appendCards = "";

    employeeArray.forEach((item) => {
        switch(item.getRole()) {
            case "Manager":
                let managerCard = managerCardTemplate;
                managerCard = managerCard.replace("$NAME", item.name);
                managerCard = managerCard.replace("$ROLE", item.getRole());
                managerCard = managerCard.replace("$ID_PLACEHOLDER", item.id);
                managerCard = managerCard.replace("$EMAIL_PLACEHOLDER", item.email);
                managerCard = managerCard.replace("$OFFICE_PLACEHOLDER", item.officeNumber);
                appendCards += managerCard + '\n';
                return;
            case "Intern":
                let internCard = internCardTemplate;
                internCard = internCard.replace("$NAME", item.name);
                internCard = internCard.replace("$ROLE", item.getRole());
                internCard = internCard.replace("$ID_PLACEHOLDER", item.id);
                internCard = internCard.replace("$EMAIL_PLACEHOLDER", item.email);
                internCard = internCard.replace("$SCHOOL_PLACEHOLDER", item.school);
                appendCards += internCard + '\n';
                return;
            case "Engineer":
                let engineerCard = engineerCardTemplate;
                engineerCard = engineerCard.replace("$NAME", item.name);
                engineerCard = engineerCard.replace("$ROLE", item.getRole());
                engineerCard = engineerCard.replace("$ID_PLACEHOLDER", item.id);
                engineerCard = engineerCard.replace("$EMAIL_PLACEHOLDER", item.email);
                engineerCard = engineerCard.replace("$GITHUB_PLACEHOLDER", item.github);
                appendCards += engineerCard + '\n';
                return;
            default:
        }
    });

    webpage = webpage.replace("$CARD_ELEMENT", appendCards);
    fs.writeFile('output/generatedTeam.html', webpage, function() { });
}

//  Helper function for creating the necessary class and adding it to emploees array
const createEmployee = (employees, addEmployee) => {
    const { name, email, role } = addEmployee;
    let id = uuid();

    switch(role) {
        case "Manager":
            return employees.push(new Manager(name, id, email, addEmployee.office));
        case "Engineer":
            return employees.push(new Engineer(name, id, email, addEmployee.github));
        case "Intern":
            return employees.push(new Intern(name, id, email, addEmployee.school));
        default:
            return;
    }
}

init();