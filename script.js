// src="https://maps.google.com/maps?q=18.6022,73.898&z=15&output=embed"

let btn = document.getElementById('getLocation');
let map = document.querySelector('iframe');
let removeBtn = document.getElementById('removeLocation');

// console.log(map);
if(localStorage.getItem('location') != null){
    btn.disabled = true;
    removeBtn.disabled = false;
    let location =JSON.parse(localStorage.getItem('location'));
    map.src = `https://maps.google.com/maps?q=${location.lat},${location.long}&z=15&output=embed`
}else{
    removeBtn.disabled = true;
    map.src = "https://maps.google.com/maps?q=&z=15&output=embed&"
}

btn.addEventListener('click',()=>{
    if(getLocation()){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("error");
        let p =document.createElement('p');
        p.style.color = "red";
        p.innerHTML = "Oops Something is wrong!!";
        document.body.appendChild(p);
    }
})

function getLocation(){
    return navigator.geolocation;
    // return false;
}

// console.log(getLocation());

function showPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude,longitude);
    let location = {};
    location.lat = latitude;
    location.long = longitude;
    console.log(location);
    localStorage.setItem('location',JSON.stringify(location));
    map.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    btn.disabled = true;
    removeBtn.disabled = false;
}


removeBtn.addEventListener('click',()=>{
    localStorage.removeItem('location');
    btn.disabled = false;
    removeBtn.disabled = true;
    map.src = "https://maps.google.com/maps?q=&z=15&output=embed&"
})