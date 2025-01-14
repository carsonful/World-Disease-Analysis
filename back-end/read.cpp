#include <iostream>
#include <fstream>
#include <sstream>
#include "Read.h"

using namespace std;



countryHealth::countryHealth(){
    
    // idk do constructor things here



}

void countryHealth::loadData(string year){

    
    // Read Data and load it into that year 
    // <!> Each Column Indexed <!> 
    
    // 1. Country
    // 2. Year
    // 3. Disease Name
    // 4. Disease Category 0 
    // 5. Prevalence Rate (%) 1
    // 6. Incidence Rate (%) 2
    // 7. Mortality Rate (%) 3
    // 8. Age Group 4 
    // 9. Gender 5
    // 10. Population Affected 6
    // 11. Healthcare Access (%) 7 
    // 12. Doctors per 1000 8 
    // 13. Hospital Beds per 1000 9
    // 14. Treatment Type 10
    // 15. Average Treatment Cost (USD) 11
    // 16. Availability of Vaccines/Treatment 12
    // 17. Recovery Rate (%) 13
    // 18. DALYs 14 
    // 19. Improvement in 5 Years (%) 15
    // 20. Per Capita Income (USD) 16 
    // 21. Education Index 17
    // 22. Urbanization Rate (%) 18
    
    string filename = "../.data/" + year + ".csv";
    ifstream file(filename);
    string line;
    
    while (getline(file, line)) {
        stringstream ss(line);
        string country, year, disease;
        vector<string> rowData;
        
        // Read the three keys
        getline(ss, country, ',');  // Country
        getline(ss, year, ',');     // Year
        getline(ss, disease, ',');  // Disease Name
        
        // Read remaining values into vector
        // These will be columns 4-22 (Disease Category through Urbanization Rate)
        string value;
        while (getline(ss, value, ',')) {
            rowData.push_back(value);
        }
        
        // Add to triple nested map structure
        graph[country][year][disease] = rowData;
    }
    cout << "Done Reading!" << endl;
}


// placeholder functions probably won't need later. 
vector<pair<string, int>> countryHealth::getTotalDeaths(string& diseaseTotal){
    vector<pair<string, int>> send;
    for (const auto& outer : graph) {
    const string& outer_key = outer.first;
        int deaths = 0;
        cout << outer_key << endl;
        for (const auto& middle : outer.second) {
            const string& middle_key = middle.first;
            
            for (const auto& inner : middle.second) {
                const string& inner_key = inner.first;
                const vector<string>& vec = inner.second;
                
                // Check if vector has at least 3 elements before accessing
                    string third_element = vec[6];
                    deaths += stoi(third_element);
                    // Do something with third_element
                    
            }
            cout << "Total Affected | " << deaths << endl;
        }
        send.push_back({outer_key, deaths});
    }
    return send;

}



void countryHealth::writeData() {
    string filePath = "../front-end/pages/data.json";
    ofstream outFile(filePath, ios::trunc);
    
    if (!outFile.is_open()) {
        throw runtime_error("Could not open file: " + filePath);
    }
        
}


void countryHealth::printGraph() {
    for (const auto& countryPair : graph) {
        cout << "Country: " << countryPair.first << endl;
        
        for (const auto& yearPair : countryPair.second) {
            cout << "\tYear: " << yearPair.first << endl;
            
            for (const auto& diseasePair : yearPair.second) {
                cout << "\t\tDisease: " << diseasePair.first << endl;
                cout << "\t\tData: ";
                
                for (const auto& value : diseasePair.second) {
                    cout << value << " | ";
                }
                cout << endl;
            }
            cout << endl;
        }
        cout << endl;
    }
}

pair<string, set<pair<string, int>>> countryHealth::sortData(){

    




}
