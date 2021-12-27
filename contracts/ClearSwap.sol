pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../client/node_modules/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol"; 



contract ClearSwap {
    
    //Uniswap Router address.
    address internal constant PANCAKESWAP_ROUTER_ADDRESS =  0x10ED43C718714eb63d5aA57B78B54704E256024E; 
    address WETH = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address owner = 0x56E6a6bDCea6666bEB932a2933895c628d85aeF5;
  
    address tokenSwap = address(this);
    uint public totalETH;
    
    IUniswapV2Router02 public pancakeswapRouter;
    
    event Swap (uint[] _amount, uint _userBalance, uint _totalBalance);
    event WithdrawETH (uint _amount, uint _totalBalance);
    

  constructor() {
    pancakeswapRouter = IUniswapV2Router02(PANCAKESWAP_ROUTER_ADDRESS);
  }
    
    //Initates a swap via Uniswap Router.  Can be used for any ERC20 token.
    function swap(address _token, uint _amount) public payable {
        
        //sets the deadline to 300 seconds from now.
        uint deadlineTime = block.timestamp + 300;
        
        //gets the token address an approves + transfers the token to this contract, 
        //which then approves the uniswap contract to swap the tokens for ETH.
        IERC20 token = IERC20(_token);
        token.approve(address(this), _amount);
        token.transferFrom(msg.sender, address(this), _amount);
        token.approve(PANCAKESWAP_ROUTER_ADDRESS, _amount);
        
        //Sets the path for the token, and WETH.  Swaps via swapExactTokensForETH function in uniswapRouter.
        //The ETH is sent to this address and assigned according to the sender.
        address[] memory path;
        path = new address[](2);
        path[0] = _token;
        path[1] = pancakeswapRouter.WETH();
        uint[] memory amount = pancakeswapRouter.swapExactTokensForETH(_amount, 100, path, tokenSwap, deadlineTime);
        uint giveAmnt = amount[1] - (amount[1] / 100);
        uint feeAmnt = amount[1] / 100;
        payable(msg.sender).transfer(giveAmnt);
        payable(owner).transfer(feeAmnt);
        emit Swap(amount, amount[1], totalETH);
    }

    function getAmountsIn (uint256 _amount, address _token) public view returns(uint[] memory amounts) {
        address[] memory path;
        path = new address[](2);
        path[0] = pancakeswapRouter.WETH();
        path[1] = _token;
        return pancakeswapRouter.getAmountsIn(_amount, path);
    }
     
    //Initates a swap via Uniswap Router.  Can be used for any ERC20 token.
    function buyExactTokenWithETH(address _token, uint _amount) public payable {
        
        //sets the deadline to 300 seconds from now.
        uint deadlineTime = block.timestamp + 300;
         IERC20 token = IERC20(_token);
      
        //Sets the path for the token, and WETH.  Swaps via swapExactETHForTokens function in uniswapRouter.
        //The ETH is sent to this address and assigned according to the sender.
        address[] memory path;
        path = new address[](2);
        path[0] = pancakeswapRouter.WETH();
        path[1] = _token;
        uint[] memory amount = pancakeswapRouter.swapETHForExactTokens{value: msg.value}(_amount, path, tokenSwap, deadlineTime);
        uint giveAmnt = amount[1] - (amount[1] / 100);
        uint feeAmnt = amount[1] / 100;
        token.transfer(msg.sender, giveAmnt);
        token.transfer(owner, feeAmnt);
        
     
    }

    function newOwner(address _newOwner) public {
      require(msg.sender == owner, "You are not the owner.");
      owner = _newOwner;
    }
    
    //Allows this contract to receive ETH from swaps.
    receive() external payable {}
    

}