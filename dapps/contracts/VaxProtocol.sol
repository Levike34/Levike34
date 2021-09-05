pragma solidity ^0.8.0;

import "./Registrar.sol";

contract VaxProtocol {
    
    enum VaxState{Unregistered, Registered, FirstDose, FullyVaxxed}
    
   struct Patient {
       Registrar _person;
       string _name;
       VaxProtocol.VaxState _step;
       bool fullyVaxxed;
   }
    mapping (string => Patient) public people;
    
    event vaxStatus(string _name, uint _step, address _personAddress);
    
    function register(string memory _name) public {
        Registrar person = new Registrar(this, _name);
        people[_name]._person = person;
        people[_name]._name = _name;
        people[_name]._step = VaxState.Registered;
        emit vaxStatus(_name, uint(people[_name]._step), address(people[_name]._person));
    }
    
    function firstVax(string memory _name) public {
        require(people[_name]._step == VaxState.Registered, "Please register first.");
        people[_name]._step = VaxState.FirstDose;
        emit vaxStatus(_name, uint(people[_name]._step), address(people[_name]._person));
        
 
    }
    
    function secondVax(string memory _name) public {
        require(people[_name]._step == VaxState.FirstDose, "Please register for your first dose.");
        people[_name]._step = VaxState.FullyVaxxed;
        people[_name].fullyVaxxed = true;
        emit vaxStatus(_name, uint(people[_name]._step), address(people[_name]._person));
    }

    function getInfo(string memory patient) public view returns(bool) {
        return (people[patient].fullyVaxxed);
    }
    
}