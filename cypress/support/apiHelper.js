export const getAuthToken = (baseUrl) => {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/api/1/mainsite/token`,
    headers: {
      "X-API-KEY": Cypress.env("xApiKey"),
      "Content-Type": "application/json"
    },
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password")
    }
  });
};

export const createShipment = (baseUrl, token, payload) => {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/api/1/mainsite/shipment/create`,
    headers: {
      "x-api-key": Cypress.env("xApiKey"),
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: payload
  });
};
