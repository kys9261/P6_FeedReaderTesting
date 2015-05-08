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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is empty', function() {
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();     //URL defined check
                expect(allFeeds[i].url).toBeTruthy();      //URL context exist check. If url is empty, will return false
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is empty', function() {
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();    //Name defined check
                expect(allFeeds[i].name).toBeTruthy();     //Name context exist check. If name is empty, will return false
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();      //If index.html has class 'menu-hidden' element, will return true
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility on click', function() {
            $('.menu-icon-link').click();                                 //menu icon click(appear menu)
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();   //If side menu is appear, will return false.
            $('.menu-icon-link').click();                                 //menu icon click(disappear menu)
            expect($('body').hasClass('menu-hidden')).toBeTruthy();       //If sied menu is disappear, will return true.
        });
    });
        
    
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
         /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {                 //beforeEach funcion init
            loadFeed(0, function() {                //call loadFeed function with call back function
                done();                             
            });
        });

        it('are available for use', function() {
            expect($('.entry').length).toBeGreaterThan(0);   //Check child element count in entry class. If has least one element, will pass this test.
        });
    });
       

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var currentFeed = -1;                           //set feed index value.
        var feedDetail = [];                            //feed content array.

        beforeEach(function(done) {
            currentFeed++;                              //feed index set 0 
            loadFeed(currentFeed, function() {          //call loadFeed function.
                done();
            }); 
        });

        it('takes old content', function() {                      
            feedDetail[currentFeed] = $('.entry:first').html();    //get old feed content and insert array.
            expect(feedDetail[currentFeed]).toBeTruthy();          //check array insert successful.
        });

        it('and exchanges it for new content', function() {
            feedDetail[currentFeed] = $('.entry:first').html();                         //get new feed content and insert next array
            expect(feedDetail[currentFeed]).not.toEqual(feedDetail[currentFeed -1]);    //compare between old content and new content. 
        });
    });
}());
