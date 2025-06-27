import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/films`;

// export const getFilms = async (page = 1, limit = 10, sortBy, sortOrder) => {
//   try {
//     console.log("Fetching films from:", BASE_URL);
//     const response = await axios.get(BASE_URL, {
//       params: {
//         page,
//         limit,
//         sortBy,
//         sortOrder
//       }
//     });
//     // console.log(response);
//     return response; 
//   } catch (err) {
//     console.error(err);
//     return { data: { data: [] } }; 
//   }
// };
 

export const getFilms = async (page = 1, limit = 10, sortBy, sortOrder, filters = {}) => {
  try {
    const params = { page, limit, sortBy, sortOrder, ...filters };
    const response = await axios.get(BASE_URL, { params });
    return response;
  } catch (err) {
    console.error(err);
    return { data: { data: [] } };
  }
};