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
            `<span class="font-bold text-green-600">${interviewList.length}</span> of <span class="font-bold">${totalJobs}</span> jobs`;
    }
    else if (currentFilter === "rejected") {
        selectedJobText.innerHTML =
            `<span class="font-bold text-red-600">${rejectedList.length}</span> of <span class="font-bold">${totalJobs}</span> jobs`;
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
    activeButton.classList.add("bg-blue-500", "hover:bg-blue-600");

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
        const card = event.target.closest(".job-card");
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;
        const salary = card.querySelector(".salary").textContent;
        const status = card.querySelector(".status").textContent;
        const details = card.querySelector(".details").textContent;

        card.querySelector(".status").textContent = "INTERVIEW";

        // after updating filtered card
        let originalCard = null;

        for (const c of allCardsContainer.children) {
            const name = c.querySelector(".company-name").textContent;
            const desig = c.querySelector(".designation").textContent;

            if (name === companyName && desig === designation) {
                originalCard = c;
                break;
            }
        }
        if (originalCard) {
            originalCard.querySelector(".status").innerHTML = `<button class="status bg-green-200 font-bold text-green-500">INTERVIEW</button>`;
        }

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

        let originalCard = null;

        for (const c of allCardsContainer.children) {
            const name = c.querySelector(".company-name").textContent;
            const desig = c.querySelector(".designation").textContent;

            if (name === companyName && desig === designation) {
                originalCard = c;
                break;
            }
        }

        if (originalCard) {
            originalCard.querySelector(".status").innerHTML = `<button class="status bg-red-200 font-bold text-red-500 ">REJECTED</button>`;
        }

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
    } else if (event.target.classList.contains("delete-btn")) {

        const card = event.target.closest(".job-card");
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;

        // Remove from main DOM (if exists there)
        for (const mainCard of allCardsContainer.children) {
            const mainName = mainCard.querySelector(".company-name").textContent;
            const mainDesignation = mainCard.querySelector(".designation").textContent;

            if (mainName === companyName && mainDesignation === designation) {
                mainCard.remove();
                break;
            }
        }

        // Remove from interviewList
        interviewList = interviewList.filter(c =>
            !(c.companyName === companyName && c.designation === designation)
        );

        // Remove from rejectedList
        rejectedList = rejectedList.filter(c =>
            !(c.companyName === companyName && c.designation === designation)
        );

        // Refresh filtered section if needed
        if (currentFilter === "interview") {
            createInterviewJobCard();
        }

        if (currentFilter === "rejected") {
            createRejectedJobCard();
        }

        // Update counters
        updateJobCounters();
    }
}
);



// Function to create job cards based on the interviewList
function createInterviewJobCard() {
    filteredJobsSection.innerHTML = ""; // Clear previous cards

    if (interviewList.length === 0) {
        filteredJobsSection.innerHTML = `
        <div class="text-center mt-18 border border-green-600 bg-white p-6 rounded-lg">
            <img src="./jobs.png" alt="No Interview Jobs" class="mx-auto w-24 opacity-50">
        <h2 class="text-center mt-4">No jobs available</h2>
        <p class="text-center mt-2 text-gray-500">Check back soon for new job opportunities</p>
        </div> `;
        return;
    }

    for (const interview of interviewList) {

        let div = document.createElement("div");
        div.classList.add('job-card', 'border', 'border-green-600', 'p-4', 'bg-white', 'rounded-lg', 'hover:shadow-xl',
            'hover:shadow-green-500/40',
            'hover:scale-[1.02]',
            'transition-all',
            'duration-300',
            'mb-4');
        div.innerHTML = `
            <div class="space-y-2">
                          <div class="flex items-center justify-between gap-4">
                            <h3 class="company-name text-2xl font-semibold">${interview.companyName}</h3>

                            <div class="relative group inline-block">
                                <button
                                    class="delete-btn bg-gray-200 text-red-500 font-bold p-2 cursor-pointer mt-0 rounded-lg">
                                    <i class="delete-btn fa-solid fa-trash 
                                    transform 
                                    hover:scale-150 
                                    transition-transform 
                                    duration-300 
                                    ease-in-out"></i>
                                </button>

                                <span class="absolute top-0.5 right-2.5 -translate-x-1/2 
                              bg-gray-200 text-red-600 font-bold text-xs
                                px-2 py-2 rounded-xl
                                opacity-0 group-hover:opacity-100
                                transition-all duration-300
                                whitespace-nowrap">

                                    Delete Job

                                    <!-- Tooltip Arrow -->
                                    <span class="absolute left-full top-1/2 -translate-y-1/2 -translate-x-1/2
                                    w-2.5 h-2.5 bg-gray-200
                                    rotate-45"></span>
                                </span>
                            </div>
                        </div>
                        <p class="designation font-light">${interview.designation}</p>
                        <p class="salary font-light">${interview.salary}</p>
                         
                         <button class="status bg-green-200 font-bold text-green-500 p-2 rounded">${interview.status}</button>
                        <p class="details font-medium">${interview.details}</p>
                        <div class="flex gap-2 mt-2">
                            <button
                                class="interview-btn  text-lg py-2 px-2 rounded cursor-pointer
                                relative overflow-hidden  
                                border border-green-500 text-green-600 font-semibold
                                transition duration-300 
                                before:absolute before:inset-0
                              before:bg-green-100
                                before:origin-left
                                before:scale-x-0
                                before:transition-transform
                                before:duration-300
                                hover:before:scale-x-100
                                before:-z-10 
                                ">INTERVIEW</button>
                            <button
                                class="reject-btn text-lg py-2 px-2 rounded cursor-pointer                              
                                relative overflow-hidden  
                                border border-red-500 text-red-600 font-semibold
                                transition duration-300 
                                before:absolute before:inset-0
                              before:bg-red-100
                                before:origin-right
                                before:scale-x-0
                                before:transition-transform
                                before:duration-300
                                hover:before:scale-x-100
                                before:-z-10">REJECTED</button>
                        </div>
                    </div>
    `;
        filteredJobsSection.appendChild(div);
    }

}

