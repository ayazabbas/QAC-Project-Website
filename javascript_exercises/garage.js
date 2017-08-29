"use strict";

let vehicleList = [];
let garageVehicleList = [];

class Vehicle {
    constructor(type, reg, faults) {
        this.type = type;
        this.reg = reg;
        if (faults == null) {
            this.faults = ["none"];
        } else {
            if (faults[0].replace(/ /g, '') == "") {
                this.faults = ["none"];
            } else {
                this.faults = faults;
            }
        }
    }

    displayFaults() {
        let result = "";
        if (this.faults != null) {
            this.faults.forEach((f) => {
                result += f + "\n";
            });
        }
        return result;
    }
}

function addVehicle() {
    let type = document.getElementById("selectType").value;
    let reg = document.getElementById("inputReg").value;
    let faults = document.getElementById("txtAreaFaults").value.match(/[^\r\n]+/g);
    let vehicle = new Vehicle(type, reg, faults);
    if (reg == null) {
        alert("Please enter registration number.");
    } else {
        reg = reg.toUpperCase();
    }
    vehicleList.push(vehicle);
    updateVehicles(document.getElementById("selectVehicles"), vehicleList);
    document.getElementById("formNewVehicle").reset();
}

function removeVehicles() {
    let selectVehicles = document.getElementById("selectVehicles");
    let indices = getSelectValues(selectVehicles);
    indices.sort();
    indices.reverse();
    indices.forEach((i) => {
        vehicleList.splice(i, 1);
    });
    updateVehicles(selectVehicles, vehicleList);
    document.getElementById("selectVehicles").onchange();
}

function updateVehicles(select, list) {
    select.innerHTML = "";
    list.forEach((a) => {
        select.innerHTML += `<option value=${list.indexOf(a)}>${a.type} - Registration: ${a.reg}`
    });
}

function showFaults(txtAreaId, selectBoxId, list) {
    let txtArea = document.getElementById(txtAreaId);
    let selectBox = document.getElementById(selectBoxId);
    txtArea.textContent = "";
    let indices = getSelectValues(selectBox);
    if (indices.length == 1) {
        txtArea.textContent = list[indices[0]].displayFaults();
    } else {
        txtArea.textContent = "";
    }
}

function getSelectValues(select) {
    let result = [];
    let options = select.options;
    let opt;
    for (let i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];
        if (opt.selected) {
            result.push(opt.value);
        }
    }
    return result;
}

function checkInVehicles() {
    let selectVehicles = document.getElementById("selectVehicles");
    let indices = getSelectValues(selectVehicles);
    if (indices.length > 0) {
        indices.forEach((i) => {
            garageVehicleList.push(vehicleList[i]);
        });
        indices.sort();
        indices.reverse();
        indices.forEach((i) => {
            vehicleList.splice(i, 1);
        });
        updateVehicles(selectVehicles, vehicleList);
        updateVehicles(document.getElementById("selectGarage"), garageVehicleList);
    } else {
        alert("Please select vehicles to check in.");
    }
    document.getElementById("selectVehicles").onchange();
}

function checkOutVehicles() {
    let selectGarage = document.getElementById("selectGarage");
    let indices = getSelectValues(selectGarage);
    indices.sort();
    indices.reverse();
    indices.forEach((i) => {
        vehicleList.push(garageVehicleList[i]);
        garageVehicleList.splice(i, 1);
    });
    updateVehicles(selectGarage, garageVehicleList);
    updateVehicles(document.getElementById("selectVehicles"), vehicleList);
    document.getElementById("selectGarage").onchange();
}

function fixVehicles() {
    let vehiclesFixed = 0;
    let selectGarage = document.getElementById("selectGarage");
    let indices = getSelectValues(selectGarage);
    indices.forEach((i) => {
        let vehicle = garageVehicleList[i];
        if (vehicle.faults[0] != "none") {
            vehiclesFixed += 1;
            vehicle.faults = ["none"];
        }
    });
    if (vehiclesFixed > 0) {
        showFaults('txtAreaShowFaultsGar', 'selectGarage', garageVehicleList);
        alert(`Fixed ${indices.length} vehicles. Total bill: ${document.getElementById("txtAreaBill").value}`);
        calculateBill();
    }
}

