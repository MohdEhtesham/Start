var AuthApi = (token, apiUrl, apiMethod, data, isFormData) => {
  console.log("hvhvkh", token, apiUrl, apiMethod, data, isFormData);
  let formBody = new FormData();
  if (data) {
    if (isFormData) {
      for (let i in data) {
        formBody.append(i, data[i]);
      }
    }
  }

  var init =
    apiMethod == "GET"
      ? {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : apiMethod == "POST"
      ? {
          method: apiMethod,
          headers: {
            Accept: "application/json",
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: isFormData ? formBody : JSON.stringify(data),
        }
      : {
          method: apiMethod,
          headers: {
            Accept: "application/json",
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: isFormData ? formBody : data !== "" ? JSON.stringify(data) : "",
        };
  console.log("BASE_URL???", apiUrl);
  return fetch(apiUrl, init)
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData???", responseData);
      if (responseData.code === 200) {
        return responseData;
      } else {
        return responseData;
      }
    })
    .catch((err) => {
      // alert("Server encounter an error, please try after some time");
      return false;
    });
};

export { AuthApi };
