function updateBannerPadding(){
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;
    
    // Display result inside a div element
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

function updateBannertext(){
    var w = document.documentElement.clientWidth;

    if(w < 553){
        document.getElementById("bannerCatchPhrase").style.display = "none";
        document.getElementById("bannerBrandName").style.bottom = "-10px";
    } else{
        document.getElementById("bannerCatchPhrase").style.display = "block";
        document.getElementById("bannerBrandName").style.bottom = "20px";
    }
    return
}
    
// Attaching the event listener function to window's resize event
window.addEventListener("resize", () => {
    updateBannerPadding();
    updateBannertext();
}, false);

// Calling the function for the first time
updateBannertext();
updateBannerPadding();