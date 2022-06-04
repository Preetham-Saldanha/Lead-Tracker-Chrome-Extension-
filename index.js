
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delAllBtn = document.getElementById("delete-all-btn")
const delBtn = document.getElementById("delBtn")
const inputTab = document.getElementById("input-tab-btn")
let liElements = document.getElementsByTagName("li")

let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}


refreshList()

function refreshList() {
    liElements = document.getElementsByTagName("li");
    [...liElements].forEach(element => {
        element.addEventListener("click", function () {
            if (element.classList.contains("selected")) {
                element.classList.remove("selected")
            }
            else {
                element.classList.add("selected")
            }

        })
    })
}


inputBtn.addEventListener("click", function () {

    if (inputEl.value) {
        myLeads.push(inputEl.value)
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    renderLeads(myLeads)

    refreshList()

})

inputTab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })

    refreshList()
})

delAllBtn.addEventListener("click", function () {
    confirmFlag = confirm("are you sure you want to delete all the leads?")
    if (confirmFlag) {
        ulEl.innerHTML = ""
        myLeads = []
        localStorage.clear()
        refreshList()
    }
})



delBtn.addEventListener("click", function () {
    //const selectedTags = document.getElementsByClassName("selected")

    // const selArr = [...selectedTags]
    const childList = [...ulEl.childNodes]
    let newLeads = []

    for (let i = 0; i < childList.length; i++) {

        if (childList[i].classList.contains("selected")) {

            ulEl.removeChild(childList[i])
            continue
        }
        newLeads.push(childList[i].textContent)

    }
    myLeads = newLeads
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    refreshList()
    //renderLeads(myLeads)
}
)

function renderLeads(Leads) {
    let temp = document.createElement("ul")

    for (let i = 0; i < Leads.length; i++) {
        let list = document.createElement("li")
        list.class = "list"
        list.id = Leads[i + 1]
        list.textContent = Leads[i]
        temp.appendChild(list)
    }

    ulEl.innerHTML = temp.innerHTML
    // liElements = document.getElementsByTagName("li")
}


//ulEl.addEventListener("click", selectListElement)



