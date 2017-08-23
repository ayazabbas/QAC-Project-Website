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
            this.faults = faults;
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
}

function fixVehicles() {

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
                switch (v.type) {
                    case ("Car"):
                        bill += 100;
                        faultMultiplier = 70;
                        break;
                    case ("Motorcycle"):
                        bill += 50;
                        faultMultiplier = 40;
                        break;
                    case ("Truck"):
                        bill += 200;
                        faultMultiplier = 100;
                        break;
                }
                bill += faultMultiplier * vehicle.faults.length;
            }
        });
        txtAreaBill.textContent = "£" + bill
    } else {
        alert("Please select the vehicles you require the bill for.");
    }
}