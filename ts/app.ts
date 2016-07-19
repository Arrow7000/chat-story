declare var angular: any;
angular.module('ChatStory', [])
    .controller('Chat', ['$scope', function ($scope) {


        // console.log(unicorn);



        function Message(author: string, pause: number, message: string, typingSpeed?: number) {
            this.author = author;
            this.pause = pause;
            this.message = message;
            this.typingSpeed = typingSpeed || 4;
        }

        interface message {
            author: string;
            pause: number;
            typingSpeed: number;
            message: string;
        }

        interface thread {
            messages: message[];
            options?: thread[];
            label: string;
        }

        $scope.interlocutor = { name: 'Leo' }

        $scope.typing = {
            on: false,
            dots: '',
            interval: undefined,
            start() {
                this.on = true;
                this.dots = '';
                this.interval = setInterval(() => {
                    dotsAnimationFrame();
                }, 200)
            },
            stop() {
                this.on = false;
                clearInterval(this.interval);
            }
        }

        $scope.chat = []
        $scope.choose = false
        $scope.choice = []


        var thread: thread = {
            label: 'Main thread',
            messages: [
                new Message('me', 1, 'Lorem ipsum lacus eu enim condimentum amet in himenaeos, risus ante lacus congue litora sit faucibus rhoncus malesuada, dapibus egestas eleifend vel imperdiet nibh cursus nullam et mattis libero a odio aptent ac.Rutrum vivamus libero tristique mi arcu tempor euismod adipiscing, pretium taciti iaculis sed tincidunt in eget suspendisse posuere, pellentesque dui fusce vitae eleifend suspendisse erat.Scelerisque facilisis porttitor cras orci purus quisque, lobortis interdum vitae velit sociosqu imperdiet integer, viverra sociosqu mattis malesuada inceptos suscipit rutrum erat et pellentesque iaculis neque bibendum consequat.', 1000),
                new Message('leo', 1, 'helloo there'),
                new Message('leo', 0.5, 'hw r u??'),
            ],
            options: [
                {
                    label: 'Good',
                    messages: [
                        new Message('me', 0, 'good. u?'),
                        new Message('leo', 0.5, 'yeah great'),
                        new Message('leo', 0.2, 'what uup to today'),
                        new Message('me', 0.5, 'nm'),
                        new Message('me', 0.5, 'u?'),
                        new Message('leo', 1, 'yeah all good'),
                    ]
                }, {
                    label: 'Bad',
                    messages: [
                        new Message('me', 0, 'bad.'),
                        new Message('me', 0.5, 'y.'),
                        new Message('leo', 0.5, 'o snap'),
                        new Message('leo', 0.5, 'how come??'),
                        new Message('me', 1.5, ''),
                        new Message('leo', 5, 'are you ok...?'),
                    ]
                },
                {
                    label: 'I am actually a magical princess from another land',
                    messages: [
                        new Message('me', 1, 'I am actually a magical princess from another land', 5),
                        new Message('me', .5, 'It\'s magical!'),
                        new Message('leo', 1, 'Oooh! it sure sounds like it.'),
                        new Message('leo', .3, 'Can I come?!?!?!?!?!?!'),
                        new Message('leo', 1, 'Please!!!'),
                    ],
                    options: [
                        {
                            label: 'I am actually a magical princess from another land',
                            messages: [
                                new Message('me', 1, 'Okay'),
                                new Message('me', .5, 'Welcome to Magicland!'),
                                new Message('me', .5, ':D'),
                                new Message('leo', 1, 'Yayyyyyyyyy'),
                                new Message('me', 1, 'Welcome to the land of the Unicorns...'),
                                new Message('leo', 1, 'sweeet.'),
                            ]
                        }, {
                            label: 'No',
                            messages: [
                                new Message('me', 1, 'No'),
                                new Message('me', .5, 'Sorryyyyyyyyyyyyyyyyyyy'),
                                new Message('me', .5, ':c'),
                                new Message('leo', 1, '*Snif snif*'),
                            ]
                        },
                    ]
                }]
        }








        $scope.beginThread = function (thread: thread) {
            $scope.choice = []

            let pause = 0

            thread.messages.forEach((m, i) => {

                // console.log(`Time for typing "${m.message}": ${typingTimeForMessage(m)}s`);


                pause += m.pause
                // console.log(`Pause till message ${i + 1}: (${m.message}) typing starts: ${pause} seconds`);


                // Sets typing indicator on timings
                setTimeout(function () {

                    $scope.typing.start();
                    $scope.$apply();

                }, pause * 1000);



                pause += typingTimeForMessage(m)
                // console.log(`Pause till message ${i + 1}: (${m.message}) appears: ${pause} seconds`);



                // Sets message timings 
                setTimeout(function () {

                    $scope.typing.stop();
                    if (m.message !== '') $scope.chat.push(m);
                    $scope.$apply();

                }, pause * 1000);
            });


            setTimeout(function () {
                $scope.choice = thread.options
                $scope.choose = true
                $scope.$apply();
            }, (pause + 1) * 1000);


        };

        $scope.beginThread(thread)






        // Functions 
        function dotsAnimationFrame() {
            let dots = $scope.typing.dots;

            if (dots.length < 3) {
                $scope.typing.dots += '.';
            } else {
                $scope.typing.dots = '';
            }
            $scope.$apply()
        }

        function typingTimeForMessage(message: message): number {
            let time
            let cps = 4 // Characters per second

            cps += (.5 * (message.typingSpeed - 1))
            // console.log(`Typing speed of ${message.message} is ${message.typingSpeed}`);


            if (message.message === '') {
                time = message.typingSpeed;
            } else {
                time = message.message.length / cps
            }
            return time
        }


    }])





var unicorn = "\n                            ___________ _\n  \\/                    __/   .::::.-'-(/-/)\n                     _/:  .::::.-' .-'\\/\\_`*******          __ (_))\n        \\/          /:  .::::./   -._-.  d\\|               (_))_(__))\n                     /: (\"\"\"\"/    '.  (__/||           (_))__(_))--(__))\n                      \\::).-'  -._  \\/ \\\\/\\|\n              __ _ .-'`)/  '-'. . '. |  (i_O\n          .-'      \       -'      '\\|\n     _ _./      .-'|       '.  (    \\\\                         % % %\n  .-'   :      '_  \\         '-'\\  /|/      @ @ @             % % % %\n /      )\\_      '- )_________.-|_/^\\      @ @ @@@           % %\\/% %\n (   .-'   )-._-:  /        \\(/\\'-._ `.     @|@@@@@            ..|........\n  (   )  _//_/|:  /          `\\()   `\\_\\     |/_@@             )'-._.-._.-\n   ( (   \\()^_/)_/             )/      \\\\    /                /   /\n    )  _.-\\\\.\\(_)__._.-'-.-'-.//_.-'-.-.)\\-'/._              /\n.-.-.-'   _o\\ \\\\\\     '::'   (o_ '-.-' |__\\'-.-;~ ~ ~ ~ ~ ~~/   /\\\\n          \\ /  \\\\\\__          )_\\    .:::::::.-'\\          '- - -|\n     :::''':::::^)__\\:::::::::::::::::'''''''-.  \\                '- - -\n    :::::::  '''''''''''   ''''''''''''':::. -'\\  \\     C. SWANSIGER\n_____':::::_____________________________________\\__\\______________________";