const button = document.querySelector('[data-add-button]')
const list = document.querySelector('[data-list]')
const categoriesList = document.querySelector('[data-categories]')
const buttonAddCategory = document.querySelector('[data-add-category]')
const categoryTitle = document.querySelector('[data-category-title]')

const categories = [
    // {
    //     id: 1,
    //     category:"Tarefas de Casa",
    //     items: [
    //         {
    //             id: 1,                
    //             item: "",
    //             checked: true,
    //         }
    //     ],
    // },
]

const createItemList = (id) => {
    const item = document.createElement('li')
    item.setAttribute('data-item', id)
    item.classList.add('item')
    item.innerHTML = `
        <input class="checkbox" type="checkbox" id="item-${id}"/>
    `

    const label = document.createElement('label')
    label.setAttribute('for', `item-${id}`)
    label.classList.add('card')
    label.innerHTML = `
        <div class="checkField">
            <img class="image" src="./Icons/checkmark.png"/>
        </div>
        <input class="checkbox__text" />
    `

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButton')
    deleteButton.innerHTML = '<img src="./Icons/closeIcon.svg"/>'
    deleteButton.addEventListener('click', () => {
        const itemToBeRemoved = document.querySelector(`[data-item="${id}"]`)
        itemToBeRemoved.remove()
    })
    
    label.appendChild(deleteButton)
    item.appendChild(label)
    return item
    
}

button.addEventListener('click', () => {
    const newId = list.childElementCount + 1
    const element = createItemList(newId)
    list.prepend(element)

    const inputField = element.querySelector('.checkbox__text');
    inputField.focus();
})

// -------------------------------------------------------------------------------------------------------

const handleActiveCategory = (categoryElement, currentCategory) => {
    categoriesList.childNodes.forEach((categoryNode) => {
        if(categoryNode.classList) {
            categoryNode.querySelector('.navBar__category').classList.remove('navBar__category--active')
            categoryTitle.innerHTML = currentCategory.category
        }
    })
    categoryElement.querySelector('.navBar__category').classList.add('navBar__category--active')
}

const createCategoryElement = (element) => {
    const categoryElement = document.createElement('li')
    const currentCategory = categories.find((category) => category.id === element.id)

    const categoryInput = document.createElement('input')
    categoryInput.classList.add('navInput')
    categoryInput.addEventListener('keyup', (e) => {
        currentCategory.category = e.target.value
    })
    categoryElement.appendChild(categoryInput)
    categoryElement.addEventListener('click', () => handleActiveCategory(categoryElement, currentCategory))
    
    const categoryButton = document.createElement('button')
    categoryButton.innerHTML = `
        <span class="navBar__category__counter">1/4</span>
    `
    categoriesList.childNodes.forEach((categoryNode) => {
        if(categoryNode.classList) {
            categoryNode.querySelector('.navBar__category').classList.remove('navBar__category--active')
            categoryTitle.innerHTML = currentCategory.category
        }
    })
    
    categoryButton.classList.add('navBar__category')
    categoryButton.classList.add('navBar__category--active')
    categoryButton.prepend(categoryInput)
    categoryElement.appendChild(categoryButton)

    return categoryElement
}

const handleAddCategory = () => {
    const newId = categoriesList.childElementCount + 1
    const newCategory = {        
        id: newId,
        category: '',
        items: []
    }
    categories.push(newCategory)
    const  categoryElement = createCategoryElement(newCategory)
    categoriesList.appendChild(categoryElement)
    console.log(newCategory)
}

buttonAddCategory.addEventListener('click', handleAddCategory)

