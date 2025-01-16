# Global Health Analysis

Global Health Analysis is a tool to compare populations affected by certain diseases over the past 24 years. The different type of diseases include Alzheimer's, Asthma, COVID-19, Cancer, Cholera, Dengue, Diabetes, Ebola, HIV/AIDS, Hepatitis, Hypertension, Influenza, Leprosy, Malaria, Measles, Parkinson's, Polio, Rabies, Tuberculosis, Zika.


## Showcase

### Home Page
![Home](https://github.com/user-attachments/assets/767950f8-5707-4143-9541-822a7cd31bf8)

### Graphs

![GitHub - Scatter Plot](https://github.com/user-attachments/assets/37b5cf33-eb32-41a4-8ddd-03e707552916)
![GitHub - Bar Graph](https://github.com/user-attachments/assets/66654c96-161b-4a2c-b959-6fc335ef5ba2

### Visuals


https://github.com/user-attachments/assets/88cfeff4-3080-4a73-b03e-78d8226c062c


Data Set: https://www.kaggle.com/datasets/malaiarasugraj/global-health-statistics/data

## Installation

Use the package manager [npm](https://nodejs.org/en) to install Node.js.

```bash
npm install
```
You will also need some sort of gcc/mingw C++ compiler which can be found [here](https://www.mingw-w64.org/downloads/).

Change your directory to the folder that contains the C++ code and compile the main function. Flag the compiled file with the out file being called main.
```bash
cd ./Applications/
cd ./back-end/
g++ main.cpp -o main

```


## Usage
To start running the application on the local host, you run the command below in the project directory.
```bash
npm run dev
```
Then in a seperate terminal run the command
```bash
node server.js
```
This will allow the api to connect with the front-end and allow the main.exe file to be ran on user input.

## References

- Kaggle => Data Set: https://www.kaggle.com/datasets/malaiarasugraj/global-health-statistics/data
- Chart.js => https://www.chartjs.org/docs/latest/
- Node.js => https://nodejs.org/en/download


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
