/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 
$(function() {
    //This suite test is will checking allFeeds variable in app.js.
    describe('RSS Feeds', function() {
        
        //This spec is will check exist allFeeds variable in app.js and allFeeds has least one data.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();  //Check exist allFeeds variable.
            expect(allFeeds.length).not.toBe(0);  //Check allFeeds data length.
        });


        //This spec is will checking url in items of allFeeds variable.
        it('URL is empty', function() {
            var regex = /https?\:\/\/\w+((\:\d+)?\/\S*)?/;  //This is Regular Expression pattern for validate check url.
            for(var i=0; i<allFeeds.length; i++){  
                expect(allFeeds[i].url).toBeDefined();  //URL defined check
                expect(allFeeds[i].url).toBeTruthy();  //URL context exist check. If url is empty, will return false
                expect(regex.test(allFeeds[i].url)).toBeTruthy();  //URL validation check use reqular expression pattern.
            }
        });

        //This spec is will checking name in items of allFeeds variable.
        it('name is empty', function() {
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();  //Name defined check
                expect(allFeeds[i].name).toBeTruthy();  //Name context exist check. If name is empty, will return false
            }
        });
    });

    //This suite test is will checking side menu.
    describe('The menu', function() {
        
        //This spec is will checking menu-hidden class exist in body tag.
        it('element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();  //If index.html has class 'menu-hidden' element, will return true
        });

        //This spec is will checking side menu showing and hiding.
        it('changes visibility on click', function() {
            $('.menu-icon-link').click();  //menu icon click(appear menu)
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();  //If side menu is appear, will return false.
            $('.menu-icon-link').click();  //menu icon click(disappear menu)
            expect($('body').hasClass('menu-hidden')).toBeTruthy();  //If sied menu is disappear, will return true.
        });
    });
        
    
    //This suite test is will checking entry is has feed.
    describe('Initial Entries', function() {
        
        beforeEach(function(done) {  //beforeEach funcion init
            loadFeed(0, function() {  //call loadFeed function with call back function
                done();                             
            });
        });

        //This spec is will checking entry has least one feed.
        it('are available for use', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);  //Check child element count in entry class. If has least one element, will pass this test.
        });
    });
       
    //This suite test is will checking feed change will new content.
    describe('New Feed Selection', function() {
       
        var currentFeed = -1;  //set feed index value.
        var feedDetail = [];  //feed content array.

        beforeEach(function(done) {
            currentFeed++;  //feed index set 0 
            loadFeed(currentFeed, function() {  //call loadFeed function.
                done();
            }); 
        });

        //This spec is will checking old content get successfully.
        it('takes old content', function() {                      
            feedDetail[currentFeed] = $('.entry:first').html();  //get old feed content and insert array.
            expect(feedDetail[currentFeed]).toBeTruthy();  //check array insert successful.
        });

        //This spec is will checking change old content to new content.
        it('and exchanges it for new content', function() {
            feedDetail[currentFeed] = $('.entry:first').html();  //get new feed content and insert next array
            expect(feedDetail[currentFeed]).not.toEqual(feedDetail[currentFeed -1]);  //compare between old content and new content. 
        });
    });
}());
