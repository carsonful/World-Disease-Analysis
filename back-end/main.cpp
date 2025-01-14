#include <iostream>
#include <string>
#include "Read.cpp"






int main(int argc, char *argv[]){

    // argc = arg count
    // argv = list of arguements

    // ./a {argument (year) passed}
    // ./a 2016 

    countryHealth data;
    if(argv[1] == ""){return -1;}
    cout << argv[1] << endl;; // Going to be the year 

    data.loadData(string(argv[1]));
    // Do something with the loaded data such as json, csv, or txt that we can read in JS/TS

    string popAffected;
    data.writeData(data.getTotalDeaths(popAffected));
    //data.printGraph();

    
    













    return 0; 
}