let cards = document.querySelector('#cards')
let form = document.querySelector('#form')
let form_input = document.querySelector('#form-input')
let form_submit = document.querySelector('#form-submit')
let menu_links = document.querySelectorAll('.menu__link')
let template = document.querySelector('#template').content
let fragment = document.createDocumentFragment()
let tag_error = document.querySelector('#tag-error')

//-----------------
let getigs = async(e, ig) => {
    e.preventDefault()

    try {
        let query = ig || form_input.value || ''

        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        let json = await res.json()
        let igs = json.meals

        if(!res.ok) throw {status: res.status}
        cards.innerHTML = ''


        if(igs === null) {
            tag_error.classList.remove('is-element-hidden')
        }
        else{
            tag_error.classList.add('is-element-hidden')

            for(let x = 1; x < igs.length; x++){

                template.querySelector('.card__thumb').src = igs[x].strMealThumb
                template.querySelector('.card__title').textContent = igs[x].strMeal
                template.querySelector('.card__instructions').textContent = igs[x].strInstructions

                for(let y = 1; y < 21; y++){
                    let s = 'strIngredient'+y

                    template.querySelector(`.card__ingredient:nth-of-type(${y})`).textContent = igs[x][s]

                    if(!igs[x][s])
                        template.querySelector(`.card__ingredient:nth-of-type(${y})`).classList.add('is-recipe-hidden')
                }
                let clone = document.importNode(template, true)
                fragment.appendChild(clone)
            }

            cards.appendChild(fragment)
            let card_item = document.querySelectorAll('.card__item')
        }

    }
    catch (error) { console.log(error) }
}
//-----------------
document.addEventListener('DOMContentLoaded', getigs)
menu_links.forEach( x => x.addEventListener('click', e => {
    e.preventDefault()
    getigs(e, e.target.dataset.ig)
    form_input.value = e.target.dataset.ig
} ))
form.addEventListener('submit', getigs)
