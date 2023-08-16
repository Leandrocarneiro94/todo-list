const button = document.querySelector('[data-add-button]')
const list = document.querySelector('[data-list]')

const createItemList = (id) => {
    const item = document.createElement('li')
    item.setAttribute('data-item', id)
    item.classList.add('item')
    item.innerHTML = `
        <input class="checkbox" type="checkbox" id="item-${id}"/>
    `

    const label = document.createElement('label')
    label.innerHTML = `
        <div class="checkField">
            <img class="image" src="./Icons/checkmark.png"/>
        </div>
        <input class="checkbox__text" />
    `
    label.setAttribute('for', `item-${id}`)
    label.classList.add('card')

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
    list.append(element)

    const inputField = element.querySelector('.checkbox__text');
    inputField.focus();
})


