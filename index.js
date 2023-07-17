let myLeads = []
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads))

inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deleteBtn.addEventListener("dblclick", () => {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({currentWindow : true , active : true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        listItems += `
                    <li>
                        <a href = ${leads[i]}>
                        ${leads[i]}
                        </a>
                    </li>
    `
    }
    ulEl.innerHTML = listItems
}