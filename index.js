// import files/modules

import { issueInsert } from "./issue-form.js";

document.querySelector(".input-section-el").innerHTML = issueInsert;

// 1. declare all variables
const form = document.getElementById("issue-form");

// 2. create constructor function / CLASS

class issueObject {
  constructor(issue, priority, date, assigned, assignor) {
    this.issue = issue;
    this.priority = priority;
    this.date = date;
    this.assigned = assigned;
    this.assignor = assignor;
    this.isClosed = false; // Initialize the state as "open"
    // additional
    this.ident = generateRandomID();
  }
}

// 3. create Array to store the objects

const issueObjectArray = [];

// event listener for the form

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("form submitted");

  // CHECK THAT PRIORITY HAS BEEN SELECTED
  const dropDown = document.getElementById("dropdown");
  const selectedOption = dropDown.options[dropDown.selectedIndex];

  if (dropDown.value === " " || selectedOption.disabled) {
    // The dropdown is not selected or the selected option is disabled
    // Display an error message or take appropriate action
    console.log("Please select a priority");
    alert("Please select a priority");
    return; // Stop form submission
  }
  // If form validation passes, you can proceed with form submission
  // END OF PRIORITY CHECK
  // generate new object
  const issue = document.getElementById("description").value;
  const priority = document.getElementById("dropdown").value;
  const date = document.getElementById("date").value;
  const assigned = document.getElementById("assigned").value;
  const assignor = document.getElementById("assignor").value;

  const newIssueObject = new issueObject(
    issue,
    priority,
    date,
    assigned,
    assignor
  );

  issueObjectArray.push(newIssueObject);
});

console.log(issueObjectArray);

// function to generate random ID for TASK
function generateRandomID() {
  let id = "";
  const characters = "0123456789abcdef";

  for (let i = 0; i < 8; i++) {
    id += characters[Math.floor(Math.random() * characters.length)];
  }
  return id;
}
