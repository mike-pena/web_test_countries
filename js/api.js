const baseUrl = "https://restcountries.com/v3.1"

async function getAllCountries() {
    try {
        const response = await fetch(`${baseUrl}/all?fields=name,region,cca3,population,capital,flags`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getCountryByCode(code) {
    try {
        const response = await fetch(`${baseUrl}/alpha/${code}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}