
// Storage controller
const StorageCtrl = (function(){
    return{
        storeItem: function(item){
            let items;
            
            // Check if any items in local storage (ls)
            if(localStorage.getItem('items') === null){
                items = [];
                // Push new item
                items.push(item);
                // Set ls
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                // Get what already in ls
                items = JSON.parse(localStorage.getItem('items'));

                // Push new item
                items.push(item);

                // Re set ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            }
            else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },

        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items',JSON.stringify(items));
        }
    }
})();

// Item controller
const ItemCtrl = (function(){
    // Item constructor
    const Item = function(id, todayDate, depressRate, elevatedRate, anxietyRate, irritateRate){
        this.id = id;
        this.todayDate = todayDate;
        this.depressRate = depressRate;
        this.elevatedRate = elevatedRate;
        this.anxietyRate = anxietyRate;
        this.irritateRate = irritateRate;
    }

    // Data structure
    const data = {
        items: StorageCtrl.getItemFromStorage(),
        currentItem: null,
        message: ''
    }

    return {
        getItems: function(){
            return data.items;
        },

        addItem: function(depressRate, elevatedRate, anxietyRate, irritateRate){

            let todayDate = new Date().toISOString().slice(0,10);
            console.log(todayDate);
            
            // Generate id
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            }else{
                ID = 0;
            }

            // Create new item
            newItem = new Item(ID, todayDate, depressRate, elevatedRate, anxietyRate, irritateRate);
            // Add to item array
            data.items.push(newItem);
            return newItem;
        },

        deleteItem: function(id){
            // Get ids
            const ids = data.items.map(function(item){
                return item.id;
            });

            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        getItemById: function(id){
            let found = null;
            // Loop through the items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }

            });
            return found;
        },

        getMessage: function(){
            let message = '';

            data.items.forEach(function(item){
                if(item.depressRate == "Severe" && item.anxietyRate == "Severe" && item.irritateRate == "Severe" && (item.elevatedRate == "Moderate" || item.elevatedRate == "Mild" || item.elevatedRate == "None")){
                    message = 'You are undergoing severe state of depression today. Please take a rest from what you are doing. If possible, get yourself some sweets or desserts or treat yourself something new.'+
                    'Surround yourself with positive people. Take a deep breathe. You might also want to go for a walk and have someone to talk to. If it does not get better, please consult with a therapist.';
                }
                else if(item.depressRate == "Moderate" && item.anxietyRate == "Moderate" && item.irritateRate == "Moderate" && (item.elevatedRate == "Moderate" || item.elevatedRate == "Mild" || item.elevatedRate == "None")){
                    message = 'Moderate depression is marked by two main symptoms: persistent low mood and decreased interest in activities. '+
                    'Moderate depression may be treated with psychotherapy, medication, or a combination of the two. '+
                    'Stress can contribute to and worsen symptoms of moderate depression, so finding ways to relax and manage your stress levels can be helpful.'+
                    'One way to do this is to focus on relaxation techniques designed to improve your ability to tolerate and manage distressing emotions.'+
                    'While it may require extra effort, doing some of the following can help you feel better:'+

                    ' (1) Eat a healthy diet'+
                    ' (2) Seek out social support'+
                    ' (3) Engage in activities you enjoy';
                }
                else if(item.depressRate == "Mild" && item.anxietyRate == "Mild" && item.irritateRate == "Mild" && (item.elevatedRate == "Moderate" || item.elevatedRate == "Mild" || item.elevatedRate == "None")){
                    message = 'If a person experiences a persistent low mood for 2 weeks or more, they may have depression. A doctor can often help.'+
                    'Many online tests claim to be able to identify depression. The PHQ-9 test uses professional '+
                    'diagnostic criteria and has nine questions. Doctors often use these questions to help identify depression.'+
                    'People with mild depression can ask their doctor about medication, but they may prefer to start with lifestyle alterations.'+
                    'Experts have suggested that making changes in the following may help:'+

                    ' (1) diet'+
                    ' (2) exercise level'+
                    ' (3) recreational activities, which can offer distraction and social interaction'+
                    ' (4) music therapy'+
                    ' (5) relaxation and meditation'+
                    ' (6) sleep habits';
                }
                else if(item.elevatedRate == "Severe"){
                    message = 'Yeayy! You managed to have a good day despite it all. ';
                }
                else{
                    message = 'Your mood today is average. Do not forget to give extra care on your mental health. You got this!';
                }
                
            });

            data.message = message;
            return data.message;
        },

        logData: function(){
            return data;
        }
    }
})();



