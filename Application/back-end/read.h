#pragma once

#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <set>
#include <map>
using namespace std;

class countryHealth{



    // data[country][disease] = vector of information
    unordered_map<string, map<string, vector<string>>> data;








public:

    // functions here
    countryHealth();

    void loadData(string year);


    // placeholder functions probably won't need later. 


    pair<string, set<pair<string, int>>> sortData();

    void writeData();

    void printGraph();

};


