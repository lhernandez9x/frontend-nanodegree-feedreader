/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Loops through the allFeeds objects and checks to see if url is defined and not empty
        it('should have a url', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                var url = allFeeds[i].url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            }
        });

        //Loops through the allFeeds objects and checks to see if name is defined and not empty
        it('should have a name', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                var name = allFeeds[i].name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            }
        });
    });

    describe('The Menu', function() {
        var body = $('body'),
            menu = $('.menu-icon-link');

        //Check to see if menu is hidden by default
        it('should be hidden by default', function() {

            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //Check to make sure click event toggles menu-hidden class from body
        it('should change visibility when clicked', function() {

            //Trigger Click
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();

            //Trigger Click
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    })

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        //async beforeEach call to get feed and run tests
        beforeEach(function(done) {
            loadFeed(0, done);
        })

        it('should have at least 1 entry in the feed container', function(done) {
            var feed = $('.feed'),
                entry = $('.entry');

            //Tests that the feed container has at least one child with .entry class
            expect(feed.children.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"
     */
    describe("New Feed Selection", function() {
        var firstFeed,
            secondFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                
                // Saves first feed inner html to variable
                firstFeed = $('.feed').html();
                
                // Saves first feed inner html to variable
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                })
            })
        })

        it('should change content when loadFeed is called', function(done) {
            
            //Tests that the firstFeed is not equal to secondFeed
            expect(firstFeed != secondFeed).toBe(true);
            done();
        })
    })
}());