var myApp = angular.module('myApp',[]);
myApp.controller('AnyCtrl', ['$scope', function($scope) {
  var ac = this;
  
    ac.myModel = {
      id:1,
      name:"whatever",
      baseValue: 39,
      values:[{"valueId":1,"value":11},{"valueId":2,"value":12},{"valueId":3,"value":13},{"valueId":4,"value":14}]
    };
   
    ac.tempNestedValues1= [];
    ac.tempNestedValues2= [];
    angular.forEach(ac.myModel.values,function(nestedValue){
      ac.tempNestedValues1[nestedValue.valueId] = {valueId:nestedValue.valueId, value: nestedValue.value};
      ac.tempNestedValues2[nestedValue.valueId] = {valueId:nestedValue.valueId, value: ac.myModel.baseValue*20/nestedValue.value};
    });
    ac.updateTriggeredByX = function(){
      //this will update all values 
      var myFinalValues = [];
      angular.forEach(ac.myModel.values,function(nestedValue){
        ac.tempNestedValues1[nestedValue.valueId] = {valueId: nestedValue.valueId, value: (ac.myModel.baseValue*20/ac.tempNestedValues2[nestedValue.valueId].value)};
        myFinalValues.push(ac.tempNestedValues1[nestedValue.valueId]);
        
      });
      ac.myModel.values = myFinalValues;
    }
    ac.updateTriggeredByY = function(valueId){
      //this will update the corrispondent Z
      var myFinalValues = [];
      ac.tempNestedValues2[valueId].value = ac.myModel.baseValue * 20 / ac.tempNestedValues1[valueId].value;
      
      angular.forEach(ac.myModel.values,function(nestedValue){
        
        if(nestedValue.valueId===valueId){
          myFinalValues.push(ac.tempNestedValues1[valueId]);
        }else{
          myFinalValues.push(nestedValue);
        }
      });
      
      ac.myModel.values=myFinalValues;
    }
    ac.updateTriggeredByZ = function(valueId){
      //this will update the corrispondent Z
      var myFinalValues = [];
      ac.tempNestedValues1[valueId].value = ac.myModel.baseValue * 20 / ac.tempNestedValues2[valueId].value;
      
      angular.forEach(ac.myModel.values,function(nestedValue){
        
        if(nestedValue.valueId===valueId){
          myFinalValues.push(ac.tempNestedValues1[valueId]);
        }else{
          myFinalValues.push(nestedValue);
        }
      });
      
      ac.myModel.values=myFinalValues;
    }
}]);