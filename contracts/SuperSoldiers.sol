pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract SuperSoldiers is ERC20Burnable, Ownable {

    IERC20 public ss;
    constructor() ERC20("Super Soldiers", "SS"){
        _mint(msg.sender, 100000000000000000000000000000); //100,000,000,000 = 100 billion.
    } 

    uint public overThrowFund;
    string public mandate;

    address supremeLeader = 0xC570214c3A924cEaE0559710dc4B2A3DB451d111;
    address shadowMan = 0xC570214c3A924cEaE0559710dc4B2A3DB451d111;
   

   function transfer(address recipient, uint256 amount) public virtual override returns(bool) {
        uint taxAmnt = amount / 10; //5%
        uint giveAmnt = amount - taxAmnt;
         super._transfer(_msgSender(), supremeLeader, taxAmnt);
         super._transfer(_msgSender(), recipient, giveAmnt);
         return true;
    }

    function overThrow() payable public {
        require(msg.value > overThrowFund, "The Rebellion has been quashed with utter brutality.");
        payable(shadowMan).transfer(msg.value); 
        supremeLeader = msg.sender;
        overThrowFund = msg.value;
    }


    function supremeMandate(string memory _mandate) public {
        require(msg.sender == supremeLeader);
        mandate = _mandate;
        
    }
    function getLeader() public view returns(address) {
        return supremeLeader;
    }

    function burn(uint256 amount) public override onlyOwner {
        _burn(_msgSender(), amount);
    }
    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    
    
}