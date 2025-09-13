# Deekshith A \| CSE \| Batch 28’
---

## TASK:API
### Weather API CLI Tool


### 1. Introduction
In this task, I created a simple **command-line tool in Python** to fetch real-time weather information of a given city.  
The program uses an external **Weather API** and displays details like temperature, weather condition, and wind speed.  

#

### 2. API Used
- I used the **WeatherAPI.com** service: [https://www.weatherapi.com](https://www.weatherapi.com)  
- The API requires a **key** for authentication.  
- Data is returned in **JSON format**, which the program parses to extract useful information.  

#

### 3. Working of the CLI Tool
1. The user enters the city name as an argument when running the script.  
2. The tool sends an HTTP request to the WeatherAPI service.  
3. The API responds with the current weather information.  
4. The program prints details like:  
   - Location and country  
   - Temperature in Celsius  
   - Weather condition (e.g., clear, cloudy)  
   - Wind speed  

#

## 4. Example Code Snippet
```python
parser = argparse.ArgumentParser(description="Simple Weather CLI Tool")
parser.add_argument("--city", required=True, help="City name")
args = parser.parse_args()

get_weather(args.city)

```
This part of the code ensures that the user must provide a city name when running the program.
[Python File](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/weather.py)
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/api.png)

---

## Task: Working with Github
---

In this task, I worked with **GitHub workflows and collaboration features**.  
I successfully completed all the required steps as mentioned in the repository’s README file.
#
### Key Activities Performed
1. **GitHub Actions**  
   - Learned how automated workflows are triggered and executed.  
2. **Issues**  
   - Created and managed issues to track tasks and improvements.  
3. **Branches and Pull Requests (PRs)**  
   - Worked with branches and raised a Pull Request to contribute changes.  
4. **Review and Merge Process**  
   - Understood how code reviews and merges are carried out, which is central to collaborative development.  

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/gitfork.png)
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/gitpr.png)

---

## Task: Get familiar with the command line on ubuntu and do the following subtasks
---

In this task, I worked with the **Ubuntu command line** and practiced basic shell commands.  
I successfully completed all the subtasks mentioned.

### Key Activities Performed
1. **Folder Creation**  
   - Created a folder named `test` using the `mkdir` command.  
   - Used `cd` to navigate into the folder.  

2. **File Operations**  
   - Created a blank file without using a text editor by running:  
     ```bash
     touch file1.txt
     ```
   - Verified its existence using the `ls` command.  

3. **Bulk Folder Creation**  
   - Created **2600 folders** inside `test`, each with a unique name (e.g., `M90`, `B56`) using a loop in the terminal:  
     ```bash
     touch {A..Z}{1..100}
     ```

4. **File Concatenation**  
   - Created two text files with random content.  
   - Concatenated them and displayed the output using:  
     ```bash
     cat file1.txt file2.txt
     ```


![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/linux.png)

---

## Task:The Matrix Puzzle — Decode with NumPy & Reveal the Image
---

In this task, I worked with **NumPy** and **Matplotlib** to solve a visual puzzle.  
I successfully manipulated the scrambled matrix and revealed the hidden image by using array operations and plotting techniques.

### Key Activities Performed
1. **Matrix Loading and Reshaping**  
   - Loaded the scrambled matrix from the provided file.  
   - Used NumPy functions to **reshape** the array into a square matrix.  

2. **Array Manipulation**  
   - Applied NumPy operations such as `reshape()`, `transpose()`, and slicing to reorient the data.  
   - Corrected the orientation of the matrix by checking the image from different perspectives.  

3. **Visualization with Matplotlib**  
   - Used `matplotlib.pyplot.imshow()` to display the decoded matrix as an image.  
   - Experimented with color maps (`cmap`) for better visualization.  

4. **Decoding the Hidden Image**  
   - Applied the hints:
     - Reshaped into a square.  
     - Adjusted orientation to make the image upright.  
     - Reversed the matrix where necessary to reveal the final image.

[Python Script](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/script.py)

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/matrix%20decode.png)

---

## Task:Portfolio Webpage
---

