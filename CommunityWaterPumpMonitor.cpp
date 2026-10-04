#include <iostream>
#include <iomanip>
#include <chrono>
#include <thread>

class WaterPumpMonitor {
private:
    double totalLitersPumped;
    double currentFlowRateLPM; // Liters per minute
    double motorTemperatureC;
    bool isOverheating;

public:
    WaterPumpMonitor() : totalLitersPumped(0.0), currentFlowRateLPM(12.5), motorTemperatureC(32.0), isOverheating(false) {}

    void processSensorReadings(double tempDelta, double runtimeMinutes) {
        motorTemperatureC += tempDelta;
        
        if (motorTemperatureC > 75.0) {
            isOverheating = true;
        } else {
            isOverheating = false;
        }

        if (!isOverheating) {
            double litersExtracted = currentFlowRateLPM * runtimeMinutes;
            totalLitersPumped += litersExtracted;
        }
    }

    void displayDashboard() const {
        std::cout << "=======================================" << std::endl;
        std::cout << " COMMUNITY WATER PUMP SENSOR DISPLAY   " << std::endl;
        std::cout << "=======================================" << std::endl;
        std::cout << "Total Water Dispensed : " << std::fixed << std::setprecision(2) << totalLitersPumped << " Liters" << std::endl;
        std::cout << "Motor Temperature     : " << motorTemperatureC << " C" << std::endl;
        std::cout << "Pump Status           : " << (isOverheating ? "SHUTDOWN ALERT (OVERHEATING)" : "NORMAL OPERATION") << std::endl;
        std::cout << "=======================================" << std::endl << std::endl;
    }
};

int main() {
    WaterPumpMonitor pump;

    std::cout << "Starting Pump Operation Cycle...\n";
    
    // Normal operation cycle
    pump.processSensorReadings(5.0, 10.0); // 10 minutes runtime, temp +5C
    pump.displayDashboard();

    // Heavy duty cycle causing high heat
    pump.processSensorReadings(40.0, 15.0); // 15 minutes runtime, temp +40C
    pump.displayDashboard();

    return 0;
}