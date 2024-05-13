import { getWeatherInfo } from "./getWeatherInfo";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
  <form >
  <input type='text'  id='enteredUserInput' placeholder='enter city name'>  
 
  </form>
  <section id ='results'> 
  <p id='displayWeather'></p> 
  </section>
  </main>
`;

let cityNameInput: HTMLInputElement | null =
  document.querySelector("#enteredUserInput");
let displayWeatherInfo = document.getElementById(
  "displayWeather"
) as HTMLParagraphElement;
let receivedweatherData: { city: string; weather: string; temp: string } | null;

cityNameInput?.addEventListener(
  "keydown",
  async (event: KeyboardEvent): Promise<void> => {
    if (event.key === "Enter") {
      try {
        event.preventDefault();
        let cityEntered = cityNameInput.value;
        cityNameInput.value = "";
        receivedweatherData = await getWeatherInfo(cityEntered);

        if (receivedweatherData) {
          const { city, temp, weather } = receivedweatherData;
          displayWeatherInfo.innerHTML = `${city} Temperature: ${temp} Weather Conditions: ${weather}`;
        }
      } catch (error) {
        displayWeatherInfo.innerHTML = `City not found, please try again`;
      }
    }
  }
);
