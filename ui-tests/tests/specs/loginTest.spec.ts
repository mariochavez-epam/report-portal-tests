import { Utils } from "../../../utils/Utils";
import DashboardPage from "../page-objects/dashboard/DashboardPage";
import LoginPage from "../page-objects/login/LoginPage";

const testData = require("../../../api-tests/config/config.ts");
const testEnvironment = Cypress.env("TEST_ENVIRONMENT") || "prod";
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
describe('Login Page UI Tests', () => {

    beforeEach(() => {
        loginPage.navigateToLoginPage();
        cy.wait(1000);
    });


    it('should display an error message for invalid credentials', () => {
        const randomUsername = Utils.generateRandomUsername(10);
        const randomPassword = Utils.generateRandomPassword(10);
        loginPage.login(randomUsername, randomPassword);
        loginPage.isErrorMessageDisplayed();

        // Verify error message is displayed
        loginPage.getNotificationContainerMessage()
            .should('contain', 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials');
    });

    it.skip('should successfully log in with valid credentials', () => {
        let username = Cypress.env("UI_USER") || "default";
        let password = Cypress.env("UI_PASSWORD") || "1q2w3e";
        loginPage.login(username, password);
        loginPage.isSuccessfulLoginMessageDisplayed();
        dashboardPage.isDashboardPageLoaded();
    });
});
