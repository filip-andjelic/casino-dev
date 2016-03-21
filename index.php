<!-- 
  this index.php page
  is just used for an example    
  of how angluar works and
  how we imagined building 
  this casino online portal 
-->
<!DOCTYPE html>
<html ng-app="mainApp">
<head lang="en">
    <base href="/">
    <meta charset="UTF-8">
    <title>Casino Games</title>
    <link rel="stylesheet" href="casino-example/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="casino-example/build/css/animate.css">
    <link rel="stylesheet" href="casino-example/build/css/main.css">
    <script src="casino-example/build/js/vendor.js"></script>
    <script src="casino-example/build/js/app.js"></script>
    <script src="casino-example/build/js/widgets.js"></script>
</head>
<body>
  <div ng-controller="MainController">
    <div ng-include="'casino-example/build/app/views/main/head.html'"></div>
    <ui-view></ui-view>
  </div>  
</html>