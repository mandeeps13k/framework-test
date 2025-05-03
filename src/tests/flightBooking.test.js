const BaseTest = require('./BaseTest');
const MakeMyTripPage = require('../pages/MakeMyTripPage');

describe('MakeMyTrip Flight Booking', () => {
    let testInstance;
    let makeMyTripPage;

    beforeEach(async () => {
        testInstance = new BaseTest();
        await testInstance.setup();
        makeMyTripPage = new MakeMyTripPage(testInstance.driver);
    });

    afterEach(async () => {
        await testInstance.teardown();
    });

    test('should book a one-way flight', async () => {
        // Navigate to flights page
        await makeMyTripPage.navigateToFlights();
        
        // Select one-way trip
        await makeMyTripPage.selectOneWayTrip();
        
        // Enter from and to cities
        await makeMyTripPage.enterFromCity('Delhi');
        await makeMyTripPage.enterToCity('Mumbai');
        
        // Select departure date (7 days from today)
        await makeMyTripPage.selectDepartureDate(7);
        
        // Select travellers (2 adults)
        await makeMyTripPage.selectTravellers(2);
        
        // Search for flights
        await makeMyTripPage.searchFlights();
        
        // Select first available flight
        await makeMyTripPage.selectFirstFlight();
        
        // Book the flight
        await makeMyTripPage.bookFlight();
        
        // Fill passenger details
        const passenger = {
            firstName: 'John',
            lastName: 'Doe',
            mobile: '9876543210',
            email: 'john.doe@example.com'
        };
        await makeMyTripPage.fillPassengerDetails(passenger);
        
        // Add assertions or further steps as needed
        // Note: Actual booking completion might require payment details
    }, 60000); // Increased timeout to 60 seconds for this test
}); 