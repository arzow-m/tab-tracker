let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// rendering the unordered list
function render(leads){
    listItems = ""
    for (let i = 0; i < leads.length; i++){
        // Wrap the link in <a> to make it clickable
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // local storage only supports strings
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

tabBtn.addEventListener("click", function(){    
    // we only want the tab active tab and in the current window at once
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // the return variable should only have one entry
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})