In this task, I created a **personal portfolio website** to showcase my profile, interests, and projects.  
The website was built with HTML, CSS, Javascript and made responsive using modern design practices.  
It was also pushed to a GitHub repository for version control and deployment.

LINK:[Portfolio](https://d33-beryl.vercel.app/)

### Key Activities Performed
1. **Website Structure**  
   - Designed multiple sections including:  
     - **About Me** – introduction and background.  
     - **Projects** – descriptions and links to my work.  
     - **Social Media Links** – GitHub, LinkedIn, etc.  

2. **Responsive Design**  
   - Implemented responsiveness using **Tailwind CSS** 
   - Ensured the website works on both desktop and mobile devices.  

3. **Styling and UI**  
   - Applied custom CSS to improve readability and visual appeal.  
   - Used consistent fonts, spacing, and color schemes. 
   - Javascript for the background live animation.

4. **Version Control and Deployment**  
   - Initialized a **Git repository** for the project.  
   - Pushed the code to **GitHub** and vercel was used for hosting and collaboration.  

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/portfolio1.png)

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/portfolio2.png)

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/portfolio3.png)

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/portfolio2.png)

---

## Task:Writing Resource Article using Markdown

---

In this task, I learned how to write a **technical resource article** using Markdown.  
I chose the topic **Social Engineering** and prepared an article explaining the concept, common attack methods, real-world examples, and safety tips.  

### Key Activities Performed
1. **Markdown Writing**  
   - Used Markdown syntax to create headings, lists, and emphasize key terms.  
   - Ensured the article was structured with sections like *Introduction, Tricks, Examples, and Safety Tips*.  

2. **Technical Content Creation**  
   - Researched the topic of Social Engineering.  
   - Summarized key points in a simple, easy-to-read format.  

3. **Formatting & Publishing**  
   - Verified that the Markdown format displays consistently across devices.  
   - Posted the completed article on the **MARVEL website** as instructed.  

[REPORT](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/Social_Engineering.md)

---

## Task:Thinkercad

---

In this task, I created and simulated circuits using **Tinkercad**, gaining hands-on experience with basic electronic components and Arduino programming.  
I successfully built a simple ultrasonic distance measurement circuit and then extended it to a radar system with a servo motor.

### Key Activities Performed
1. **Getting Started with Tinkercad**  
   - Created an account and explored the example circuits provided.  
   - Learned how to place components, connect them with wires, and program the Arduino.  

2. **Ultrasonic Distance Measurement**  
   - Built a circuit using an **HC-SR04 ultrasonic sensor**.  
   - Programmed the Arduino to calculate the distance of an obstacle using the time taken for sound waves to return.  
   - Displayed the measured distance on the **serial monitor**.  

3. **Radar System Simulation**  
   - Added a **servo motor** to rotate the ultrasonic sensor.  
   - Wrote code to move the servo gradually, allowing the sensor to scan across angles.  
   - Used the ultrasonic sensor readings to simulate a **radar system** that detects obstacles within range.  


### Precautions / Safety Measures
- Since this was a **virtual simulation in Tinkercad**, no physical safety concerns were involved.  
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/thinkercad.jpeg)

---

## Task:Speed Control of DC Motor

---

In this task, I explored different techniques to control the speed of a **DC motor** using an **Arduino UNO** and an **L298N H-Bridge motor driver**.  
I first simulated the setup in **Tinkercad** and then implemented it on actual hardware with a 5V BO motor.

### Key Activities Performed
1. **Understanding Motor Control**  
   - Learned the role of the **H-Bridge (L298N)** in controlling the direction and speed of a DC motor.  
   - Understood how **PWM (Pulse Width Modulation)** signals from the Arduino can vary the motor’s speed.  

2. **Simulation in Tinkercad**  
   - Built a virtual circuit with Arduino UNO, L298N driver, and a 5V BO motor.  
   - Wrote Arduino code to send PWM signals to the **Enable pin** of the L298N.  
   - Verified motor speed control by adjusting the duty cycle in simulation.  

3. **Hardware Implementation**  
   - Connected the Arduino UNO with the L298N motor driver and BO motor on breadboard/hardware setup.  
   - Uploaded the same Arduino code to test motor speed control physically.  
   - Recorded videos of the working circuit to demonstrate the results.  