// Function to create job cards based on the rejectedList
function createRejectedJobCard() {
    filteredJobsSection.innerHTML = ""; // Clear previous cards

    if (rejectedList.length === 0) {
        filteredJobsSection.innerHTML = `
        <div class="text-center mt-18 border border-red-600 bg-white p-6 rounded-lg">
            <img src="./jobs.png" alt="No Rejected Jobs" class="mx-auto w-24 opacity-50">
        <h2 class="text-center mt-4">No jobs available</h2>
        <p class="text-center mt-2 text-gray-500">Check back soon for new job opportunities</p>
        </div>
        `;
        return;
    }

    for (const rejected of rejectedList) {

        let div = document.createElement("div");
        div.classList.add('job-card', 'border', 'border-red-600', 'p-4', 'bg-white', 'rounded-lg', 'hover:shadow-xl',
            'hover:shadow-red-500/40',
            'hover:scale-[1.02]',
            'transition-all',
            'duration-300',
            'mb-4');
        div.innerHTML = `
            <div class="space-y-2">
                          <div class="flex items-center justify-between gap-4">
                            <h3 class="company-name text-2xl font-semibold">${rejected.companyName}</h3>

                            <div class="relative group inline-block">
                                <button
                                    class="delete-btn bg-gray-200 text-red-500 font-bold p-2 cursor-pointer mt-0 rounded-lg">
                                    <i class="delete-btn fa-solid fa-trash 
                                    transform 
                                    hover:scale-150 
                                    transition-transform 
                                    duration-300 
                                    ease-in-out"></i>
                                </button>

                                <span class="absolute top-0.5 right-2.5 -translate-x-1/2 
                              bg-gray-200 text-red-600 font-bold text-xs
                                px-2 py-2 rounded-xl
                                opacity-0 group-hover:opacity-100
                                transition-all duration-300
                                whitespace-nowrap">

                                    Delete Job

                                    <!-- Tooltip Arrow -->
                                    <span class="absolute left-full top-1/2 -translate-y-1/2 -translate-x-1/2
                                    w-2.5 h-2.5 bg-gray-200
                                    rotate-45"></span>
                                </span>
                            </div>
                        </div>
                        <p class="designation font-light">${rejected.designation}</p>
                        <p class="salary font-light">${rejected.salary}</p>
                        <button class="status bg-red-200 font-bold text-red-500 p-2 rounded">${rejected.status}</button>
                        <p class="details font-medium">${rejected.details}</p>
                        <div class="flex gap-2 mt-2">
                            <button
                                class="interview-btn text-lg py-2 px-2 rounded cursor-pointer                                 
                                relative overflow-hidden  
                                border border-green-500 text-green-600 font-semibold
                                transition duration-300 
                                before:absolute before:inset-0
                              before:bg-green-100
                                before:origin-left
                                before:scale-x-0
                                before:transition-transform
                                before:duration-300
                                hover:before:scale-x-100
                                before:-z-10">INTERVIEW</button>
                            <button
                                class="reject-btn text-lg py-2 px-2 rounded cursor-pointer 
                                relative overflow-hidden  
                                border border-red-500 text-red-600 font-semibold
                                transition duration-300 
                                before:absolute before:inset-0
                              before:bg-red-100
                                before:origin-right
                                before:scale-x-0
                                before:transition-transform
                                before:duration-300
                                hover:before:scale-x-100
                                before:-z-10
                                ">REJECTED</button>
                        </div>
                    </div>
    `;
        filteredJobsSection.appendChild(div);
    }
}