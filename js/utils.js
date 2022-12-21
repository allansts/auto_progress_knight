function softcap(value, cap, power = 0.5) {
	if (value <= cap) return value
    
    return Math.pow(value, power) * Math.pow(cap, 1 - power)
}

function format(number, decimals = 1) {
    const units = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Od", "Nd", "V", "Uv", "Dv", "Tv",
    "Qav", "Qiv", "Sxv", "Spv", "Ov", "Nv", "Tr", "Ut", "Dt", "Tt"]

    // what tier? (determines SI symbol)
    const tier = Math.log10(number) / 3 | 0;
    if (tier <= 0) return math.floor(number, decimals).toFixed(decimals);

    if ((gameData.settings.numberNotation == 0 || tier < 3) && (tier < units.length)) {
        const suffix = units[tier];
        const scale = Math.pow(10, tier * 3);
        const scaled = number / scale;
        return math.floor(scaled, decimals).toFixed(decimals) + suffix;
    } else {
        if (gameData.settings.numberNotation == 1) {
            const exp = Math.log10(number) | 0;
            const scale = Math.pow(10, exp);
            const scaled = number / scale;
            return math.floor(scaled, decimals).toFixed(decimals) + "e" + exp;
        }
        else {
            const exp = Math.log10(number) / 3 | 0;
            const scale = Math.pow(10, exp * 3);
            const scaled = number / scale;
            return math.floor(scaled, decimals).toFixed(decimals) + "e" + exp * 3;
        }
    }
}

function formatCoins(coins, element) {
    const coinList = [
        { "name": "Rh", "color": "#D1D7D7", "value": 1e48 },
        { "name": "Pd", "color": "#79b9c7", "value": 1e45 },
        { "name": "Pt", "color": "#e5e4e2", "value": 1e40 },
        { "name": "g", "color": "#E5C100", "value": 1e34 },
        { "name": "s", "color": "#a8a8a8", "value": 1e30 },
        { "name": "i", "color": "#a19d94", "value": 1e28 },
        { "name": "c", "color": "#b87333", "value": 1e24 },
        { "name": "l", "color": "#ff0080", "value": 1e18 },
        { "name": "k", "color": "#80ff00", "value": 1e14 },
        { "name": "h", "color": "#ff00ff", "value": 1e12 },
        { "name": "g", "color": "#8000ff", "value": 1e10 },
        { "name": "f", "color": "#0000ff", "value": 1e8 },
        { "name": "e", "color": "#00ff00", "value": 1e6 },
        { "name": "d", "color": "#00ff80", "value": 1000 },
        { "name": "b", "color": "#00ffff", "value": 100 },
        { "name": "a", "color": "#0080ff", "value": 1 },
    ]

    for (const c of element.children) {
        c.textContent = "";
    }

    let elementIndex = 0
    for (let i = 0; i < coinList.length; i++) {
        const money = coinList[i];
        const prev = coinList[i - 1];
        const diff = prev ? prev.value / money.value : Infinity;
        const amount = Math.floor(coins / money.value) % diff;
        if (amount > 0) {
            element.children[elementIndex].textContent = format(amount, amount < 1000 ? 0 : 1) + money.name
            element.children[elementIndex].style.color = money.color
            elementIndex++
        }
        if (elementIndex >= 2 || amount >= 100) break;
    }
}

function formatTime(sec_num, show_ms=false) {
    if (sec_num == null) {
        return "unknown"
    }

    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    let seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60))
    let ms = Math.floor((sec_num - Math.floor(sec_num)) * 1000)
    let mss = (show_ms ? "." + ms.toString().padStart(3, "0") : "")

    if (hours < 10) hours = "0" + hours
    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds
    return hours + ':' + minutes + ':' + seconds + mss   
}

function formatAge(days) {
    const years = daysToYears(days)
    const day = getCurrentDay(days)
    if (years > 10000)    
        return "Age: " + format(years)    
    else
        return "Age: " + years + " Day " + day
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function yearsToDays(years) {
    return years * 365
}

function daysToYears(days) {
    return Math.floor(days / 365)
}
 
function getCurrentDay(days) {
    return Math.floor(days - daysToYears(days) * 365)
}

function getElementsByClass(className) {
    return document.getElementsByClassName(removeSpaces(className))
}

function removeSpaces(string) {
    return string.replace(/ /g, "")
}