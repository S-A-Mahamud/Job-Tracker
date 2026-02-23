let interviewList = [];
let rejectedList = [];
let currentFilter = "all";

const totalJobsElement = document.querySelectorAll(".jobCount");
const selectedJobCountElement = document.getElementById("selectedJobCount");
const selectedJobText = document.getElementById("selectedJobText");
const interviewJobsElement = document.getElementById("interviewJobs");
const rejectedJobsElement = document.getElementById("rejectedJobs");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardsContainer = document.getElementById("allCardsContainer");
const mainContainer = document.querySelector("main");
const filteredJobsSection = document.getElementById("filteredJobsSection");


function updateJobCounters() {

    const totalJobs = allCardsContainer.children.length;

    // Header total count
    totalJobsElement.forEach(element => {
        element.textContent = totalJobs;
    });

    interviewJobsElement.textContent = interviewList.length;
    rejectedJobsElement.textContent = rejectedList.length;

    // Selected job text update
    if (currentFilter === "all") {
        selectedJobText.innerHTML =
            `<span class="font-bold">${totalJobs}</span> jobs`;
    }
    else if (currentFilter === "interview") {
        selectedJobText.innerHTML =
            `<span class="font-bold">${interviewList.length}</span> of ${totalJobs} jobs`;
    }
    else if (currentFilter === "rejected") {
        selectedJobText.innerHTML =
            `<span class="font-bold">${rejectedList.length}</span> of ${totalJobs} jobs`;
    }
}

updateJobCounters();


//Active button toggle functionality and show/hide sections based on active button
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

    // Show/hide sections based on active button
    if (activeButton.id == 'interview-filter-btn') {
        allCardsContainer.classList.add('hidden');
        filteredJobsSection.classList.remove('hidden');
        createInterviewJobCard();
        currentFilter = "interview";
        updateJobCounters();
    } else if (activeButton.id == 'all-filter-btn') {
        allCardsContainer.classList.remove('hidden');
        filteredJobsSection.classList.add('hidden');
        currentFilter = "all";
        updateJobCounters();
    } else if (activeButton.id == 'rejected-filter-btn') {
        allCardsContainer.classList.add('hidden');
        filteredJobsSection.classList.remove('hidden');
        createRejectedJobCard();
        currentFilter = "rejected";
        updateJobCounters();
    }
}

// Event listener for main section to handle interview and reject button clicks
mainContainer.addEventListener("click", function (event) {
    // Check if the clicked element is an interview or reject button
    if (event.target.classList.contains("interview-btn")) {
        const card = event.target.parentNode.parentNode;
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;
        const salary = card.querySelector(".salary").textContent;
        const status = card.querySelector(".status").textContent;
        const details = card.querySelector(".details").textContent;

        card.querySelector(".status").textContent = "INTERVIEW";

        const cardInfo = {
            companyName,
            designation,
            salary,
            status: "INTERVIEW",
            details
        };
        const interviewExists = interviewList.find(card => card.companyName === companyName && card.designation === designation);
        if (!interviewExists) {
            interviewList.push(cardInfo);
            const rejectedIndex = rejectedList.findIndex(card => card.companyName === companyName && card.designation === designation);
            if (rejectedIndex !== -1) {
                rejectedList.splice(rejectedIndex, 1);
            }
        }

        //remove from rejected list if exists
        rejectedList = rejectedList.filter(card => !(card.companyName === companyName && card.designation === designation));

        if (currentFilter === "rejected") {
            createRejectedJobCard();
        }
        updateJobCounters();
    } else if (event.target.classList.contains("reject-btn")) {
        const card = event.target.closest(".job-card");
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;
        const salary = card.querySelector(".salary").textContent;
        const status = card.querySelector(".status").textContent;
        const details = card.querySelector(".details").textContent;

        card.querySelector(".status").textContent = "REJECTED";

        const cardInfo = {
            companyName,
            designation,
            salary,
            status: "REJECTED",
            details
        };
        const rejectedExists = rejectedList.find(card => card.companyName === companyName && card.designation === designation);
        if (!rejectedExists) {
            rejectedList.push(cardInfo);
        }

        //remove from interview list if exists
        interviewList = interviewList.filter(card => !(card.companyName === companyName && card.designation === designation));
        if (currentFilter === "interview") {
            createInterviewJobCard();;
        }
        updateJobCounters();
    }
}
);

// Function to create job cards based on the interviewList
function createInterviewJobCard() {
    filteredJobsSection.innerHTML = ""; // Clear previous cards

    for (const interview of interviewList) {

        let div = document.createElement("div");
        div.classList = 'job-card flex flex-col md:flex-row justify-between border p-4 bg-white rounded-lg mt-4';
        div.innerHTML = `
            <div class="space-y-4">
                        <h3 class="company-name text-2xl font-semibold">${interview.companyName}</h3>
                        <p class="designation font-light">${interview.designation}</p>
                        <p class="salary font-light">${interview.salary}</p>
                        <button class="status bg-gray-100 p-2 font-bold">${interview.status}</button>
                        <p class="details font-medium">${interview.details}</p>
                        <div class="flex gap-2 mt-2">
                            <button
                                class="interview-btn text-green-600 border border-green-600 text-lg py-2 px-2 rounded cursor-pointer">INTERVIEW</button>
                            <button
                                class="reject-btn text-red-600 border border-red-600 text-lg py-2 px-2 rounded cursor-pointer">REJECTED</button>
                        </div>
                    </div>
                    
                     <div>
                        <button
                            class="delete-btn bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4 md:mt-0">Delete</button>
                    </div>
    `;
        filteredJobsSection.appendChild(div);
    }

}

// Function to create job cards based on the rejectedList
function createRejectedJobCard() {
    filteredJobsSection.innerHTML = ""; // Clear previous cards

    for (const rejected of rejectedList) {

        let div = document.createElement("div");
        div.classList = 'job-card flex flex-col md:flex-row justify-between border p-4 bg-white rounded-lg mt-4';
        div.innerHTML = `
            <div class="space-y-4">
                        <h3 class="company-name text-2xl font-semibold">${rejected.companyName}</h3>
                        <p class="designation font-light">${rejected.designation}</p>
                        <p class="salary font-light">${rejected.salary}</p>
                        <button class="status bg-gray-100 p-2 font-bold">${rejected.status}</button>
                        <p class="details font-medium">${rejected.details}</p>
                        <div class="flex gap-2 mt-2">
                            <button
                                class="interview-btn text-green-600 border border-green-600 text-lg py-2 px-2 rounded cursor-pointer">INTERVIEW</button>
                            <button
                                class="reject-btn text-red-600 border border-red-600 text-lg py-2 px-2 rounded cursor-pointer">REJECTED</button>
                        </div>
                    </div>
                    
                     <div>
                        <button
                            class="delete-btn bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4 md:mt-0">Delete</button>
                    </div>
    `;
        filteredJobsSection.appendChild(div);
    }
}