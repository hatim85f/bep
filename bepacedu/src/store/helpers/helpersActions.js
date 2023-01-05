export const GET_COUNTRIES = "GET_COUNTRIES";

export const getCountries = () => {
  return async (dispatch) => {
    const response = await fetch("https://api.first.org/data/v1/countries");

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: GET_COUNTRIES,
      countries: resData.data,
    });
  };
};