function calculateBill() {
    let selectGarage = document.getElementById("selectGarage");
    let indices = getSelectValues(selectGarage);
    let txtAreaBill = document.getElementById("txtAreaBill");
    let bill = 0;
    let faultMultiplier = 0;
    if (indices.length > 0) {
        indices.forEach((i) => {
            let vehicle = garageVehicleList[i];
            if (vehicle.faults[0] == "none") {
                console.log("no faults");
            } else {
                switch (vehicle.type) {
                    case ("car"):
                        bill += 100;
                        faultMultiplier = 70;
                        break;
                    case ("motorcycle"):
                        bill += 50;
                        faultMultiplier = 40;
                        break;
                    case ("truck"):
                        bill += 200;
                        faultMultiplier = 100;
                        break;
                }
                bill += faultMultiplier * vehicle.faults.length;
            }
        });
        txtAreaBill.textContent = "£" + bill;
    } else {
        txtAreaBill.textContent = "";
    }
}

// for the admin interface
function out(message) {
    let consoleDisplay = document.getElementById("consoleDisplay");
    consoleDisplay.textContent += message + "\n";
    consoleDisplay.scrollTop = consoleDisplay.scrollHeight;
}

function readCommand() {
    let vehicleSelectBox = document.getElementById("selectVehicles");
    let garageSelectBox = document.getElementById("selectGarage");
    let input = document.getElementById("commandInput");
    let command = input.value.toLowerCase();
    let found = false;
    let reg = "";
    let faults = "";
    switch (command.split(" ")[0]) {
        case "":
            break;
        case "create":
            reg = input.value.match(/reg:(.*)(?= faults:)+/g)[0].split("reg:")[1];
            faults = input.value.match(/faults:(.*)+/g)[0].split("faults:")[1].split(",");
            vehicleList.push(new Vehicle(command.split(" ")[1], reg, faults));
            updateVehicles(vehicleSelectBox, vehicleList);
            out(input.value);
            break;
        case "remove":
            reg = command.split("remove ")[1];
            vehicleList.forEach((v) => {
                if (v.reg === reg) {
                    found = true;
                    vehicleList.splice(vehicleList.indexOf(v), 1);
                }
            });
            updateVehicles(vehicleSelectBox, vehicleList);
            if (found) {
                out(input.value);
            } else {
                out(`No vehicle with registration ${reg}`)
            }
            break;
        case "checkin":
            reg = command.split("checkin ")[1];
            vehicleList.forEach((v) => {
                if (v.reg === reg) {
                    found = true;
                    garageVehicleList.push(v);
                    vehicleList.splice(vehicleList.indexOf(v), 1);
                }
            });
            updateVehicles(vehicleSelectBox, vehicleList);
            updateVehicles(garageSelectBox, garageVehicleList);
            if (found) {
                out(input.value);
            } else {
                out(`No vehicle with registration ${reg}`);
            }
            break;
        case "checkout":
            reg = command.split("checkout ")[1];
            garageVehicleList.forEach((v) => {
                if (v.reg === reg) {
                    found = true;
                    vehicleList.push(v);
                    garageVehicleList.splice(garageVehicleList.indexOf(v), 1);
                }
            });
            updateVehicles(vehicleSelectBox, vehicleList);
            updateVehicles(garageSelectBox, garageVehicleList);
            if (found) {
                out(input.value);
            } else {
                out(`No vehicle with registration ${reg} in garage`);
            }
            break;
        case "output":
            if (command.split(" ")[1] === "vehicles") {
                out(input.value);
                if (vehicleList.length === 0) {
                    out("No vehicles outside garage")
                } else {
                    vehicleList.forEach((v) => {
                        out(`${v.type} (${v.reg}) faults:`);
                        v.faults.forEach((f) => {
                            out(`\t${f}`)
                        });
                    });
                }
            } else if (command.split(" ")[1] === "garage") {
                if (garageVehicleList.length === 0) {
                    out("No vehicles in garage")
                } else {
                    out(input.value);
                    garageVehicleList.forEach((v) => {
                        out(`${v.type} (${v.reg}) faults:`);
                        v.faults.forEach((f) => {
                            out(`\t${f}`)
                        });
                    });
                }
            } else {
                out(input.value);
                out("Please choose either vehicles or garage to output.");
            }
            break;
        case "fix":
            reg = command.split("fix ")[1];
            garageVehicleList.forEach((v) => {
                if (v.reg === reg) {
                    found = true;
                    v.faults = ["none"];
                }
            });
            if (found) {
                out(input.value);
            } else {
                out(`No vehicle with registration ${reg} in garage`);
            }
            updateVehicles(garageSelectBox, garageVehicleList);
            break;
        default:
            out("Unrecognised command: " + command.split(" ")[0]);
            break;
    }
    input.value = "";
}

function handleKeys(evt) {
    if (evt.keyCode === 13) /*13 is the keyCode for the 'Enter' key*/ {
        readCommand();
    }
}
document.addEventListener('keydown', handleKeys, true);