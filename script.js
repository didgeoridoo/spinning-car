(function(){

    function Input(){ 

        this.inputs = {
            touch: {
                start: 'touchstart',
                move: 'touchmove',
                end: 'touchend'
            },
            mouse: {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            }
        }

        this.getInputType = function() { 
            if('createTouch' in document || 'onTouchStart' in window){
                return "touch";
            } else {
                return "mouse"
            }
        }

        this.getInputString = function(action) {
            return this.inputs[this.getInputType()][action]
        }

    }
 

    function Spinnable(element, inputObj) {
        var self = this;
        var xStart,
            currentX;
        
        this.element = document.getElementById(element);
        this.bgPosX = 0;
        this.inputs = inputObj;

        this.chgBgPosX = function(xChg) {
            self.bgPosX += xChg*520;
            self.element.style.backgroundPosition = self.bgPosX + "px 0";
        }

        this.start = function(e) {
            e.preventDefault();
            self.xStart = e.pageX;
            self.addEvents('move');
        }

        this.move = function(e) {
            var moveSign;
            currentX > e.pageX ? moveSign = 1 : moveSign = -1;
            self.chgBgPosX(moveSign);
            currentX = e.pageX;
        }

        this.end = function(e) {
            self.removeEvents('move');
        }

        this.addEvents = function(eventName) {
            self.element.addEventListener(self.inputs.getInputString(eventName), self[eventName], false);
        }

        this.removeEvents = function(eventName) {
            self.element.removeEventListener(self.inputs.getInputString(eventName), self[eventName], false);
        }

    }

    var inputs = new Input();
    var car = new Spinnable('car', inputs);
    car.addEvents('start');
    car.addEvents('end');

})();

