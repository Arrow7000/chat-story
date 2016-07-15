angular.module('ChatStory', [])
    .controller('Chat', ['$scope', function ($scope) {
        function Message(author, typing, pause, message) {
            this.author = author;
            this.pause = pause;
            this.typing = typing;
            this.message = message;
        }
        $scope.chat = [];
        var messages = [
            new Message('me', 1, 2, 'helloo there'),
            new Message('leo', 1, 2, 'mornin\''),
            new Message('leo', 1, 2, 'what you up to today'),
            new Message('me', 1, 2, 'nm'),
            new Message('me', 1, 2, 'u?'),
        ];
        var pauseTillNow = 0;
        messages.forEach(function (m) {
            pauseTillNow += m.pause;
            setTimeout(function () {
                $scope.chat.push(m);
                $scope.$apply();
            }, pauseTillNow * 1000);
        });
    }]);
//# sourceMappingURL=app.js.map