const start = () => {
  console.log('[#] App creada por gusstavo-renteria')
}
window.onload = start

// ? Elementos de formulario
const form = document.getElementById('weather-form')
const entry = document.getElementById('country-text')

// ? Tarjeta de información
const weather_info = document.getElementById('weather-info')

// ? Sección de resultados exitosos
const search_result = document.getElementById('search-result')
// ? Sección de resultados no encontrados
const not_found = document.getElementById('not-found')

//
// * llamada a la API
const search = async ( country ) => {
  const API = 'e47e5c8d61d75429f0e10d722c33f4ff'
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ country }&units=metric&appid=${ API }`

  const res = await (await fetch(URL)).json()
  return res
}

//
// * Configurar datos de la tarjeta de información
const setDataCard = (data) => {
  /**
   * @param { object } data datos sobre el clima
   */

  const result_imge = document.querySelector('#search-result img')
  const result_temp = document.querySelector('#temperature span')
  const result_desc = document.getElementById('description')
  const result_humd = document.querySelector('.weather-details .humidity .text span')
  const result_wind = document.querySelector('.weather-details .wind .text span')

  result_temp.innerHTML = Math.floor(data.main.temp)
  result_humd.innerHTML = `${ data.main.humidity }%`
  result_wind.innerHTML = `${ data.wind.speed.toFixed(1) }km/h`

  switch(data.weather[0].main) {
    case 'Clear':
      result_imge.src = 'images/clear.png'
      result_desc.innerHTML = 'Limpio'
      break
    case 'Clouds':
      result_imge.src = 'images/cloud.png'
      result_desc.innerHTML = 'Nublado'
      break
    case 'Mist':
      result_imge.src = 'images/mist.png'
      result_desc.innerHTML = 'Neblina'
      break
    case 'Rain':
      result_imge.src = 'images/rain.png'
      result_desc.innerHTML = 'Lluvia'
      break
    case 'Snow':
      result_imge.src = 'images/snow.png'
      result_desc.innerHTML = 'Nevando'
      break
    default:
      break
  }
}

//
// * (Activar | Desactivar) vista de información sobre el clima
const viewInfo = (active, data) => {
  /**
   * @param { boolean } active  (activar | desactivar) vista de información
   * @param { object  } data    datos sobre el clima
   */

  if(active) {
    weather_info.classList.add('active')

    if(data.cod == 200) {
      console.log(`[+](${ data.cod })`) // ? msg en consola
      not_found.style.display = 'none'
      search_result.style.display = 'grid'

      // ? configurar datos en caso de tener una respuesta exitosa
      setDataCard(data)
      // ==========

    }else if(data.cod == 404) {
      console.log(`[-](${ data.cod })`) // ? msg en consola
      search_result.style.display = 'none'
      not_found.style.display = 'grid'
    }
  }else {
    // ? desactivar vistas
    weather_info.classList.remove('active')
    search_result.style.display = 'none'
    not_found.style.display = 'none'
  }
}

//
// * Eventos de Formulario
const handleForm = async (e) => {
  e.preventDefault()
  entry.blur()

  const { country } = form
  const current_search = country.value?.trim().toLowerCase()
  
  if(!current_search) return // ? comprobar si hay texto

  const data = await search(country.value)
  viewInfo(true, data)
}
form.onsubmit = handleForm

//
// * Eventos de entrada
const onInputEntry = (e) => {
  if(e.target.value === '') {
    viewInfo(false)
  }
}
entry.oninput = onInputEntry 