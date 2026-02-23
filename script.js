let interviewList = [];
let rejectedList = [];

const totalJobsElement = document.querySelectorAll(".jobCount");
const interviewJobsElement = document.getElementById("interviewJobs");
const rejectedJobsElement = document.getElementById("rejectedJobs");

const allCardsConttainer = document.getElementById("allCardsContainer");

function updateJobCounters() {
    totalJobsElement.forEach(element => {
        element.textContent = allCardsConttainer.children.length;
    });
    interviewJobsElement.textContent = interviewList.length;
    rejectedJobsElement.textContent = rejectedList.length;
}

// Initialize counters
updateJobCounters();

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");


function toggleActiveButton(activeButton) {
    const filterButtons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];

    filterButtons.forEach(button => {
        // all active class remove
        button.classList.remove("bg-blue-500");

        // all default class add
        button.classList.add("bg-gray-500");
    });

    // add class for active button
    activeButton.classList.remove("bg-gray-500");
    activeButton.classList.add("bg-blue-500");
}