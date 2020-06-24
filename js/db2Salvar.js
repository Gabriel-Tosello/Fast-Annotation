(function() {

    'use strict';
  
    var lastId = 0;
    var taskWrapper = document.getElementById("task_wrapper");
    var btnSave = document.getElementById("save_task");
    var removeIcon;
    var updateIcon;
    var tabLista;
  
    // Initialize tabLista 
    // Add event to save button
    // Render the list
  
    function init() {
      if (!!(window.localStorage.getItem('tabLista'))) {
        tabLista = JSON.parse(window.localStorage.getItem('tabLista'));
      } else {
        tabLista = [];
      }
      btnSave.addEventListener('click', saveTask);
      showList();
    }
  
    //End In
  
    //CRUD task
  
       function showList() {
  
      if (!!tabLista.length) {
        getLastTaskId();
        for (var item in tabLista) {
          var task = tabLista[item];
          //addTaskToList(task);
        }
        syncEvents();
      }
      
    } 
  
    function saveTask(event) {
      var items = [],i;
      for( i=0; i < document.getElementsByClassName("item").length;i++) {
        items[i] = document.getElementsByClassName("item")[i].value;
      }
      var task = {
        taskId: lastId,
        taskDes: document.getElementById("nome").value,
        taskState: items     
      };
      tabLista.push(task);
      syncTask();
      //addTaskToList(task);
      syncEvents();
      lastId++;    
      
    }
  
    /* function addTaskToList(task) {
  
      var removeIcon = document.createElement('span');
      var element = document.createElement('li');
      var updateIcon = document.createElement('span');
  
      removeIcon.innerHTML = "X";
      removeIcon.className = "remove_item clickeable";
      removeIcon.setAttribute("title", "Remove");
  
      updateIcon.innerHTML = "U";
      updateIcon.className = "update_icon clickeable";
      updateIcon.setAttribute("title", "Update");
  
  
      element.appendChild(removeIcon);
      element.appendChild(updateIcon);
      element.setAttribute("id", task.taskId);
      element.innerHTML += task.taskDes;
      taskWrapper.appendChild(element);
    } */
  
    function updateTask(event) {
  
      var taskTag = event.currentTarget.parentNode;
      var taskId = taskTag.id;
      var taskToUpdate = findTask(taskId).task;
      var pos = findTask(taskId).pos;
      if (!!taskToUpdate) {
        var des = prompt("Task Description", taskToUpdate.taskDes);
        var state = prompt("Task State", taskToUpdate.taskState);
        taskToUpdate.taskDes = des;
        taskToUpdate.taskState = state;
        tabLista[pos] = taskToUpdate;
        taskTag.lastChild.textContent = taskToUpdate.taskDes;
        syncTask();
      }
    }
  
    function removeTask(event) {
  
      var taskToRemove = event.currentTarget.parentNode;
      var taskId = taskToRemove.id;
      taskWrapper.removeChild(taskToRemove);
      tabLista.forEach(function(value, i) {
        if (value.taskId == taskId) {
          tabLista.splice(i, 1);
        }
      })
  
      syncTask();
    }
  
    // End CRUD
  
  
    //Common
  
    function syncTask() {
  
      window.localStorage.setItem('tabLista', JSON.stringify(tabLista));
      tabLista = JSON.parse(window.localStorage.getItem('tabLista'));
    }
  
    function getLastTaskId() {
      var lastTask = tabLista[tabLista.length - 1];
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
      tabLista.forEach(function(value, i) {
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