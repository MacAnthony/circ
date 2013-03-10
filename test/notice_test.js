// Generated by CoffeeScript 1.4.0
(function() {

  describe("A notice", function() {
    var getMessage, getOption, isVisible, notice;
    notice = void 0;
    getMessage = function() {
      return $("#notice .content");
    };
    getOption = function(index) {
      return $("#notice .option" + index);
    };
    isVisible = function() {
      return $("#notice")[0].style.top === '0px';
    };
    beforeEach(function() {
      mocks.dom.setUp();
      return notice = new chat.Notice();
    });
    afterEach(function() {
      return mocks.dom.tearDown();
    });
    it("is initially hidden", function() {
      return expect(isVisible()).toBe(false);
    });
    it("becomes visible after prompt() is called", function() {
      notice.prompt("Device detected");
      return expect(isVisible()).toBe(true);
    });
    it("can be manually closed with close()", function() {
      notice.prompt("Device detected");
      notice.close();
      return expect(isVisible()).toBe(false);
    });
    it("is closed when the close button is clicked", function() {
      notice.prompt("Device detected");
      $("#notice .close").click();
      return expect(isVisible()).toBe(false);
    });
    it("can display a message", function() {
      notice.prompt('Device detected');
      expect(getMessage()).toHaveText('Device detected');
      expect(getOption(1)).toHaveClass('hidden');
      return expect(getOption(2)).toHaveClass('hidden');
    });
    it("can display a message with a clickable button", function() {
      notice.prompt("Device detected [Connect]");
      expect(getMessage()).toHaveText('Device detected');
      expect(getOption(1)).toHaveText('Connect');
      expect(getOption(1)).not.toHaveClass('hidden');
      return expect(getOption(2)).toHaveClass('hidden');
    });
    it("can display a message with two clickable buttons", function() {
      notice.prompt("Device detected [Connect] [?]");
      expect(getMessage()).toHaveText('Device detected');
      expect(getOption(1)).toHaveText('Connect');
      expect(getOption(1)).not.toHaveClass('hidden');
      expect(getOption(2)).toHaveText('?');
      return expect(getOption(2)).not.toHaveClass('hidden');
    });
    return it("calls a specified callback function when a button is clicked", function() {
      var connect, help,
        _this = this;
      connect = jasmine.createSpy('connect');
      help = jasmine.createSpy('help');
      notice.prompt("Device detected [Connect] [?]", (function() {
        return connect();
      }), (function() {
        return help();
      }));
      getOption(2).click();
      expect(help).toHaveBeenCalled();
      expect(connect).not.toHaveBeenCalled();
      return expect(isVisible()).toBe(false);
    });
  });

}).call(this);