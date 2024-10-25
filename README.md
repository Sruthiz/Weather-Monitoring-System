# Weather-Monitoring-System
Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates.


Objective :
Develop a real-time data processing system to monitor weather conditions and provide
summarized insights using rollups and aggregates. The system will utilize data from the
OpenWeatherMap API 

Demo : 

![Screenshot (159)](https://github.com/user-attachments/assets/4124ef97-c1d4-47c1-a774-bf808b73c52c)

![Screenshot (162)](https://github.com/user-attachments/assets/c63bbdc9-7f19-44e1-8a6e-ad185b5d55d5)

![Screenshot (163)](https://github.com/user-attachments/assets/a076e679-ffa8-4566-8702-53da59f1afac)

![Screenshot (164)](https://github.com/user-attachments/assets/e4e1d204-9951-4048-8ab0-0f828faf0f22)


Installtion Steps :
STEP : 1

 1. Open a terminal (or command prompt) in your project's root directory.
 2. Initialize Git:
    ```bash
     git init
    
3. Clone the Repository
   ```bash
   git clone https://github.com/your-username/rule-engine-project.git
4. Add all your project files to the staging area :
    ```bash
        git add .
        
5. Commit the changes:
    ```bash
    git commit -m "Initial commit"
   
6. Push your local repository to GitHub
    ```bash
    git push -u origin master

STEP : 2

 API Key Setup :
1. Create a free account on OpenWeatherMap.
2. Get your API key from your OpenWeatherMap dashboard.
3. Open the script.js file and replace the YOUR_API_KEY_HERE placeholder with your actual API key:
   ``` bash
   const apiKey = 'YOUR_API_KEY_HERE';  // Replace with your OpenWeatherMap API key
   
Step : 3

Running the Project : 
1. Open index.html in a web browser.
2. Enter a city name to fetch weather data.
3. Click on the link to View Weather Visualizations to see the data charts.

   FOLDER STRUCTURE
   ```bash
   Weather-Monitoring-System/
   ├── index.html              # Main HTML file for the web interface
   ├── visualization.html      # HTML file for displaying weather visualizations
   ├── README.md               # Documentation file for the project setup and usage
   ├── script.js               # JavaScript file handling API interactions and thresholds
   ├── style.css               # CSS file for styling the application
   ├── visualization.js        # JavaScript file for managing data visualization
   └── assets/                 # (Optional) Directory for images/icons if needed

 DEPENDENCIES :
  Chart.js (included via CDN in visualization.html)
