#include <iostream>
#include <string>
#include "Read.cpp"






int main(int argc, char *argv[]){

    // argc = arg count
    // argv = list of arguements

    // ./a {argument (year) passed}
    // ./a 2016 

    countryHealth frame;
    try{
        if(argv[1] == ""){return -1;}
    } catch (...){
        cerr << "No Input" << endl;
        return -1;
    }
    cout << argv[1] << endl;; // Going to be the year 
    frame.loadData(string(argv[1]));
    frame.writeData();

    return 0; 
}