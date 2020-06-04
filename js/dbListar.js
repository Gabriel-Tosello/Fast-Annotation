(function() {

    'use strict';
  
    var lastId = 0;
    var taskWrapper = document.getElementById("task_wrapper");
    var taskList;
  
    // Initialize taskList 
    // Add event to save button
    // Render the list
  
    function init() {
  
      if (!!(window.localStorage.getItem('taskList'))) {
        taskList = JSON.parse(window.localStorage.getItem('taskList'));
      } else {
        taskList = [];
      }
      showList();
    }
    //End Ini  
    //CRUD task 
    function showList() {
  
      if (!!taskList.length) {
        getLastTaskId();
        for (var item in taskList) {
          var task = taskList[item];
          addTaskToList2(task);
        }
      }
    } 
    function addTaskToList2(task) {
  
      var element = document.createElement('button');
      element.setAttribute("class", "quadrado_anotacao");
      element.setAttribute("id", task.taskId);
      element.innerHTML += task.taskDes;
      taskWrapper.appendChild(element);
    }
    // End CRUD

    //Common
    function getLastTaskId() {
      var lastTask = taskList[taskList.length - 1];
      lastId = lastTask.taskId + 1;
    }
  
    //End Common 
    init();
  })();