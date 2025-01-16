#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;
//Country,Year,Disease Name,Disease Category,Prevalence Rate (%),Incidence Rate (%),Mortality Rate (%),Age Group,Gender,Population Affected,Healthcare Access (%),Doctors per 1000,Hospital Beds per 1000,Treatment Type,Average Treatment Cost (USD),Availability of Vaccines/Treatment,Recovery Rate (%),DALYs,Improvement in 5 Years (%),Per Capita Income (USD),Education Index,Urbanization Rate (%)

// Function to extract the second element (year) from the comma-separated string
string getYearFromLine(const string& line) {
    int firstComma = line.find(','); // Find the first comma
    int secondComma = line.find(',', firstComma + 1); // Find the second comma

    // Extract the substring between the first and second commas (the year)
    return line.substr(firstComma + 1, secondComma - firstComma - 1);
}

// Function to write data to the file based on year
void writeToFile(const string& row, const string& year) {
    string fileName = year + ".csv";

    // Open the file in append mode
    ofstream file(fileName, ios::app);
    
    // Write headers if the file is empty
    if (file.good() == 0) {
        // Write headers as a single string
        string headerLine = "Country,Year,Disease Name,Disease Category,Prevalence Rate (%),Incidence Rate (%),Mortality Rate (%),Age Group,Gender,Population Affected,Healthcare Access (%),Doctors per 1000,Hospital Beds per 1000,Treatment Type,Average Treatment Cost (USD),Availability of Vaccines/Treatment,Recovery Rate (%),DALYs,Improvement in 5 Years (%),Per Capita Income (USD),Education Index,Urbanization Rate (%)";
        file << headerLine << endl;
    }
    
    // Write the data row as a single line
    file << row << endl;

    file.close();
}

int main() {
    // Open the large CSV file for reading
    ifstream inputFile("Global Health Statistics.csv"); // Replace with your actual file path

    // Check if the file is opened successfully
    if (!inputFile.is_open()) {
        cerr << "Error opening the file!" << endl;
        return 1;
    }

    string line;
    
    // Read the file line by line
    getline(inputFile, line);
    // For Header ^ 
    while (getline(inputFile, line)) {
        // Skip empty lines or lines with only whitespace
        if (line.empty()) continue;

        // Extract the year from the current line
        string year = getYearFromLine(line);

        // Write the data to the corresponding year file
        writeToFile(line, year);
    }

    // Close the input file
    inputFile.close();

    cout << "Data has been successfully separated and saved." << endl;

    return 0;
}