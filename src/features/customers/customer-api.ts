const URL =
  "https://parloafrontendchallenge.z6.web.core.windows.net/customers.json";

export const getCustomers = async () => {
  const response = await fetch(URL);

  return response.json();
};
