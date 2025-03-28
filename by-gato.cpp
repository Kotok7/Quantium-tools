#include <iostream>
#include <cstdlib>
#include <unistd.h>

int age;

int main() {
    std::cout << "How old are you?" << std::endl;
    std::cin >> age;
    
    system("clear");
    
    sleep(1);
    std::cout << "Calculating age" << std::endl;
    
    sleep(1);
    system("clear");
    std::cout << "Calculating age." << std::endl;
    
    sleep(1);
    system("clear");
    std::cout << "Calculating age.." << std::endl;
    
    sleep(1);
    system("clear");
    std::cout << "Calculating age..." << std::endl;
    
    sleep(1);
    system("clear");
    std::cout << "You are " << age << " years old" << std::endl;
    
    return 0;
}