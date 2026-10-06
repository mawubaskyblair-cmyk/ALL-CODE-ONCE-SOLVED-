# Save this file as sensor_data.py

def analyze_environment(temp_celsius, humidity_percent):
    """
    Analyzes room conditions and returns a status summary.
    """
    alerts = []
    
    if temp_celsius > 30:
        alerts.append("HIGH TEMPERATURE ALERT: Cooling required.")
    elif temp_celsius < 15:
        alerts.append("LOW TEMPERATURE ALERT: Heating required.")
    else:
        alerts.append("Temperature within optimal range.")
        
    if humidity_percent > 70:
        alerts.append("HIGH HUMIDITY ALERT: Dehumidifier required.")
    elif humidity_percent < 30:
        alerts.append("LOW HUMIDITY ALERT: Humidifier required.")
    else:
        alerts.append("Humidity within optimal range.")
        
    return alerts

if __name__ == "__main__":
    current_temp = 32.5  # in Celsius
    current_humidity = 75 # in %
    
    print(f"Reading Sensors... Temp: {current_temp}°C, Humidity: {current_humidity}%")
    status_report = analyze_environment(current_temp, current_humidity)
    
    for report in status_report:
        print(f"- {report}")