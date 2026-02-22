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