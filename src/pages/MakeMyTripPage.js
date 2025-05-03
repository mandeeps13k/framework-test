const BasePage = require('./BasePage');

class MakeMyTripPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async navigateToFlights() {
        await this.navigateTo('https://www.makemytrip.com/flights/');
        // Wait for the page to load
        await this.waitForElement('.landingContainer');
    }

    async selectOneWayTrip() {
        await this.click('li[data-cy="oneWayTrip"]');
    }

    async enterFromCity(city) {
        await this.click('input[data-cy="fromCity"]');
        await this.type('input[placeholder="From"]', city);
        await this.waitForElement('.react-autosuggest__suggestions-list');
        await this.click('.react-autosuggest__suggestions-list li:first-child');
    }

    async enterToCity(city) {
        await this.click('input[data-cy="toCity"]');
        await this.type('input[placeholder="To"]', city);
        await this.waitForElement('.react-autosuggest__suggestions-list');
        await this.click('.react-autosuggest__suggestions-list li:first-child');
    }

    async selectDepartureDate(daysFromToday = 7) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        await this.click('div[data-cy="departureDate"]');
        await this.click(`div[aria-label="${formattedDate}"]`);
    }

    async selectTravellers(adults = 1, children = 0, infants = 0) {
        await this.click('span[data-cy="travellerText"]');
        
        // Set adults
        for (let i = 1; i < adults; i++) {
            await this.click('li[data-cy="adults-2"]');
        }
        
        // Set children
        for (let i = 0; i < children; i++) {
            await this.click('li[data-cy="children-2"]');
        }
        
        // Set infants
        for (let i = 0; i < infants; i++) {
            await this.click('li[data-cy="infants-2"]');
        }
        
        await this.click('button[data-cy="travellerApplyBtn"]');
    }

    async searchFlights() {
        await this.click('a[data-cy="submit"]');
        await this.waitForElement('.listingContainer');
    }

    async selectFirstFlight() {
        await this.waitForElement('.listingCard');
        await this.click('.listingCard:first-child');
    }

    async bookFlight() {
        await this.waitForElement('button[data-cy="bookButton"]');
        await this.click('button[data-cy="bookButton"]');
    }

    async fillPassengerDetails(passenger) {
        await this.waitForElement('input[data-cy="firstName"]');
        await this.type('input[data-cy="firstName"]', passenger.firstName);
        await this.type('input[data-cy="lastName"]', passenger.lastName);
        await this.type('input[data-cy="mobileNumber"]', passenger.mobile);
        await this.type('input[data-cy="email"]', passenger.email);
    }
}

module.exports = MakeMyTripPage; 