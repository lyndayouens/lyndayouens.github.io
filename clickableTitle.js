var clickableTooltip = (function(){
    var pub = {};
    var titleEls;

    function showTooltip() {
        var title = this.querySelectorAll(".clickableTitle");
        if (!title.length) {
            pub.hideTooltips();
            var title = document.createElement("span");
            title.innerText = this.getAttribute("title");
            title.classList.add("clickableTitle");
            var rect = this.getBoundingClientRect();
            title.style.top = rect.top + this.clientHeight + "px";
            this.appendChild(title);
        } else {
            pub.hideTooltips();
        }
    }

    pub.hideTooltips = function() {
        var title = document.querySelectorAll(".clickableTitle");
        var i;
        if (title.length) {
            for (i = 0; i < title.length; i += 1) {
                title[i].parentNode.removeChild(title[i]);
            }
        }
    }

    pub.dismissAllTooltips = function(event) {
        if (!event.target.matches(".AppName")) {
            pub.hideTooltips();
        }
    };


    pub.setup = function() {
        titleEls = document.querySelectorAll("[title]");
        var i;
        for (i = 0; i < titleEls.length; i+=1) {
            titleEls[i].addEventListener("click", showTooltip);
        }
        document.addEventListener("click", pub.hideTooltips());
    };
    return pub;
})();

if(window.addEventListener) {
    window.addEventListener("load", clickableTooltip.setup);
    window.onclick = clickableTooltip.dismissAllTooltips;
}else if(window.attachEvent) {
    window.attachEvent("onload", clickableTooltip.setup);
    window.onclick = clickableTooltip.dismissAllTooltips;
}else{
    console.log("Could not attach 'clickableTooltip.setup' to the 'window.onload' event");
}