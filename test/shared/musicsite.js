var webdriver = require("selenium-webdriver");
const NUM_RETRY = 4;

exports.shouldBehaveLikeAMusicSite = function(driver, url) {

  describe("music site behaviour", function() {

    it(NUM_RETRY, "should load", function(done) {
      var pageLoad = true;

      if(url) {
        pageLoad = false;
        helpers.getAndWait(driver, url)
        .then(function() {
          pageLoad = true;
        })
        .thenCatch(function(err) {
          console.log("Driver Timeout!", err);
          //pageLoad = true;
          return done(new Error("Driver timeout!"));
        });
      }

      driver.wait(function() {
        return pageLoad;
      })
      .then(function() {
        helpers.alertCheck(driver).then(function() {
          console.log("Alert check done!\nStarting waitforload");
          helpers.waitForLoad(driver)
          .then(function() {
            console.log("Wait for load done!\nInjecting test capture.");
            helpers.injectTestCapture(driver).then(function() {
              helpers.waitForExtensionLoad(driver, {count: 0})
              .then(function(result) {
                console.log("Extension loaded!");
                //expect(result).to.be.true;
                if(!result) return done(new Error("Extension load error!"));
                done();
              }, function(err) {
                console.log("Extension error: ", err);
                return done(err);
              });
            });
          }, function(err) {
            console.log("Driver Timeout!", err);
            return done(err);
          });
        });
      });
    });

    it(NUM_RETRY, "should play", function(done) {
      helpers.playerAction(driver, {action: "playPause"})
      .then(function(result) {
        if(!result) return done(new Error("Play failed!"));
        done();
      });
    });

    it(NUM_RETRY, "should pause", function(done) {
      helpers.playerAction(driver, {action: "playPause"})
      .then(function(result) {
        if(!result) return done(new Error("Play failed!"));
        done();
      });
    });

    it(NUM_RETRY, "should play next", function(done) {
      helpers.playerAction(driver, {action: "playNext"})
      .then(function(result) {
        if(!result) return done(new Error("Play Next failed!"));
        done();
      });
    });

    it(NUM_RETRY, "should play previous", function(done) {
      helpers.playerAction(driver, {action: "playPrev"})
      .then(function(result) {
        if(!result) return done(new Error("Play Prev failed!"));
        done();
      });
    });

    it(NUM_RETRY, "should mute", function(done) {
      helpers.playerAction(driver, {action: "mute"})
      .then(function(result) {
        if(!result) return done(new Error("Mute failed!"));
        done();
      });
    });

    it(NUM_RETRY, "should get site name", function(done) {
      helpers.playerAction(driver, {action: "siteName"})
        .then(function(result) {
          if(!result) return done(new Error("Site name request failed!"));
          done();
        });
    });

    //if(!skipPlayState) {
    //  it(NUM_RETRY, "should get song name", function (done) {
    //    helpers.playerAction(driver, {action: "songName"})
    //      .then(function (result) {
    //        if (!result) return done(new Error("Song name request failed!"));
    //        done();
    //      });
    //  });
    //
    //  it(NUM_RETRY, "should get artist name", function (done) {
    //    helpers.playerAction(driver, {action: "artistName"})
    //      .then(function (result) {
    //        if (!result) return done(new Error("Artist name request failed!"));
    //        done();
    //      });
    //  });
    //
    //  it(NUM_RETRY, "should get playing state", function (done) {
    //    helpers.playerAction(driver, {action: "isPlaying"})
    //      .then(function (result) {
    //        if (!result) return done(new Error("Playing state request failed!"));
    //        done();
    //      });
    //  });
    //}

  });
};
