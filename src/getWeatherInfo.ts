const API_KEY = "c1815b5db3f80a876fcb7fd1accb9b75";

export async function getWeatherInfo(
  city: string
): Promise<{ city: string; weather: string; temp: string }> {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const results = await data.json();
    const weatherInfo = {
      city: results.name,
      weather: results.weather[0].description,
      temp: results.main.temp,
    };
    return weatherInfo;
  } catch (error) {
    throw error;
  }
}