![](https://github.com/ashith-17/Marvel-Level-0-Report/blob/main/api.png)

---

## Task:LED Toggle Using ESP32

---

In this task, I learned the basics of working with the **ESP32 microcontroller** and created a standalone **web server** to control an LED connected to its GPIO pins.  
I used the **Arduino IDE** to write and upload the code, after configuring it for ESP32 support.

### Key Activities Performed
1. **ESP32 Setup**  
   - Installed the ESP32 board package in the Arduino IDE.  
   - Configured the IDE with the correct board and COM port to enable code uploading.  

2. **Circuit and LED Control**  
   - Connected an LED to one of the ESP32 GPIO pins with a current-limiting resistor.  
   - Wrote code to toggle the LED state (ON/OFF).  

3. **Web Server Implementation**  
   - Created a **standalone web server** hosted on the ESP32.  
   - Designed a simple webpage with buttons to turn the LED ON and OFF.  
   - Accessed the ESP32 server through the local network using its IP address.  

4. **Testing**  
   - Uploaded the program to the ESP32.  
   - Controlled the LED from a web browser using the ESP32’s hosted page.
   
[.ino file](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/LED.ino)
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/ledesp.jpeg)
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/esp32_server.png)

---

## Soldering Prerequisites

---

In this task, I learned about the **soldering equipment** available in the lab and performed basic soldering under the supervision of a coordinator.  
I practiced soldering a simple LED circuit on a perf board using the standard tools.

### Key Activities Performed
1. **Familiarization with Equipment**  
   - Learned the use of the **soldering iron**, **solder wire**, **soldering wick**, and **flux**.  
   - Understood the safety precautions necessary while handling hot soldering tools.  

2. **Basic Soldering Practice**  
   - Used a perf board to build a simple LED circuit.  
   - Applied flux and solder to make clean joints between the LED, resistor, and connecting wires.  
   - Learned how to correct mistakes using the soldering wick.  

3. **Supervised Hands-On Session**  
   - All soldering was performed under the guidance of a coordinator to ensure safety.  
   - Gained confidence in handling soldering equipment properly.  
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/soldering.jpeg)

---

## Task:Active Participation

---

In this task, I fulfilled the **Active Participation** requirements by attending a technical event and documenting the certificate of participation.

### Event Attended
- **Positive Hack Talks @ Bengaluru** conducted by Positive Technologies — an in-person meetup focused on offensive and defensive security, bug hunting, and the latest cybersecurity topics.  
  More details: [Positive Hack Talks – Bengaluru](https://phtalks.ptsecurity.com/bengaluru)

### Key Activities Performed
1. Registered for and attended the Positive Hack Talks event in Bengaluru.  
2. Listened to expert talks, participated in discussions and networked with cybersecurity professionals.  
3. Obtained the certificate of participation as proof of my attendance.  


### Learning Outcome
Through this activity, I learned:  
- The importance of staying up to date with current trends in cybersecurity.  
- How attending professional events helps in networking and gaining exposure to advanced topics.  
- The value of applying what I learn in papers or talks to my technical and academic work.  

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/phtb.jpeg)
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/phtbc.jpeg)

---

## Task:Datasheets report writing

---

For this task, I studied the **datasheet of the L293D Motor Driver IC** and wrote a detailed report covering its features, internal structure, and applications.  

### Key Activities Performed
1. **IC Overview**  
   - Explored the specifications of the L293D including voltage ranges, current capacity, and protective diodes.  
   - Understood its dual H-Bridge configuration for controlling two DC motors independently.  

2. **Understanding H-Bridge Concept**  
   - Learned how four transistors arranged in an H-shaped circuit allow bidirectional current flow.  
   - Understood how this enables motors to rotate both clockwise and counterclockwise.  

3. **PWM (Pulse Width Modulation)**  
   - Studied how PWM signals applied to the enable pins control motor speed by varying duty cycle.  
   - Understood that the L293D itself does not generate PWM but responds to PWM input from a microcontroller.  

