// import files/modules

import { issueInsert } from "./issue-form.js";

// 1. declare all variables

document.querySelector(".input-section-el").innerHTML = issueInsert;

// 2. create constructor function / CLASS

class IssueObject {
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

let issueObjectArray = [];

// 4. create event listener - collect the input values

document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();

  const issue = document.getElementById("description").value;
  const priority = document.getElementById("dropdown").value;
  const date = document.getElementById("date").value;
  const assigned = document.getElementById("assigned").value;
  const assignor = document.getElementById("assignor").value;

  const newIssueArray = new IssueObject(
    issue,
    priority,
    date,
    assigned,
    assignor
  );

  // Check for duplicates based on the "ident" property
  const isDuplicate = issueObjectArray.some(
    (issueObj) => issueObj.ident === newIssueArray.ident
  );
  if (!isDuplicate) {
    issueObjectArray.push(newIssueArray);
  }

  document.getElementById("output-section-el").innerHTML = issueObjectArray
    .map(function (issue) {
      return `
      <div class="issue-box-el" data-item-id="${issue.ident}">
            <div class="issue-box-top-info">
                <p>Issue ID: ${issue.ident}</p>
                <p class="deadline-style">Deadline: ${issue.date}</p>
            </div>

            <div class="issue-box-status-el">
                <div id="job-status-id" class="job-status"><span class="job-status-span">open</span>
                </div>
                
                <div class="priority-name-el">
                <div><span class="priority-box-el">${issue.priority}</span></div>
                </div>
            </div>
            
            <h2>${issue.issue}</h2>

            <div class="assign-el">
                <div><p>Assigned to: ${issue.assigned}</p></div>
                <div><p>Assigned by: ${issue.assignor}</p></div>
            </div>

            <div class="button-el">
                <button class="close-btn">Close</button>
                <button class="delete-btn" >Delete</button>
                <button class="archive-btn">Archive</button>
            </div>
      </div>
        `;
    })
    .join("");

  clearInputs();

  // button select section
  document.addEventListener("click", function (e) {
    // delete btn below
    if (e.target.classList.contains("delete-btn")) {
      const itemId = e.target.closest(".issue-box-el").dataset.itemId;
      const itemElement = e.target.closest(".issue-box-el");
      deleteObject(itemElement);
      // alert(
      //   "You are about to delete an entry, press OK if you want to proceed with the deletion."
      // );

      // Remove object from the issueObjectArray array
      issueObjectArray = issueObjectArray.filter(
        (item) => item.ident !== itemId
      );

      // close btn below
    } else if (e.target.classList.contains("close-btn")) {
      const itemElement = e.target.closest(".issue-box-el");

      // change 'open' btn colour to orange
      itemElement
        .querySelector(".job-status-span")
        .classList.add("job-status-close");

      // change 'open' btn text to 'closed'
      itemElement.querySelector(".job-status-span").innerHTML = "Closed";

      // remove close btn from the bottom btn row
      itemElement.querySelector(".close-btn").style.display = "none";
    } else if (e.target.classList.contains("archive-btn")) {
      // archive btn code
    }
  });
});

// function to delete object

// function to delete object
function deleteObject(itemElement) {
  itemElement.remove();
}

// function to generate random ID for TASK
function generateRandomID() {
  let id = "";
  const characters = "0123456789abcdef";

  for (let i = 0; i < 8; i++) {
    id += characters[Math.floor(Math.random() * characters.length)];
  }
  return id;
}

function clearInputs() {
  const issue = (document.getElementById("description").value = "");
  const priority = (document.getElementById("dropdown").value = "");
  const date = (document.getElementById("date").value = "");
  const assigned = (document.getElementById("assigned").value = "");
  const assignor = (document.getElementById("assignor").value = "");
}
