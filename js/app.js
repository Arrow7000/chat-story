angular.module('ChatStory', [])
    .controller('Chat', ['$scope', function ($scope) {
        function Message(author, typing, pause, message) {
            this.author = author;
            this.pause = pause;
            this.typing = typing;
            this.message = message;
        }
        $scope.typing = {
            on: false,
            dots: '',
            interval: undefined,
            start: function () {
                this.on = true;
                this.dots = '';
                this.interval = setInterval(function () {
                    dotsAnimationFrame();
                }, 200);
            },
            stop: function () {
                this.on = false;
                clearInterval(this.interval);
            }
        };
        $scope.chat = [];
        var thread1 = {
            label: 'Main thread',
            messages: [
                new Message('me', 1, 1, 'helloo there'),
                new Message('leo', 0.5, 2, 'mornin\''),
                new Message('leo', 0.2, 2.1, 'what you up to today'),
                new Message('me', 0.5, 1, 'nm'),
                new Message('me', 0.5, 2.1, 'u?'),
                new Message('leo', 1, 2.5, 'yeah all good'),
                new Message('leo', 1.5, 1, 'bit bored tbh'),
                new Message('me', 0.5, 1.5, 'oh? how come?'),
            ],
            options: [thread2]
        };
        var thread2 = {
            label: 'Only option for testing 2nd thread',
            messages: [
                new Message('me', 1, 1, 'helloo there'),
                new Message('leo', 0.5, 2, 'mornin\''),
                new Message('leo', 0.2, 2.1, 'what you up to today'),
                new Message('me', 0.5, 1, 'nm'),
                new Message('me', 0.5, 2.1, 'u?'),
                new Message('leo', 1, 2.5, 'yeah all good'),
                new Message('leo', 1.5, 1, 'bit bored tbh'),
                new Message('me', 0.5, 1.5, 'oh? how come?'),
            ]
        };
        beginThread(thread1);
        function beginThread(thread) {
            var pauseTillMessage = 0, pauseTillTyping = 0;
            thread.messages.forEach(function (m, i) {
                pauseTillMessage += m.pause + m.typing;
                pauseTillTyping += m.typing;
                console.log("Pause till message " + (i + 1) + " typing starts: " + pauseTillTyping + " seconds");
                // Sets typing indicator on timings
                setTimeout(function () {
                    $scope.typing.start();
                    $scope.$apply();
                }, pauseTillTyping * 1000);
                pauseTillTyping += m.pause;
                console.log("Pause till message " + (i + 1) + " appears: " + pauseTillMessage + " seconds");
                // Sets message timings 
                setTimeout(function () {
                    $scope.typing.stop();
                    $scope.chat.push(m);
                    $scope.$apply();
                }, pauseTillMessage * 1000);
            });
            console.log(pauseTillMessage);
        }
        ;
        function dotsAnimationFrame() {
            var dots = $scope.typing.dots;
            if (dots.length < 3) {
                $scope.typing.dots += '.';
            }
            else {
                $scope.typing.dots = '';
            }
            $scope.$apply();
        }
    }]);
//# sourceMappingURL=app.js.map