4. **Pin Configuration and Working**  
   - Examined each of the 16 pins (inputs, outputs, enable pins, and supply pins).  
   - Mapped how the inputs from a microcontroller determine motor direction and speed.  

5. **Applications**  
   - Documented common uses such as robotics, stepper motor control, and automation systems.  
[REPORT](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/L293D_Motor_Driver_Report.txt)

---

## Task:Introduction to VR

---

For this task, I studied **Virtual Reality (VR)** and documented its applications, differences from **Augmented Reality (AR)**, current trends, technology stack, and Indian companies working in this field.

### Key Activities Performed
1. **Understanding VR**  
   - Learned that VR is a computer-generated simulation that immerses users in a fully digital environment, often using headsets and motion controllers.  
   - Studied use cases such as gaming, training simulations, education, and healthcare.  

2. **VR vs AR**  
   - Compared VR, which replaces the real world with a digital one, against AR, which overlays digital content onto the real world.  
   - Understood their differences in hardware, interaction, and use-cases.  

3. **Trends in the Space**  
   - Explored recent developments such as standalone headsets, OpenXR/WebXR standards, AI integration, haptic feedback, and enterprise adoption of VR/AR.  

4. **Technology Stack**  
   - Reviewed the hardware (head-mounted displays, sensors), software (Unity, Unreal Engine, WebXR), APIs (OpenXR, ARCore, ARKit), and supporting tools (Blender, glTF assets).  
   - Learned how these components integrate to deliver immersive VR experiences.  

5. **Indian Companies**  
   - Researched Indian startups and firms like **Imaginate**, **Simbott**, **Parallax Labs**, and **Tata Elxsi** working in the VR/AR sector.  
   - Noted their contributions in enterprise solutions, training simulators, and XR content development.
[Link to Report](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/VR_AR.txt)

---

## Task:Sad servers - "Like LeetCode for Linux"

---

In this task, I practiced Linux troubleshooting using **Sad Servers**, an online platform designed like "LeetCode for Linux."  
I worked on the given scenario **Command Line Murders** and successfully troubleshooted the server to make it functional again.

### Key Activities Performed
1. **Exploring Sad Servers**  
   - Logged into the Sad Servers platform and accessed the troubleshooting challenge.  
   - Understood the problem statement provided in the scenario.  

2. **Troubleshooting Process**  
   - Used various Linux commands to investigate issues, such as  `grep`, `cat`, `cd`, and `ls`.  
   - Followed logical debugging steps to narrow down the root cause of the issue.  
   - Found the culprict.  

3. **Verification**  
   - The Final Hashes were Matched
![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/sad%20servers.png)

---

## Task: Make a Web App

---

In this task, I created a **web application** using **Node.js (Express)** and **SQLite** that functions as a resource library.  
The app allows users to browse available resources such as articles and books, as well as manage their personal accounts.

### Key Activities Performed

1. **Setting Up Express Project**  
   - Initialized the project with `npm init` and installed required dependencies (`express`, `sqlite3`, `bcrypt`, `express-session`, etc.).
   - Developed the server in a single file for simplicity and maintainability.

2. **Resource Library Features**  
   - Implemented routes to display a list of resources (articles, books, etc.).
   - Created detail views for each resource.
   - Added search functionality for easy resource navigation.
   - Enabled logged-in users to add, edit, and delete resources.

3. **Account Management**  
   - Built endpoints for **user registration, login, logout, and profile management**.
   - Used session-based authentication to manage user state.
   - Stored user and session data securely in SQLite databases.

4. **User Interface**  
   - Generated simple, responsive HTML pages using template literals.
   - Ensured basic styling and usability for all pages.

5. **Testing & Deployment**  
   - Tested all features locally to verify authentication, resource management, and navigation.
   - Ensured smooth user experience and reliable backend operations.

### Learning Outcome

Through this activity, I learned:  
- How to use **Express.js** to build a full-featured web application with authentication and CRUD operations.
- How to interact with **SQLite** databases for persistent storage.
- The basics of implementing **session-based authentication** in a backend app.
- How to design and serve dynamic HTML pages for real-world use cases.

![](https://github.com/28d33/Marvel-Level1-Report/blob/main/resources/webapp1.png)
