document.addEventListener("DOMContentLoaded", async () => { // why is this necessary?
  console.log("App ready");

  const countries = await getAllCountries();

  countries.sort((a, b) => // how does this work??
    a.name.common.localeCompare(b.name.common)
  );

  renderCountries(countries);
});
