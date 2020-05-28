(function() {

    'use strict';
  
    var lastId = localStorage.getItem("PAnotacao");;
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
      //btnSave.addEventListener('click', saveTask);
      showList();
    }
  
    //End Init
  
    //CRUD task
  
    function showList() {
  
      if (!!taskList.length) {
        for (var item in taskList) {
          var task = taskList[item];
          
          //addTaskToList(task);
          addTaskToList2(task);
        }
        syncEvents();
      }      
    } 

    function showList2() {
  
      if (!!taskList.length) {
        getLastTaskId();
        for (var item in taskList) {
          var task = taskList[item];
          
          //addTaskToList(task);
          addTaskToList2(task);
        }
        syncEvents();
      }
    } 
  
    function saveTask(event) {
  
      var task = {
        taskId: lastId,
        taskDes: document.getElementById("nome").value,
        taskState: document.getElementById("conteudo").value
      };
      taskList.push(task);
      syncTask();
      //addTaskToList(task);
      syncEvents();
      lastId++;
    }
  
     function addTaskToList(task) {
  
      //var removeIcon = document.createElement('span');
      //var element = document.createElement('li');
      var updateIcon = document.getElementById("desc");
  
      //removeIcon.innerHTML = "Deletar |";
      //removeIcon.className = "remove_item clickeable";
      //removeIcon.setAttribute("title", "Remove");
  
      //updateIcon.innerHTML = " Atualizar | ";
      //updateIcon.className = "update_icon clickeable";
      updateIcon.setAttribute("title", "Update");
  
  
      //element.appendChild(removeIcon);
      element.appendChild(updateIcon);
      element.setAttribute("id", task.taskId);
      element.innerHTML += task.taskDes;
      taskWrapper.appendChild(element);
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
      removeIcon = document.getElementsByClassName("btn");
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