// import axios from "axios";

// const BASE_URL="https://youtube138.p.rapidapi.com"; 

// const options = {
//     params: {
      
//       hl: 'en',
//       gl: 'US'
//     },
//     headers: {
//       'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
//       'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
//     }
//   };

//   export const fetchDataFromApi= async (url) =>{
//     const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//     return data;
//   }

  



import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: {
        hl: 'en',
        gl: 'US'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

export const fetchDataFromApi = async (url) => {
    let retries = 3; // Number of retries
    let delay = 1000; // Initial delay in milliseconds

    while (retries > 0) {
        try {
            const { data } = await axios.get(`${BASE_URL}/${url}`, options);
            return data;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Retry the request after a delay
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Double the delay for the next retry
                retries--;
            } else {
                // Handle other types of errors
                throw error;
            }
        }
    }

    throw new Error("Exceeded maximum number of retries");
};
