const baseUrl = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,subregion,borders,languages,currencies,tld"

async function getAllCountries() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const countries = getAllCountries()

console.log(countries)