//UI controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',

        depressRate: '#depressRate',
        elevatedRate: '#elevatedRate',
        anxietyRate: '#anxietyRate',
        irritateRate: '#irritateRate',

        message: '.message'
    }
   
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function (item){
                html += `<li class="list-group-item d-flex justify-content-between align-items-center" id="item-${item.id}">
                <em>${item.todayDate}</em>

                <strong>Depression: </strong>
                <em>${item.depressRate}</em>

                <strong>Elevated: </strong>
                <em>${item.elevatedRate}</em>

                <strong>Anxiety: </strong>
                <em>${item.anxietyRate}</em>

                <strong>Irritability: </strong>
                <em>${item.irritateRate}</em>
                <small class="text-muted">
                 <a href="#" class=""><i class="edit-item fa fa-pencil"></i></a>
                </small>
             </li>`;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function(){
            return {
                depressRate: document.querySelector(UISelectors.depressRate).options[depressRate.selectedIndex].value,
                elevatedRate: document.querySelector(UISelectors.elevatedRate).options[elevatedRate.selectedIndex].value,
                anxietyRate: document.querySelector(UISelectors.anxietyRate).options[anxietyRate.selectedIndex].value,
                irritateRate: document.querySelector(UISelectors.irritateRate).options[irritateRate.selectedIndex].value,

                /*
                depression: document.querySelector(UISelectors.depression),
                elevated: document.querySelector(UISelectors.elevated),
                anxiety: document.querySelector(UISelectors.anxiety),
                irritability: document.querySelector(UISelectors.irritability)
                */
            }
        },

        addListItem: function(item){
            //Show the list
            document.querySelector(UISelectors.itemList).style.display="block";
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            // Add id
            li.id =  `item-${item.id}`;

            // Add HTML
            li.innerHTML = `
            <em>${item.todayDate}</em>
            
            <strong>Depression: </strong>
            <em>${item.depressRate}</em>

            <strong>Elevated: </strong>
            <em>${item.elevatedRate}</em>

            <strong>Anxiety: </strong>
            <em>${item.anxietyRate}</em>

            <strong>Irritability: </strong>
            <em>${item.irritateRate}</em>
            <small class="text-muted">
                <a href="#" class=""><i class="edit-item fa fa-pencil"></i></a>
            </small>
            `;

            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement(`beforeend`, li);
        },

        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        addItemToForm: function(){
            UICtrl.showEditState();
            
        },

        showMessage: function(message){
            document.querySelector(UISelectors.message).textContent = message;
        },

        clearEditState: function(){
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function(){
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: function(){
            return UISelectors;
        }
    }
})();



//App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function(){

        // Get UI Selector
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Edit icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

        // Edit icon click
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState)
    }

    // Add item submit
    const itemAddSubmit = function(e){
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        const newItem = ItemCtrl.addItem(input.depressRate, input.elevatedRate, input.anxietyRate, input.irritateRate);
        
        // Add item to UI list
        UICtrl.addListItem(newItem);

        // Get message output
        const message = ItemCtrl.getMessage();

        // Add message to UI
        UICtrl.showMessage(message);

        // Store in local storage
        StorageCtrl.storeItem(newItem);

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function(e){
        if(e.target.classList.contains('edit-item')){
           // Get list item id
           const listId = e.target.parentNode.parentNode.parentNode.id;
           
           // Break into an array
           const listIdArr = listId.split('-');

           // Get actual id
           const id = parseInt(listIdArr[1]);
            console.log(id);
           // Get item
           const itemToEdit = ItemCtrl.getItemById(id);
           
           // Set current item
           ItemCtrl.setCurrentItem(itemToEdit);

           // Add item to form
           UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Delete item submit
    const itemDeleteSubmit = function(e){
        //Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        e.preventDefault();
    }
    
    return {
        init: function(){
            // State initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }
            else{
                
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            loadEventListeners();

        }
    }
   
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
