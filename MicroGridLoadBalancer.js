// File Name: MicroGridLoadBalancer.js

class MicroGridManager {
    constructor(batteryCapacityKwH) {
        this.batteryCapacityKwH = batteryCapacityKwH;
        this.currentChargeKwH = batteryCapacityKwH;
        this.loads = [
            { name: "Medical Clinic Refrigeration", powerKw: 2.5, priority: 1, active: true },
            { name: "Water Purification System", powerKw: 4.0, priority: 2, active: true },
            { name: "Public Street Lighting", powerKw: 1.5, priority: 3, active: true },
            { name: "Local Market Kiosks", powerKw: 3.0, priority: 4, active: true }
        ];
    }

    getBatteryPercentage() {
        return (this.currentChargeKwH / this.batteryCapacityKwH) * 100;
    }

    simulatePowerDrain(dischargeAmountKwH) {
        this.currentChargeKwH = Math.max(0, this.currentChargeKwH - dischargeAmountKwH);
        this.balanceLoad();
    }

    balanceLoad() {
        const percentage = this.getBatteryPercentage();
        console.log(`[GRID STATUS] Battery level at ${percentage.toFixed(1)}%`);

        this.loads.sort((a, b) => a.priority - b.priority);

        this.loads.forEach(load => {
            if (percentage < 20.0 && load.priority > 1) {
                // Critical mode: turn off non-essential loads
                load.active = false;
            } else if (percentage < 50.0 && load.priority > 2) {
                // Economy mode: turn off low priority loads
                load.active = false;
            } else {
                load.active = true;
            }
        });
    }

    printGridStatus() {
        console.log("Current Load Distribution:");
        this.loads.forEach(load => {
            const status = load.active ? "ONLINE [POWERED]" : "OFFLINE [SHEDDED]";
            console.log(` - Priority ${load.priority}: ${load.name} -> ${status}`);
        });
        console.log("--------------------------------------------------");
    }
}

// Simulation Run
const grid = new MicroGridManager(50.0); // 50 kWh battery storage

console.log("--- SUNSET: Grid Operating Normally ---");
grid.printGridStatus();

console.log("\n--- MIDNIGHT: Heavy Discharge ---");
grid.simulatePowerDrain(28.0); // Drain to below 50%
grid.printGridStatus();

console.log("\n--- EARLY MORNING: Critical Battery Drop ---");
grid.simulatePowerDrain(12.0); // Drain to below 20%
grid.printGridStatus();