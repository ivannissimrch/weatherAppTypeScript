import { getWeatherInfo } from "./getWeatherInfo";
import "./style.css";

const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Cannot find an element with ID \"app\"");
}
appElement.innerHTML = `
  <main>
  <form >
  <input type='text'  id='enteredUserInput' placeholder='enter city name'>  
 
  </form>
  <section id ='results'> 
  <p id='displayWeather'></p> 
  </section>
  </main>
`;

const formElement = document.getElementsByTagName("form")[0];
if (!formElement) {
  throw new Error("Cannot find form element");
}
const cityNameInput =
  document.getElementById("enteredUserInput") as HTMLInputElement | null;
if (!cityNameInput) {
  throw new Error("Cannot find an element with ID \"enteredUserInput\"");
}

const displayWeatherInfo = document.getElementById(
  "displayWeather"
) as HTMLParagraphElement | null;
if (!displayWeatherInfo) {
  throw new Error("Cannot find an element with ID \"displayWeather\"");
}

formElement.addEventListener(
  "submit",
  async (event: SubmitEvent) => {
    try {
      event.preventDefault();
      const cityEntered = cityNameInput.value;
      cityNameInput.value = "";
      const receivedweatherData = await getWeatherInfo(cityEntered);

      if (receivedweatherData) {
        const { city, temp, weather } = receivedweatherData;
        displayWeatherInfo.innerHTML = `${city} Temperature: ${temp} Weather Conditions: ${weather}`;
      }
    } catch (error) {
      displayWeatherInfo.innerHTML = `City not found, please try again`;
    }
  }
);
