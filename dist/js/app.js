(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name DreBong.directive:pongBoard
 * @description
 * # pong
 */

var AllReviews = angular.module('AllReviews', []);

AllReviews.controller('landingController', ['$scope', function($scope) {

}]);

// DrePong.directive('pongBoard', ['$window', 'PaddleService', 'ComputerService', 'PlayerService', 'BallService',
//     function ($window, PaddleService, ComputerService, PlayerService, BallService) {
//     return {
//       template: '<div></div>',
//       restrict: 'A',
//       transclude: true,
//       link: function postLink(scope, element, attrs) {

//         var animate = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame || function (callback) {
//           $window.setTimeout(callback, 1000 / 60);
//         };
//         var canvas = element[0];
//         var width = 400;
//         var height = 600;
//         var context = canvas.getContext('2d');

//         //console.log(ComputerService.Computer.test);
        
//         var player = new PlayerService.Player();
//         var computer = new ComputerService.Computer();
//         var ball = new BallService.Ball(200, 300);

        

//         //console.log(PlayerService.Player.render());

//         var render = function () {
//           context.fillStyle = '#FF00FF';
//           context.fillRect(0, 0, width, height);
//           PlayerService.render(context);
//           ComputerService.render(context);
//           BallService.render(context);
//         };

//         var keysDown = scope.keysDown;

//         $window.addEventListener('keydown', function (event) {
//           scope.keysDown[event.keyCode] = true;
//         });

//         $window.addEventListener('keyup', function (event) {
//           delete scope.keysDown[event.keyCode];
//         });



//         var update = function() {
//           PlayerService.update(keysDown);
//           ComputerService.update(ball);
//           BallService.update(player.paddle, computer.paddle, scope);
//           PlayerService.storePurchase(keysDown, scope);
//         };

//         var step = function () {
//           update();
//           render();
//           //if(BallService.getPlayerScore() != BallService.getWinningPoint() && BallService.getComputerScore() != BallService.getWinningPoint()){
//              animate(step);
//           //}
//         };
        
//         scope.computer = 0;
//         scope.player = 0;

//         scope.computerScore = BallService.scores.computerScore;
//         scope.playerScore = BallService.scores.playerScore;
//         console.log(scope.computerScore);

//         animate(step);

//       }
//     };
//   }]);

// DrePong.service('PaddleService', function() {

// var thePaddle;

//   return {
//     Paddle: function(x, y, width, height) {
//           this.x = x;
//           this.y = y;
//           this.width = width;
//           this.height = height;
//           this.xSpeed = 0;
//           this.ySpeed = 0;
//           thePaddle = this;
//     }, 
  
//     render: function (context) {
//           context.fillStyle = '#0000FF';
//           context.fillRect(this.x, this.y, this.width, this.height);
//     },

//     move: function (paddle, x, y) {
//           paddle.x += x;
//           paddle.y += y;
//           paddle.xSpeed = x;
//           paddle.ySpeed = y;
//           if (paddle.x < 0) {
//             paddle.x = 0;
//             paddle.xSpeed = 0;
//           } else if (paddle.x + paddle.width > 400) {
//             paddle.x = 400 - paddle.width;
//             paddle.xSpeed = 0;
//           }
//     }

//   }


// });

// DrePong.service('ComputerService', ['PaddleService', function(PaddleService) {

//   var computerPaddle;

//   return {
    
//     // test: function() {
//     //   this.a = b;
//     // },

//     Computer: function() {
//           this.paddle = new PaddleService.Paddle(175, 10, 50, 10);
//           computerPaddle = this.paddle;
//         },
  
//     render: function (context) {
//           context.fillStyle = '#0000FF';
//           context.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
//         },

//     update: function (ball) {
//           var xPos = ball.x;
//           var diff = -((computerPaddle.x + (computerPaddle.width / 2)) - xPos);
//           if (diff < 0 && diff < -4) {
//             diff = -5;
//           } else if (diff > 0 && diff > 4) {
//             diff = 5;
//           }
//           PaddleService.move(computerPaddle, diff, 0);
//           if (computerPaddle.x < 0) {
//             computerPaddle.x = 0;
//           } else if (computerPaddle.x + computerPaddle.width > 400) {
//             computerPaddle.x = 400 - computerPaddle.width;
//           }
//         }

//   }
        
// }]);

// DrePong.service('PlayerService', ['PaddleService', 'BallService', '$timeout', function(PaddleService, BallService, $timeout) {

// var playerPaddle;
// var playerInventory = [];


// return {

//   storePurchase: function(keysDown, scope) {
//       scope.scores.playerMonies = BallService.scores.playerMoney;
//       console.log(BallService.scores.playerMoney);
//       self = this;
//         if (playerInventory.length <= 2) {
//           for (var key in keysDown) {
//             var value = Number(key);
//             if (value === 49 && BallService.scores.playerMoney >= 300) {
//               playerInventory.push('item1');
//               scope.playerInventory = playerInventory;
//               BallService.scores.playerMoney -= 300;
//               scope.purchaseMessage = self.purchaseMessage();
//               // scope.purchaseMessage = self.timeoutPurchaseMessage();
//               console.log(scope.playerInventory);
//               console.log(BallService.scores.playerMoney);
//             } else if (value === 50 && BallService.scores.playerMoney >= 500) {
//               playerInventory.push('item2');
//               scope.playerInventory = playerInventory;
//               BallService.scores.playerMoney -= 500;
//               this.purchaseMessage();
//               console.log(scope.playerInventory);
//               console.log(BallService.scores.playerMoney);
//             } else if (value === 51 && BallService.scores.playerMoney >= 800) {
//               playerInventory.push('item3');
//               scope.playerInventory = playerInventory;
//               BallService.scores.playerMoney -= 800;
//               this.purchaseMessage();
//               console.log(scope.playerInventory);
//               console.log(BallService.scores.playerMoney);
//             } else {
//               console.log('Not enough cash!');
//               return 'Not enough cash!';
//             }
//           }
//         }
//         else {
//           return 'Cannot carry any more items!';
//         }
//         scope.$digest();
//       },

//   purchaseMessage: function() {
//     return 'You just purchased a ' + playerInventory[playerInventory.length - 1];
//   },

//   // timeoutPurchaseMessage: function() {
//   //   $timeout(
//   //     function() {
//   //       return '';
//   //       //scope.purchaseMessage = null;
//   //     }, 2000);
//   // },

//   Player: function() {
//             this.paddle = new PaddleService.Paddle(175, 580, 50, 10);
//             playerPaddle = this.paddle;
//           },
//   render: function(context) {
//           context.fillStyle = '#0000FF';
//           context.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
//           },
//   update: function(keysDown) {
//     for (var key in keysDown) {
//             var value = Number(key);
//             if (value === 37) {
//               PaddleService.move(playerPaddle, -4, 0);
//             } else if (value === 39) {
//               PaddleService.move(playerPaddle, 4, 0);
//             } else {
//               PaddleService.move(playerPaddle, 0, 0);
//             }
//           }
//   }          

//   // Player.prototype.render: function () {
//   //         this.paddle.render();
//   //       };  
// }

//   // Player.prototype.render = function () {
//   //         this.paddle.render();
//   //       };

//         // Player.prototype.update = function () {
          
//         // };

// }]);


// DrePong.service('BallService', ['PaddleService', function(PaddleService) {

// var theBall;

// // var playerScore = 0;
// // var computerScore = 0;
// // var winningPoint = 2;

// var scoreData = { playerScore: 0, computerScore: 0, playerMoney: 0, winningPoint: 21 };

// // updateScores = function(newPlayerScore, newComputerScore) {

// // }

// //var winningMessage;

// // console.log(playerScore);
// // console.log(computerScore);

//   return {
  
//     scores: scoreData,

//     // checkForWinner: function() {
//     //   if (playerScore == 2) {
//     //     return "Player, you win!"; 
//     //   }
//     //   if (computerScore == 2) {
//     //     return "Computer, you win!";
//     //   }
//     // },

//     Ball: function(x, y) {

//           this.x = x;
//           this.y = y;
//           this.xSpeed = 0;
//           this.ySpeed = 3;
//           theBall = this;
//         },
  
//     render: function (context) {
//       context.beginPath();
//       context.arc(theBall.x, theBall.y, 5, 2 * Math.PI, false);
//       context.fillStyle = '#000000';
//       context.fill();
    
//     },

//     update: function (paddle1, paddle2, scope) {
//       theBall.x += theBall.xSpeed;
//       theBall.y += theBall.ySpeed;
//       var topX = theBall.x - 5;
//       var topY = theBall.y - 5;
//       var bottomX = theBall.x + 5;
//       var bottomY = theBall.y + 5;

//       if (theBall.x - 5 < 0) {
//         theBall.x = 5;
//         theBall.xSpeed = -theBall.xSpeed;
//       } else if (theBall.x + 5 > 400) {
//         theBall.x = 395;
//         theBall.xSpeed = -theBall.xSpeed;
//       }

//       if (theBall.y < 0 || theBall.y > 600) {
       
//         if(theBall.y > 600 && scoreData.computerScore != scoreData.winningPoint) {
//           scoreData.computerScore++;
//           scoreData.playerMoney += 100;
//           scope.scores.computerScores = scoreData.computerScore;
//           scope.scores.playerMonies = scoreData.playerMoney;
//           //console.log(scoreData);
//           //console.log(computerScore);
//         }
//         if (theBall.y < 0 && scoreData.playerScore != scoreData.winningPoint) {
//           scoreData.playerScore++;
//           scope.scores.playerScores = scoreData.playerScore;
//           //console.log(scoreData);
//           //console.log(playerScore);
//         }
//         // if(computerScore == winningPoint){
//         //   alertMessage("Congratulations Computer! You have won!!");
          
//         // }
//         // else if(playerScore == winningPoint ){
//         //   alertMessage("Congratulations Player! You have won!!");
         
//         // }
//         if (scope !== undefined) {
//           scope.$digest();
//         }
//         theBall.xSpeed = 0;
//         theBall.ySpeed = 3;
//         theBall.x = 200;
//         theBall.y = 300;
//       }

//       if (topY > 300) {
//         if (topY < (paddle1.y + paddle1.height) && bottomY > paddle1.y && topX < (paddle1.x + paddle1.width) && bottomX > paddle1.x)             {
//           theBall.ySpeed = -3;
//           theBall.xSpeed += (paddle1.xSpeed / 2);
//           theBall.y += theBall.ySpeed;
//         }
//       } else {
//         if (topY < (paddle2.y + paddle2.height) && bottomY > paddle2.y && topX < (paddle2.x + paddle2.width) && bottomX > paddle2.x)             {
//           theBall.ySpeed = 3;
//           theBall.xSpeed += (paddle2.xSpeed / 2);
//           theBall.y += theBall.ySpeed;
//         }
//       }
//     }

//   }

    

// }]);

// // DrePong.service('StoreService', ['PaddleService', function(PaddleService) {

// //   }
},{}]},{},[1]);