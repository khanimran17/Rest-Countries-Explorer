const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.flag-img');
const borderCountries = document.querySelector('.border-countries');
const lightMode = document.querySelector('.light-mode');
const darkMode = document.querySelector('.dark-mode');
const navBar = document.querySelector('.nav-bar');
const mode = document.querySelectorAll('.mode');
const body = document.querySelector('body');
const moreDetail = document.querySelector('.more-info')
const backBtn = document.querySelector('.back');

darkMode.addEventListener('click', () => {
    localStorage.setItem('isDarkModeActive', 'true')
    lightMode.classList.remove('hidden');
    darkMode.classList.add('hidden');
    darkModeEnabled()
})
lightMode.addEventListener('click', () => {
    localStorage.setItem('isDarkModeActive', 'false')
    lightMode.classList.add('hidden');
    darkMode.classList.remove('hidden');
    lightModeEnabled()
})

function darkModeEnabled() {
    navBar.classList.add('dark-theme');
    navBar.firstElementChild.firstElementChild.classList.add('dark-theme-text');
    mode[1].classList.add('dark-theme-text');
    body.classList.add('dark-bg');
    moreDetail.classList.add('dark-theme-text')
    backBtn.classList.add('dark-theme-text', 'dark-theme')
}

function lightModeEnabled() {
    navBar.classList.remove('dark-theme');
    navBar.firstElementChild.firstElementChild.classList.remove('dark-theme-text');
    body.classList.remove('dark-bg');
    moreDetail.classList.remove('dark-theme-text')
    backBtn.classList.remove('dark-theme-text', 'dark-theme')
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isDarkModeActive') === 'true') {
        lightMode.classList.remove('hidden');
        darkMode.classList.add('hidden');
        darkModeEnabled()
    } else {
        lightMode.classList.add('hidden');
        darkMode.classList.remove('hidden');
        lightModeEnabled()
    }
})

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then(([data]) => {
        //flag img
        if (data.flags.png) {
            flagImage.src = data.flags.png;
        }
        // country name
        if (data.name.common) {
            flagImage.parentElement.nextElementSibling.children[0].innerText =
                data.name.common;
        }
        // native name
        if (Object.values(data.name.nativeName)[0].common) {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.firstElementChild.innerHTML = `<b>Native Name:</b> ${Object.values(data.name.nativeName)[0].common
                }`;
        }
        // population
        const commaSeparatedPopulation = data.population.toLocaleString();
        if (commaSeparatedPopulation) {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.firstElementChild.nextElementSibling.innerHTML = `<b>Population:</b> ${commaSeparatedPopulation}`;
        }
        // region
        if (data.region) {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `<b>Region:</b> ${data.region}`;
        } else {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `<b>Region:</b> No Region`;
        }

        //sub-region
        if (data.subregion) {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `<b>Sub Region:</b> ${data.subregion}`;
        } else {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `<b>Sub Region:</b> No Sub-Region`;
        }
        // for capital
        if (data.capital) {
            flagImage.parentElement.nextElementSibling.children[1].firstElementChild.lastElementChild.innerHTML = `<b>Capital:</b> ${data.capital}`;
        }
        // top level domain
        if (data.tld) {
            flagImage.parentElement.nextElementSibling.children[1].lastElementChild.firstElementChild.innerHTML = `<b>Top Level Domain:</b> ${data.tld}`;
        }
        // currencies
        if (Object.values(data.currencies)[0].name) {
            flagImage.parentElement.nextElementSibling.children[1].lastElementChild.firstElementChild.nextElementSibling.innerHTML = `<b>Currencies:</b> ${Object.values(data.currencies)[0].name
                }`;
        }
        // languages
        if (Object.values(data.languages).join(', ')) {
            flagImage.parentElement.nextElementSibling.children[1].lastElementChild.lastElementChild.innerHTML = `<b>Languages:</b> ${Object.values(
                data.languages
            ).join(', ')}`;
        }
        //border countries
        if (data.borders) {
            data.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountryData]) => {
                        const borderCountry = document.createElement('a');
                        borderCountry.classList.add('border-countries-btn');
                        borderCountry.innerText = borderCountryData.name.common;
                        borderCountries.append(borderCountry);
                        borderCountry.href = `detail.html?name=${borderCountryData.name.common}`

                        darkMode.addEventListener('click', () => {
                            borderCountry.classList.add('dark-theme')
                            borderCountry.style.color = 'white'
                        })
                        lightMode.addEventListener('click', () => {
                            borderCountry.classList.remove('dark-theme')
                            borderCountry.style.color = 'black'
                        })

                        if (localStorage.getItem('isDarkModeActive') === 'true') {
                            borderCountry.classList.add('dark-theme')
                            borderCountry.style.color = 'white'
                        } else {
                            borderCountry.classList.remove('dark-theme')
                            borderCountry.style.color = 'black'
                        }
                        
                    })
                    .catch(err => console.log(err));
            });
        } else {
            borderCountries.innerHTML = `<b>Border Countries:</b> ${data.name.common} Is Not Surrounded With Borders`;
        }
    })
    .catch(err => console.log(err));