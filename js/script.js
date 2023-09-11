//variáveis e seleção
const apiKey = "773eefcff22b068cd4d33d6146a35b9a"
const apiCountryFlag = "https://flagsapi.com/BR/flat/64.png"
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = window.document.querySelector('#city-input')
const searchBtn = window.document.querySelector('#search')

const cityElement = document.querySelector('#city')
const countryElement = document.querySelector('#country')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')
const weatherContainer = document.querySelector('#weather-data')
const weatherError = document.querySelector('#error')
const loader = document.querySelector('#loader')
const suggestionsContainer = document.querySelector('#suggestions')
const suggestionsBtn = document.querySelectorAll('#suggestions button')


//funções

//solicitação a api
const getWeatherData = async(city) => {

    toggleLoader()

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(data)
    
    toggleLoader()
    weatherContainer.classList.remove('hide')

    return data

}

//mostra os resultados na tela
const showWeatherData = async(city) => {
    const data = await getWeatherData(city)
    hideInformation()
    
    if (data.cod == 404) {  //se não for encontrado
        weatherError.innerHTML = 'Não foi possível encontrar essa cidade'
        hideInformation()
        weatherError.classList.remove('hide')
    } else {
        cityElement.innerHTML = data.name
        countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        tempElement.innerHTML = parseInt(data.main.temp)
        const descFirst = data.weather[0].description.charAt(0).toUpperCase()
        const description = descFirst + data.weather[0].description.slice(1)
        descElement.innerHTML = description
        weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        umidityElement.innerHTML = data.main.humidity
        windElement.innerHTML = parseInt(data.wind.speed)
        //mudando o bg
        document.body.style.backgroundImage = `url("${apiUnsplash} + ${city}")`
        weatherContainer.classList.remove('hide')
    }
}

//alternando o loader
const toggleLoader = () => {
    loader.classList.toggle('hide')
}

//escondendo
const hideInformation = () => {
    weatherContainer.classList.add('hide')
    weatherError.classList.add('hide')
    suggestionsBtn.forEach((btn) => {
        btn.classList.add('hide')
    })
}

//eventos

//quando clicar no btn
searchBtn.addEventListener("click", (e) => {
    e.preventDefault
    
    const city = cityInput.value

    showWeatherData(city)
})

//quando clicar em enter
cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = cityInput.value
        
        showWeatherData(city)
    }
})

//sugestões
suggestionsBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute('id')
        showWeatherData(city)
    })
});