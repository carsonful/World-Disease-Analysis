#include <iostream>
#include <fstream>
#include <sstream>
#include "Read.h"

using namespace std;



countryHealth::countryHealth(){
    
}

void countryHealth::loadData(string year) {
    string filename = "../.data/" + year + ".csv";
    ifstream file(filename);
    string line;
    
    while (getline(file, line)) {
        stringstream ss(line);
        string country, yearValue, disease;
        vector<string> rowData;
        
        // Read the first three columns
        getline(ss, country, ',');  // Country
        getline(ss, yearValue, ','); // Year
        getline(ss, disease, ',');   // Disease Name
        
        // Skip if not the requested year
        rowData.push_back(yearValue);
        
        // Read remaining values into vector
        string value;
        while (getline(ss, value, ',')) {
            rowData.push_back(value);
        }
        
        data[country][disease] = rowData;
    }
}




void countryHealth::writeData() {
    string filePath = "./data.json";
    ofstream outFile(filePath, ios::trunc);
    
    if (!outFile.is_open()) {
        throw runtime_error("Could not open file: " + filePath);
    }
    
    // Start JSON array
    outFile << "[\n";
    
    // Keep track of whether we need to add a comma
    bool firstCountry = true;
    
    // Iterate through countries in the data
    for (const auto& countryPair : data) {
        if (!firstCountry) {
            outFile << ",\n";
        }
        firstCountry = false;
        
        // Write country object
        outFile << "    {\n";
        outFile << "        \"label\": \"" << countryPair.first << "\",\n";
        outFile << "        \"diseases\": [\n";
        
        // Iterate through diseases for this country
        bool firstDisease = true;
        for (const auto& diseasePair : countryPair.second) {
            if (!firstDisease) {
                outFile << ",\n";
            }
            firstDisease = false;
            
            // Get the population affected value 
            int long value = -1000;
            try {
                if (diseasePair.second.size() > 7) {
                    value = stoi(diseasePair.second[7]);
                }
            } catch (...) {
                // Keep default value if conversion fails
            }
            
            // Write disease object
            outFile << "            {\n";
            outFile << "                \"name\": \"" << diseasePair.first << "\",\n";
            outFile << "                \"value\": " << value << "\n";
            outFile << "            }";
        }
        
        // Close diseases array and country object
        outFile << "\n        ]\n";
        outFile << "    }";
    }
    
    // Close JSON array
    outFile << "\n]\n";
    
    outFile.close();
}

void countryHealth::printGraph() {
    for (const auto& countryPair : data) {
        cout << "Country: " << countryPair.first << endl;
        
        for (const auto& diseasePair : countryPair.second) {
            cout << "\tDisease: " << diseasePair.first << endl;
            cout << "\tData: ";
            
            for (const auto& value : diseasePair.second) {
                cout << value << " | ";
            }
            cout << endl;
        }
        cout << endl;
    }
}

