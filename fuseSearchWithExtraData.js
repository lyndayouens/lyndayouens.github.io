//Fusesearch is the enclosed main search function

var FuseSearch = (function () {
    "use strict"; //Used strict jshint formatting checks
    var pub = {}; //The enclosing object variable
    var result;
    var target;
    //Hard coded list of objects. It was too problematic getting a JSON file to talk with the Fuse library, so the data is enclosed in this javascritp array of object instead.
    //This array is an edited version of the JSON file with quotes and commas edited out.  Seems this the format that Fusejs likes best.
    var list = [
        
        {
            name: JSON.stringify({name:"Lentune", //This first field has been turned into string object
                url:"https://cookbrothers.lentune.co.nz"}),
            adname: "App Portal Group - Lentune",
            keywords: "lentune purchase orders invoices job order supplier pricing accounting expenses variation",
            description: "Create purchase orders and approve invoices. Get approval to issue a purchase order",
            icon: "TBA",
            link: "https://cookbrothers.lentune.co.nz"
        },
        {
            name: JSON.stringify({name:"Timesheets",
            url: "http://timesheets.cookbrothers.co.nz/web_admin/index.php"}),
            adname: "App Portal Group - Timesheets",
            keywords: "Timesheets Timesheet",
            description: "",
            icon: "TBA",
            link: "http://timesheets.cookbrothers.co.nz/web_admin/index.php"
        },
        {
            name: JSON.stringify({name:"Procore",
            url: "https://app.procore.com/5391/company/home/list"}),
            adname: "App Portal Group - Procore",
            keywords: "Procore, construction, tenders",
            description: " his app does a lot of things related to construction. At the moment we mostly use it for sharing drawings with contractors and workers on site and also managing tender invites. This program is really big and has dedicated apps for managing files that are in the system etc. There is also a mobile app. ",
            icon: "TBA",
            link: "https://app.procore.com/5391/company/home/list" 
        },
        {
            name: JSON.stringify({name:"Hilti",
            url: "https://ontrack.hilti.com/ontrack/app.html#/dashboard"}),
            adname: "App Portal Group - Hilti",
            keywords: "Asset, equipment, equipment list, Hilti, Ontrack, ON!Track",
            description: " An asset management system, we use it to know who has what equipment and where it is supposed to be.",
            icon: "TBA",
            link: "https://ontrack.hilti.com/ontrack/app.html#/dashboard" 
        },
        {
            name: JSON.stringify({name:"Helpdesk ",
            url: "http://helpdesk.cookbrothers.co.nz/support/home"}),
            adname: "App Portal Group Hilti",
            keywords: "Helpdesk Help ticket IT Accounts Knowledge Base KB solutions forum",
            description: "Submit tickets for any problems you may have including IT Accounts HR You can also submit a ticket by emailing helpdesk@cookbrothers.co.nz",
            icon: "TBA",
            link: "http://helpdesk.cookbrothers.co.nz/support/home " 
        },
        {
            name: JSON.stringify({name:"Hilti",
            url: "https://ontrack.hilti.com/ontrack/app.html#/dashboard"}),
            adname: "App Portal Group - Hilti",
            keywords: "Asset, equipment, equipment list, Hilti, Ontrack, ON!Track",
            description: " An asset management system, we use it to know who has what equipment and where it is supposed to be.",
            icon: "TBA",
            link: "https://ontrack.hilti.com/ontrack/app.html#/dashboard" 
        },
        {
            name: JSON.stringify({name:"Health_&_Safety",
            url: "https://www.bware.co.nz/safetymanager-app/management/startuppage"}),
            adname: "App Portal Group - Hilti",
            keywords: "Bware Health Safety training incident incidents hazard hazards site Responder workplace harm emergency substance training incident worker contractor equipment",
            description: "Keep up with your training and lodge any incidents or hazards you may have encountered on site Bware",
            icon: "TBA",
            link: "https://www.bware.co.nz/safetymanager-app/management/startuppage " 
        },
        {
            name: JSON.stringify({name:"Security_Cameras ",
            url: "http://cameracook.synology.me:5000/cam/"}),
            adname: "App Portal Group - Hilti",
            keywords: "Security cameras livestream footage sites site timelapse surveillance IP live view timeline recording",
            description: "Our portal for security cameras You can go here to see security footage live streams and timelapses from the sites you are involved with",
            icon: "TBA",
            link: "http://cameracook.synology.me:5000/cam/" 
        },
        {
            name: JSON.stringify({name:"Site Sign-in",
            url: "https://login.whosonlocation.com/login"}),
            adname: "App Portal Group - Hilti",
            keywords: "Site sign in site WhosOnLocation Who on location job",
            description: "Site Sign-in WhosOnLocation is an app we use for site sign-ins",
            icon: "TBA",
            link: "https://login.whosonlocation.com/login" 
        },
        {
            name: JSON.stringify({name:"Video Conferencing",
            url: "https://login.lifesizecloud.com/ls/login/"}),
            adname: "App Portal Group - Hilti",
            keywords: "Site sign in site WhosOnLocation Who on location job",
            description: "Our video conferencing software Mobile and desktop apps available As well as ability to dial into a call with your phone Lifesize",
            icon: "TBA",
            link: "https://login.lifesizecloud.com/ls/login/" 
        },
        {
            name: JSON.stringify({name:"Induction Training",
            url: "https://cookbrothers.brackenlearning.com/"}),
            adname: "App Portal Group - Hilti",
            keywords: "Induction orientation training Bracken Bracken learning new staff start starter",
            description: "Induction training for new starters contractors Bracken",
            icon: "TBA",
            link: "https://cookbrothers.brackenlearning.com/" 
        },
        {
            name: JSON.stringify({name:"MS Office",
            url: "http://portal.office.com"}),
            adname: "App Portal Group - Hilti",
            keywords: "Office Microsoft MS download projects Word Excel Projects Outlook Powerpoint Publisher OneNote SharePoint Teams OneDrive Sway Dynamics Flow Planner PowerApps Yammer portal Access",
            description: "Download office here. Includes Microsoft Projects",
            icon: "TBA",
            link: "http://portal.office.com" 
        },
        {
            name: JSON.stringify({name:"Adobe",
            url: "https://account.adobe.com/"}),
            adname: "App Portal Group - Hilti",
            keywords: "Adobe Creative Suite download Acrobat DC Pro Reader Photoshop Illustrator InDesign XD Lightroom Premiere Pro Premiere Rush After Effects Bridge Adobe Fonts Adobe Stock Behance Portfolio Spark Adobe Color Lightroom Classic Dimension Dreamweaver Animate and Mobile Device Packaging Character Animation  Audition Media Encoder Adobe Live",
            description: "Place to go if you need to download your adobe apps Either Acrobat DC Pro or the Full creative suite depending on the user",
            icon: "TBA",
            link: "https://account.adobe.com/" 
        },
        {
            name: JSON.stringify({name:"Company Drive",
            url: "http://drive.cookbrothers.co.nz"}),
            adname: "App Portal Group - Hilti",
            keywords: "Drive file sharing Bitrix Intranet Get Link Share link Home Drive Personal Drive folder Job Number Universal Search",
            description: "Company drive, file sharing",
            icon: "TBA",
            link: "http://drive.cookbrothers.co.nz" 
        },
        {
            name: JSON.stringify({name:"Email",
            url: "http://mail.cookbrothers.co.nz"}),
            adname: "App Portal Group - Hilti",
            keywords: "Email, Outlook, Kerio, Mail, Calendar, Contacts, Company address book",
            description: "Email online access, email web service",
            icon: "TBA",
            link: "http://mail.cookbrothers.co.nz" 
        }
    ];

    //This objects sets up the search functionality parameters that are used with fuse.js
    var options = {
        id: "name", //This is the unique value used to identify each of the app objects in the data array called list
        shouldSort: true, //These are all the default settings, but can be changed if one reads up on what each does in the fuzzy search algorithm
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [ //These are the key value pairs that are to be searched and matched with the app portal name from the name property from each app object.  
            "description",
            "keywords"
            
        ]
    };
    var searchInput = document.getElementById("search");//Gets the search text from the search input
    //If there is nothing in the list, then clear the list from the search bar 
    function clear(){
        var el = document.getElementById("myUl");
        if (el != null) {
            el.parentNode.removeChild(el);
        }
    }


    //setup attaches event listener to button and add options.  JSON. stringify and dump back into div.
    pub.setup = function () {

        
        var search = document.getElementById("search"); //Sets up the event listener to get the search input box element and store values in the search variable
        var searchBtn = document.getElementById("searchBtn"); //Sets up the event listener for the button and stores it in variable searchBtn
        target = document.getElementById("results"); //Sets the results div as target
        var i;                                         //Loop counter
        var outStr;

        searchBtn.onclick = doSearch;                   //Calls the doSearch function when the search button is clicked

        search.onkeydown = function() {                 //Detects if the enter key is pressed while the search input box is active
            var key = event.keyCode || event.charCode;  //Detects the enter key from different browser or OS setups

            if(key == 8 || key == 46){                  //Checks if the key is backspace or delete
                clear();                                //If either of those keys are pressed the clear function is called
            }else if(key == 13){                        //Or else if the enter key is pressed, the doSearch function is called
                doSearch();
            }
        };
        


        //Check if result is null and print out a suitable statment
       /*if (result == null) {
            target.innerHTML = "<pYour search returned zero results, please try a new search term.</p>";


        } else {
            for (i = 0; i < result.length; i++) {
                outStr = result[i];

            }

        }*/
        //target.innerHTML = outStr;
    }

    function doSearch() {
        var parsobj = [];
        var j;
        var text;
        var li;
        var link = [];
        var fuse = new Fuse(list, options); // "list" is the item array from the data above and the options are from the object above.  These are fed into the fuse search
        var result = fuse.search(searchInput.value); //The results from the fuse search outputs are stored in the result array

        document.getElementById("results").innerHTML = ""; //???????????
        clear();                                            //??????????

        /*
        for(j=0; j<result.length; j++){
            console.log( JSON.parse(result[j]));
            parsobj[j] =  JSON.parse(result[j]);
            alert(parsobj[j]);
        }
        */
        if (result.length == 0) {                           //If the search input is empty return the message below to prompt a new search
            target.innerHTML = "Your search returned zero results, please try a new search term.";


        } else {

            var ul = document.createElement("ul");          //Create a new unordered list element called ul
            ul.setAttribute("id", "myUl");                  //?????

            // loop over result
            result.forEach(function (item) {                //Where does item come from???????????
                
                var currentItem = JSON.parse(item);         //Take the current item from the array of results, parses it back into an object and stores it in current item
                var li = document.createElement("li");      //Creates a new list element called "li" and stores it in li variable
                //var text = document.createTextNode(item);
                var a = document.createElement("a");        //??????? does this create a new anchor element???????
                a.href = currentItem.url;                   //Gets the url from the result currentitem object's url property and stores it as the reference for the a variable
                a.innerText = currentItem.name;             //Writes the name from the current item property and shows this as the text for the link in the search result list
                a.setAttribute("target", "_blank");         //This opens the anchor referred to in a new browser window
                li.appendChild(a);                          //Appends the link to the list element
                ul.appendChild(li);                         //Appends the list element to the unordered list
            });

            document.getElementById("dropDown").appendChild(ul);//Appends the unordered list of results to the dropdown in the html
            return false;                                      //?????????
        }
    }


    return pub;     //Returns values from the enclose function

}());


    if (window.addEventListener) {
        window.addEventListener('load', FuseSearch.setup);
    } else if (window.attachEvent) {
        window.attachEvent('onload', FuseSearch.setup);
    } else {
        alert("Could not attach 'fuseSearch.setup' to the 'window.onload' event");
    }



