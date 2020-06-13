(function() {

    'use strict';
  
    var lastId = localStorage.getItem("PAnotacao");
    var taskWrapper = document.getElementById("task_wrapper");
    var btnSave = document.getElementById("save_task");
    var removeIcon;
    var updateIcon;
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
  
    //End Init
  
    //CRUD task
  
    function showList() {
  
      if (!!taskList.length) {
        for (var item in taskList) {
          var task = taskList[item];
          addTaskToList2(task);
        }
        syncEvents();
      }      
    } 

    function addTaskToList2(task) {
      if(task.taskId == lastId){
        document.getElementById("desc").value = task.taskDes;
        document.getElementById("cont").value = task.taskState;
      }
      var updateIcon = document.getElementById("edit");
      updateIcon.setAttribute("title", "Update");
    }
  
    function updateTask(event) {
  
      var taskId = lastId;
      var taskToUpdate = findTask(taskId).task;
      var pos = findTask(taskId).pos;
      if (!!taskToUpdate) {
        var des = document.getElementById("desc").value;
        var state = document.getElementById("cont").value;
        taskToUpdate.taskDes = des;
        taskToUpdate.taskState = state;
        taskList[pos] = taskToUpdate;
        syncTask();
      }
    }
  
    function removeTask(event) {
  
      var taskId = lastId;
      taskList.forEach(function(value, i) {
        if (value.taskId == taskId) {
          taskList.splice(i, 1);
        }
      })
      syncTask();
      window.open('listagemAnotacoes.html', '_self');
    }
    // End CRUD
    //Common
  
    function syncTask() {
      window.localStorage.setItem('taskList', JSON.stringify(taskList));
      taskList = JSON.parse(window.localStorage.getItem('taskList'));
    }

    function syncEvents() {
      updateIcon = document.getElementsByClassName("button2");
      removeIcon = document.getElementsByClassName("buttondelet");
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
    //End Common
    init();
  })();