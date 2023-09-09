//variáveis e seleção
const apiKey = "773eefcff22b068cd4d33d6146a35b9a"
const apiCountryFlag = "https://flagsapi.com/BR/flat/64.png"

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


//funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(data)

    return data

}

const showWeatherData = async(city) => {
    const data = await getWeatherData(city)

    cityElement.innerHTML = data.name
    countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    tempElement.innerHTML = parseInt(data.main.temp)
    const descFirst = data.weather[0].description.charAt(0).toUpperCase()
    const description = descFirst + data.weather[0].description.slice(1)
    descElement.innerHTML = description
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    umidityElement.innerHTML = data.main.humidity
    windElement.innerHTML = parseInt(data.wind.speed)
}

//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault

    weatherContainer.classList.remove('hide')
    
    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = cityInput.value
        weatherContainer.classList.remove('hide')
        showWeatherData(city)
    }
})