function displayWindowSize(){
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    
    // Display result inside a div element
    console.log(w)
    if(w >= 415){
        document.getElementById("banner").style.padding = "74px 0px 0px 0px";
        return;
    }
    if(w >= 359){
        document.getElementById("banner").style.padding = "114px 0px 0px 0px";
        return;
    }
    if(w >= 355){
        document.getElementById("banner").style.padding = "134px 0px 0px 0px";
        return;
    } else {
        document.getElementById("banner").style.padding = "174px 0px 0px 0px";
        return;
    }
}
    
// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);

// Calling the function for the first time
displayWindowSize();