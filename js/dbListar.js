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

  
        function syncTask() {
  
          window.localStorage.setItem('taskList', JSON.stringify(taskList));
          taskList = JSON.parse(window.localStorage.getItem('taskList'));
        }
      
        function getLastTaskId() {
          var lastTask = taskList[taskList.length - 1];
          lastId = lastTask.taskId + 1;
        }
      
        function syncEvents() {
      
          updateIcon = document.getElementsByClassName("update_icon");
          removeIcon = document.getElementsByClassName("remove_item");
          if (!!removeIcon.length) {
            for (var i = 0; i < removeIcon.length; i++) {
              removeIcon[i].addEventListener('click', removeTask);
            }
          }
          if (!!updateIcon.length) {
            for (var j = 0; j < updateIcon.length; j++) {
              updateIcon[j].addEventListener('click', updateTask);
            }
          }
        }
      
        function findTask(id) {
      
          var response = {
            task: '',
            pos: 0
          };
          taskList.forEach(function(value, i) {
            if (value.taskId == id) {
              response.task = value;
              response.pos = i;
            }
          });
      
          return response;
        }
    init();
  })();