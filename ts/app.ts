declare var angular: any;
angular.module('ChatStory', [])
    .controller('Chat', ['$scope', function ($scope) {

        function Message(author: string, typing: number, pause: number, message: string) {
            this.author = author;
            this.pause = pause;
            this.typing = typing;
            this.message = message;
        }

        interface message {
            author: string;
            pause: number;
            typing: number;
            message: string;
        }

        $scope.chat = []

        var messages: message[] = [
            new Message('me', 1, 2, 'helloo there'),
            new Message('leo', 1, 2, 'mornin\''),
            new Message('leo', 1, 2, 'what you up to today'),
            new Message('me', 1, 2, 'nm'),
            new Message('me', 1, 2, 'u?'),
        ]



        var pauseTillNow = 0;
        messages.forEach(m => {

            pauseTillNow += m.pause;

            setTimeout(function () {
                $scope.chat.push(m);
                $scope.$apply();
            }, pauseTillNow * 1000);
        });



    }])