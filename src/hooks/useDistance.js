import { useState } from "react";

const distanceBetweenPoints = (lat1, lon1, lat2, lon2)=> {
    const R = 6371e3;
    const p1 = lat1 * Math.PI/180;
    const p2 = lat2 * Math.PI/180;
    const deltaP = p2 - p1;
    const deltaLon = lon2 - lon1;
    const deltaLambda = (deltaLon * Math.PI) / 180;
    const a = Math.sin(deltaP/2) * Math.sin(deltaP/2) +
              Math.cos(p1) * Math.cos(p2) *
              Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * R;
    return d;
}

const office = {
    latitude: -6.2549872,
    longitude: 106.8267328
}

const useDistance = () => {
    const [location, setLocation] = useState({})

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            return "Geolocation is not supported by this browser.";
        }
    }
    
    const showPosition = (position) => setLocation({
        latitude:position.coords.latitude, longitude:position.coords.longitude
    })

    getLocation()

    return Math.round(distanceBetweenPoints(location.latitude, location.longitude, office.latitude, office.longitude))
}

export default useDistance