import { getAuthToken, createShipment } from "../../support/apiHelper";
import { generateRefCode } from "../../support/utils";

describe("Shipment Creation API", () => {

  const orderCount = Number(Cypress.env("orderCount"));
  const orderType = Cypress.env("orderType");
  const environment = Cypress.env("environment");

  it(`Verify ${orderCount} ${orderType} orders are created successfully`, () => {

    cy.fixture("env/envMap").then(envMap => {
      const baseUrl = envMap[environment];

      // 🔐 STEP 1: AUTH
      getAuthToken(baseUrl).then(authRes => {
        expect(authRes.status).to.eq(200);
        expect(authRes.body.result).to.eq(true);

        // 🔑 STEP 2: EXTRACT TOKEN (YOUR EXACT FORMAT)
        const token = authRes.body.data.token;

        // 🚨 HARD GUARD (THIS PREVENTS Bearer undefined)
        if (!token) {
          throw new Error("Auth token is undefined. Check auth response.");
        }

        // 📦 STEP 3: LOAD PAYLOAD
        cy.fixture(`orders/${orderType}`).then(orderPayload => {

          // 🔁 STEP 4: CREATE ORDERS
          Cypress._.times(orderCount, () => {
            const payload = Cypress._.cloneDeep(orderPayload);

            payload.reference_code = generateRefCode();
            payload.original_reference_code = generateRefCode();

            createShipment(baseUrl, token, payload).then(res => {
              expect(res.status).to.eq(200);
              expect(res.body.result).to.eq(true);

              // ✅ ONLY THING YOU CARE ABOUT
              const awb = res.body.data.awb;
              expect(awb, "AWB should be generated").to.exist;

              cy.task("log", `AWB NUMBER GENERATED → ${awb}`);
            });
          });

        });
      });
    });
  });

});
