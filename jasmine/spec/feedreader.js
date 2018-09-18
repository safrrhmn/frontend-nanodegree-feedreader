/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
	(function() {
		/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
		describe('RSS Feeds', function() {
			/* It tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
			it('are defined', function() {
				expect(allFeeds).toBeDefined();
				expect(allFeeds.length).not.toBe(0);
			});

			/* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
			it('Feeds contain non-empty URLs', function() {
				allFeeds.forEach((feed) => {
					expect(feed.url).toBeDefined();
					expect(feed.url.length).toBeGreaterThan(0);
				});
			});

			/* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
			it('Feeds contain non-empty names', function() {
				allFeeds.forEach((feed) => {
					expect(feed.name).toBeDefined();
					expect(feed.name).toBeTruthy();
				});
			});
		});

		/* Write a new test suite named "The menu" */
		describe('The menu', function() {
			/* This test ensures the menu element is
        */
			it('Menu Elements are Hidden by Default', function() {
				expect($('body').hasClass('menu-hidden')).toBeTruthy();
			});

			/*This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
			it('Menu Appears and Disappear on Subsequent Clicks', function() {
				$('.menu-icon-link').click().trigger('change');
				expect($('body').hasClass('menu-hidden')).toBe(false);
				$('.menu-icon-link').click().trigger('change');
				expect($('body').hasClass('menu-hidden')).toBeTruthy();
			});
		});

		/* Write a new test suite named "Initial Entries" */
		describe('Initial Entries', function() {
			/* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
			beforeEach(function(done) {
				loadFeed(0, done);
			});

			it('loadFeed() function is done executing', function(done) {
				expect($('.feed .entry').length).toBeGreaterThan(0);
				done();
			});
		});
		/* Write a new test suite named "New Feed Selection" */
		describe('New Feed Selection', function() {
			/*  This test ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
			let contentOne, contentSecond;
			beforeEach(function(done) {
				loadFeed(0, function() {
					contentOne = $('.feed').contents();
					loadFeed(1, function() {
						contentSecond = $('.feed').contents();
					});
					done();
				});
			});

			it('New Feed is Loaded by loadFeed() function', function(cb) {
				expect(contentOne !== contentSecond).toBeTruthy();
				cb();
			});
		});
	})()
);
