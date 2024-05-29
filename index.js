#! /usr/bin/env node
//shabang
import inquirer from "inquirer";
import chalk from "chalk";
// console.log(chalkAnimation.);
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: chalk.red("Please select an option: \n "),
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: chalk.green("Please enter your name:")
        });
        let trimedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log(chalk.yellow.bold("\n\tYour account has been created"));
                console.log(`Welcome`, `${trimedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: (chalk.bgBlue("Please select a course:")),
                    choices: ["IT", "English", "Scince"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 1000;
                        break;
                    case "Science":
                        courseFees = 1500;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: chalk.cyan("Do you want to enroll in this course ?")
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log(chalk.yellow.bold(`\n\tYou have enrolled in this course!`));
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log(chalk.magenta("This name is already exists"));
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNamesCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select name",
                choices: studentNamesCheck
            });
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log("Student Information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log(chalk.magenta("Record is empty!"));
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: chalk.red("Do you want to continue ?")
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
