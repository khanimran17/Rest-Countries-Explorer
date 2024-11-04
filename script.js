const allCountries = document.querySelector('.all-countries');
const countrySearch = document.querySelector('.search-country');
const regionSearch = document.querySelectorAll('.dropdown-value');
const dropdown = document.querySelector('.dropdown-search');
const dropdownBox = document.querySelector('.dropdown-menu');
const label = document.querySelector('.label');
const lightMode = document.querySelector('.light-mode');
const darkMode = document.querySelector('.dark-mode');
const navBar = document.querySelector('.nav-bar');
const mode = document.querySelectorAll('.mode');
const body = document.querySelector('body');
const inputSearch = document.querySelector('.input-search');
const dropdownSearch = document.querySelector('.dropdown-search');
const searchIcon = document.querySelector('.search-icon');

darkMode.addEventListener('click', () => {
    localStorage.setItem('isDarkModeActive', 'true');
    lightMode.classList.remove('hidden');
    darkMode.classList.add('hidden');
    darkModeEnable();
});
lightMode.addEventListener('click', () => {
    localStorage.setItem('isDarkModeActive', 'false');
    lightMode.classList.add('hidden');
    darkMode.classList.remove('hidden');
    lightModeEnable();
});

function darkModeEnable() {
    navBar.classList.add('dark-theme');
    navBar.firstElementChild.firstElementChild.classList.add('dark-theme-text');
    mode[1].classList.add('dark-theme-text');
    body.classList.add('dark-bg');
    inputSearch.classList.add('dark-theme');
    dropdownSearch.classList.add('dark-theme', 'dark-theme-text');
    inputSearch.lastElementChild.classList.add('dark-theme', 'dark-theme-text');
    dropdownBox.classList.remove('bg');
    dropdownBox.classList.add('dark-theme');
    searchIcon.style.color = 'white';
    countrySearch.classList.add('search-country-dark');
}

function lightModeEnable() {
    navBar.classList.remove('dark-theme');
    navBar.firstElementChild.firstElementChild.classList.remove(
        'dark-theme-text'
    );
    body.classList.remove('dark-bg');
    inputSearch.classList.remove('dark-theme');
    dropdownSearch.classList.remove('dark-theme', 'dark-theme-text');
    inputSearch.lastElementChild.classList.remove(
        'dark-theme',
        'dark-theme-text'
    );
    dropdownBox.classList.add('bg');
    dropdownBox.classList.remove('dark-theme');
    searchIcon.style.color = '#808080';
    countrySearch.classList.remove('search-country-dark');
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isDarkModeActive') === 'true') {
        lightMode.classList.remove('hidden');
        darkMode.classList.add('hidden');
        darkModeEnable();
    } else {
        lightMode.classList.add('hidden');
        darkMode.classList.remove('hidden');
        lightModeEnable();
    }
});

dropdown.addEventListener('click', () => {
    dropdownBox.classList.toggle('hidden');
});

regionSearch.forEach((value) => {
    value.addEventListener('click', () => {
        label.firstElementChild.innerText = value.innerText;
    });
});

const countries = fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);

        // adding all country to the page
        for (let i = 0; i < data.length; i++) {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country');
            const countryFlag = document.createElement('img');
            const countryName = document.createElement('h1');
            countryName.classList.add('country-name');
            const moreDetail = document.createElement('div');
            moreDetail.classList.add('more-detail');
            const population = document.createElement('p');
            population.classList.add('population');
            const region = document.createElement('p');
            region.classList.add('region');
            const capital = document.createElement('p');
            capital.classList.add('capital');

            allCountries.append(countryCard);
            countryCard.append(countryFlag, countryName, moreDetail);
            moreDetail.append(population, region, capital);

            countryFlag.src = data[i].flags.png;
            countryName.innerText = data[i].name.common;

            const commaSeparatedPopulation =
                data[i].population.toLocaleString();

            population.innerHTML = `<b>Population:</b> ${commaSeparatedPopulation}`;
            region.innerHTML = `<b>Region:</b> ${data[i].region}`;
            capital.innerHTML = `<b>Capital:</b> ${data[i].capital}`;

            // input search functionality
            countrySearch.addEventListener('input', () => {
                const filterValue = countrySearch.value.toLowerCase();
                const filterCountryValue = data[i].name.common.toLowerCase();
                if (filterCountryValue.includes(filterValue)) {
                    countryCard.classList.remove('hidden');
                } else {
                    countryCard.classList.add('hidden');
                }
            });

            // dropdown functionality
            regionSearch.forEach((value) => {
                value.addEventListener('click', () => {
                    if (value.innerText === 'All') {
                        countryCard.classList.remove('hidden');
                    } else if (value.innerText === data[i].region) {
                        countryCard.classList.remove('hidden');
                    } else {
                        countryCard.classList.add('hidden');
                    }
                });
            });

            darkMode.addEventListener('click', () => {
                countryCard.classList.add('dark-theme', 'dark-theme-text');
            });

            lightMode.addEventListener('click', () => {
                countryCard.classList.remove('dark-theme', 'dark-theme-text');
            });

            if (localStorage.getItem('isDarkModeActive') === 'true') {
                countryCard.classList.add('dark-theme', 'dark-theme-text');
            } else {
                countryCard.classList.remove('dark-theme', 'dark-theme-text');
            }

            countryCard.addEventListener('click', () => {
                location.href = `detail.html?name=${data[i].name.common}`;
            });
        }
    })
    .catch((err) => {
        console.log(err)
    });
