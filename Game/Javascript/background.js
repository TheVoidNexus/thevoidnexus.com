function colormode() {
    
    function colormode() {
        const coloricon = document.getElementById('coloricon');
        let setting = localStorage.getItem('Colormode');
    
        if (setting == "light") {
            applyLightMode();
        } else if (setting == "dark") {
            applyDarkMode();
        } else if (setting == null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyDarkMode(); 
        } else {
            applyLightMode();
        }
    
        coloricon.addEventListener("click", function() {
            if (setting == "light") {
                localStorage.setItem('Colormode', "dark");
                applyDarkMode();
            } else { 
                localStorage.setItem('Colormode', "light");
                applyLightMode();
            }
    
            setting = localStorage.getItem('Colormode');
        });
    }

    function applyLightMode() {
        document.getElementById('stylesheet').disabled = false;
        document.getElementById('lightstyle').disabled = false;

        document.getElementById('mstylesheet').disabled = false;
        document.getElementById('mlightstyle').disabled = false;
    }
    
    function applyDarkMode() {
        document.getElementById('stylesheet').disabled = false;
        document.getElementById('lightstyle').disabled = true;
    
        document.getElementById('mstylesheet').disabled = false;
        document.getElementById('mlightstyle').disabled = true;
    }
    colormode();
}

colormode();
