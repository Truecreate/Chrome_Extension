let myLeads = []
let https = "https://"
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tab_btn = document.getElementById("tab_btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLead(myLeads);
}

function renderLead(leads) {
    let listItem = ""
    for(let i = 0 ; i < leads.length; i++) {
        listItem += `
            <li>
                <a href='${leads[i]}' target='_blank' >
                    ${leads[i]}
                </a>
            </li>`
    };
    ulEl.innerHTML = `${listItem}`;
};

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    renderLead(myLeads)
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
});

tab_btn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLead(myLeads)
    })
});

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    ulEl.innerHTML = "";
    myLeads = []
});