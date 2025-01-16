#pragma once

#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <set>
using namespace std;

class countryHealth{

    // graph[country][year][disease] = string of info containing information on that specific information 
    unordered_map<string, 
        unordered_map<string, 
            unordered_map<string, vector<string>>>> graph;








public:

    // functions here
    countryHealth();

    void loadData(string year);


    // placeholder functions probably won't need later. 
    vector<pair<string, int>> getTotalDeaths(string& diseaseTotal);


    pair<string, set<pair<string, int>>> sortData();

    void writeData();

    void printGraph();

};


